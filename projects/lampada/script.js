var lamp = document.getElementById("lamp");
var inter = false;
var switchButton = document.getElementById("switch");
var switchLabel = document.getElementById("switch-label");

switchButton.addEventListener("click", lig_des);

function lig_des() {
    if (!inter) {
        lamp.src = "assets/lamp_on.png";
        lamp.alt = "Lâmpada acesa";
        document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)";
        switchButton.classList.add("on");
        switchButton.setAttribute("aria-pressed", "true");
        switchButton.setAttribute("aria-label", "Desligar lâmpada");
        switchLabel.textContent = "ON";
        inter = true;
    } else {
        lamp.src = "assets/lamp_off.png";
        lamp.alt = "Lâmpada apagada";
        document.body.style.background = "radial-gradient(circle, white 8%, black 100%)";
        switchButton.classList.remove("on");
        switchButton.setAttribute("aria-pressed", "false");
        switchButton.setAttribute("aria-label", "Ligar lâmpada");
        switchLabel.textContent = "OFF";
        inter = false;
    }
}
