const ENDPOINT_FORMULARIO = "https://formspree.io/f/xjyynvwj";

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarCarrossel();
  iniciarAnimacoes();
  iniciarFormulario();
});

function iniciarMenu() {
  const botao = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });

  const links = menu.querySelectorAll("a");
  const secoes = [...links].map((l) => document.querySelector(l.getAttribute("href")));
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle("ativo", l.getAttribute("href") === "#" + e.target.id));
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  secoes.forEach((s) => s && observador.observe(s));
}

function iniciarCarrossel() {
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("track");
  const anterior = document.getElementById("prev");
  const proximo = document.getElementById("next");
  const cards = track.children;
  let indice = 0;

  function visiveis() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function atualizar() {
    const max = Math.max(0, cards.length - visiveis());
    carousel.classList.toggle("sem-rolagem", max === 0);
    indice = Math.min(indice, max);
    const passo = cards[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(${-indice * passo}px)`;
    anterior.disabled = indice === 0;
    proximo.disabled = indice >= max;
  }

  anterior.addEventListener("click", () => { indice--; atualizar(); });
  proximo.addEventListener("click", () => { indice++; atualizar(); });
  window.addEventListener("resize", atualizar);
  atualizar();
}

function iniciarFormulario() {
  const form = document.getElementById("formContato");
  const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    mensagem: document.getElementById("mensagem"),
  };
  const sucesso = document.getElementById("sucesso");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validarCampo(nome) {
    const campo = campos[nome];
    const valor = campo.value.trim();
    let msg = "";

    if (!valor) {
      msg = "Este campo é obrigatório.";
    } else if (nome === "nome" && valor.length < 3) {
      msg = "O nome deve ter pelo menos 3 caracteres.";
    } else if (nome === "email" && !regexEmail.test(valor)) {
      msg = "Informe um e-mail válido (ex.: nome@dominio.com).";
    } else if (nome === "mensagem" && valor.length < 10) {
      msg = "A mensagem deve ter pelo menos 10 caracteres.";
    }

    document.getElementById("erro-" + nome).textContent = msg;
    campo.classList.toggle("invalido", Boolean(msg));
    campo.setAttribute("aria-invalid", String(Boolean(msg)));
    return !msg;
  }

  Object.keys(campos).forEach((nome) => {
    campos[nome].addEventListener("blur", () => validarCampo(nome));
    campos[nome].addEventListener("input", () => {
      sucesso.textContent = "";
      if (campos[nome].classList.contains("invalido")) validarCampo(nome);
    });
  });

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const resultados = Object.keys(campos).map(validarCampo);

    if (resultados.every(Boolean)) {
      const botao = form.querySelector("button[type=submit]");
      const configurado = !ENDPOINT_FORMULARIO.includes("SEU_ID");

      if (!configurado) {
        sucesso.style.color = "";
        sucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
        form.reset();
        return;
      }

      botao.disabled = true;
      botao.textContent = "Enviando...";
      sucesso.textContent = "";

      try {
        const resposta = await fetch(ENDPOINT_FORMULARIO, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (resposta.ok) {
          sucesso.style.color = "";
          sucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
          form.reset();
        } else {
          throw new Error("Falha no envio");
        }
      } catch (erro) {
        sucesso.style.color = "var(--erro)";
        sucesso.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
      } finally {
        botao.disabled = false;
        botao.textContent = "Enviar";
      }
    } else {
      sucesso.textContent = "";
      const primeiro = Object.keys(campos).find((n) => campos[n].classList.contains("invalido"));
      campos[primeiro].focus();
    }
  });
}


function iniciarAnimacoes() {
  const topo = document.querySelector(".topbar");
  const progresso = document.getElementById("progresso");

  function aoRolar() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    progresso.style.transform = `scaleX(${pct})`;
    topo.classList.toggle("rolou", window.scrollY > 10);
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  const itens = document.querySelectorAll(".reveal");
  document.querySelectorAll(".card").forEach((c, i) => c.style.setProperty("--i", i));
  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  itens.forEach((el) => observador.observe(el));
}
