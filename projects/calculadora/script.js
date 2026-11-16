const resultado = document.getElementById("resultado");
const historico = document.getElementById("historico");

let valorAtual = "0";      // número que está sendo digitado
let valorAnterior = null;  // primeiro operando
let operador = null;       // operação escolhida
let recomecar = false;     // true após "=" ou erro: próximo número começa do zero

const simbolos = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" };

function formatar(texto) {
    return String(texto).replace(".", ",");
}

function atualizarTela() {
    resultado.textContent = formatar(valorAtual);
    if (operador !== null && valorAnterior !== null) {
        historico.textContent = formatar(valorAnterior) + " " + simbolos[operador];
    } else {
        historico.textContent = "";
    }
    document.querySelectorAll(".operador").forEach((botao) => {
        botao.classList.toggle("ativo", botao.dataset.op === operador && recomecar === "operador");
    });
}

function digitarNumero(numero) {
    if (valorAtual === "Erro") limpar();
    if (recomecar === true || recomecar === "operador") {
        valorAtual = "0";
        recomecar = false;
    }
    if (valorAtual.replace(/[-.]/g, "").length >= 12) return;
    valorAtual = valorAtual === "0" ? numero : valorAtual + numero;
    atualizarTela();
}

function digitarPonto() {
    if (valorAtual === "Erro") limpar();
    if (recomecar === true || recomecar === "operador") {
        valorAtual = "0";
        recomecar = false;
    }
    if (!valorAtual.includes(".")) valorAtual += ".";
    atualizarTela();
}

function calcular(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? null : a / b;
        case "%": return b === 0 ? null : a % b;
    }
}

function arredondar(numero) {
    if (numero === null || !isFinite(numero)) return "Erro";
    // evita erros de ponto flutuante, como 0.1 + 0.2
    let texto = String(parseFloat(numero.toPrecision(12)));
    if (texto.includes("e")) texto = numero.toExponential(6);
    return texto;
}

function escolherOperador(novoOperador) {
    if (valorAtual === "Erro") return;
    // encadeia operações: 2 + 3 + ... calcula 2 + 3 antes de seguir
    if (operador !== null && recomecar !== "operador") {
        valorAtual = arredondar(calcular(valorAnterior, valorAtual, operador));
        if (valorAtual === "Erro") {
            operador = null;
            valorAnterior = null;
            recomecar = true;
            atualizarTela();
            return;
        }
    }
    valorAnterior = valorAtual;
    operador = novoOperador;
    recomecar = "operador";
    atualizarTela();
}

function igual() {
    if (operador === null || recomecar === "operador") return;
    const conta = formatar(valorAnterior) + " " + simbolos[operador] + " " + formatar(valorAtual) + " =";
    valorAtual = arredondar(calcular(valorAnterior, valorAtual, operador));
    operador = null;
    valorAnterior = null;
    recomecar = true;
    atualizarTela();
    historico.textContent = conta;
}

function limpar() {
    valorAtual = "0";
    valorAnterior = null;
    operador = null;
    recomecar = false;
    atualizarTela();
}

function apagar() {
    if (valorAtual === "Erro" || recomecar === true) return limpar();
    if (recomecar === "operador") return;
    valorAtual = valorAtual.length > 1 && !(valorAtual.length === 2 && valorAtual[0] === "-")
        ? valorAtual.slice(0, -1)
        : "0";
    atualizarTela();
}

// Cliques nos botões
document.querySelector(".teclas").addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    if (!botao) return;

    if (botao.dataset.num !== undefined) digitarNumero(botao.dataset.num);
    else if (botao.dataset.op) escolherOperador(botao.dataset.op);
    else if (botao.dataset.acao === "ponto") digitarPonto();
    else if (botao.dataset.acao === "igual") igual();
    else if (botao.dataset.acao === "limpar") limpar();
    else if (botao.dataset.acao === "apagar") apagar();
});

// Suporte ao teclado
document.addEventListener("keydown", (evento) => {
    const tecla = evento.key;
    if (/^[0-9]$/.test(tecla)) digitarNumero(tecla);
    else if (["+", "-", "*", "/", "%"].includes(tecla)) escolherOperador(tecla);
    else if (tecla === "," || tecla === ".") digitarPonto();
    else if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        igual();
    }
    else if (tecla === "Backspace") apagar();
    else if (tecla === "Escape" || tecla.toLowerCase() === "c") limpar();
});

atualizarTela();
