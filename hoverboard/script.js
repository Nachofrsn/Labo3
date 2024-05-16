const SQUARES = 400 // SCREAMING_CASE
const COLORS = ["#ffb3c6", "#fb6f92", "#ffc2d1", "#ff8fab", "#ff70a6"]
const $container = document.querySelector('#container')
const $btnGenerate = document.querySelector(".btn-generate"); 
const $squares = document.querySelector("#squares");

$btnGenerate.addEventListener("click", (e) => {
    e.preventDefault();
    generateSquares($squares.value);
})

function generateSquares($squares = 300) {

    if($container.childNodes.length > 0)
    {
        $container.childNodes.forEach((child) => {
            child.removeEventListener('mouseover', () => setColor(child))
            child.removeEventListener('mouseout', () => removeColor(child))
        })
    }

    for (let index = 0; index < SQUARES; index++){
        const $square = document.createElement('div')
        $square.classList.add('square')

        $square.addEventListener('mouseover', () => setColor($square));
        $square.addEventListener('mouseout', ()=> removeColor($square));


        $container.appendChild($square)
    }
}

function setColor (element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.background = "var(--secondary-color)";
    element.style.boxShadow = "0 0 2px var(--tertiary-color)";
}

function getRandomColor() {
    const i = Math.floor(Math.random() * COLORS.length)
    return COLORS[i]
}

generateSquares()