const gambar = document.getElementById("gambar");
gambar.setAttribute("width", 300);
gambar.setAttribute("height", 215);

const buttons = document.querySelectorAll(".button");
const playButton = buttons[3];
const playButtonElement = playButton.children[0];
playButtonElement.setAttribute("type", "submit");
const button = document.getElementsByClassName('button')
for (const item of button) {
    item.children[0].style.borderRadius = '6px'
}

const dicoding = document.getElementById("dicodingLink");
dicoding.innerText = "Belajar Programming di Dicoding";
dicoding.innerHTML = '<i>Belajar programming di dicoding</i>'
