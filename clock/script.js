const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');
const $center = document.querySelector('.center');
const $time = document.querySelector('.time');
const $date = document.querySelector('.date-container');

const days = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
]

const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
]

const checkDigit = (digit) => digit < 10 ? `0${digit}` : digit;

const setDay = () => {
    let today = new Date();

    const second = today.getSeconds();
    const secondDeg = (second / 60) * 360 + 360;
    $second.style.transform = `rotate(${secondDeg}deg)`;

    const minute = today.getMinutes();
    const minuteDeg = (minute / 60) * 360;
    $minute.style.transform = `rotate(${minuteDeg}deg)`;

    const hour = today.getHours();
    const hourDeg = (hour / 12) * 360;
    $hour.style.transform = `rotate(${hourDeg}deg)`;

    console.log({
        second,
        minute,
        hour,
    })

    $time.innerHTML = `<span><strong>${checkDigit(hour)}</strong>:<strong>${checkDigit(minute)}</strong>:${checkDigit(second)}</span>`;
    /*$date.innerHTML = `<span>${today.toDateString()}</span>`;*/
    $date.innerHTML = `
    <span>
    ${days[today.getDay()]},
    ${months[today.getMonth()]}
    <strong>${today.getDate()}</strong>
    </span>
    `
}

setInterval(setDay, 1000);