const curretYear = 2024;
const weekDays = ['Pzt', 'Salı', 'Çrş', 'Prş', 'Cum', 'Cmrt', 'Pzr'];
const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık'
];

const colors = ['#73a340', '#d4cb13', '#e05e08', '#e40404', '#003391'];
const defaultColor = '#888';
let activeColor = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');

moods.forEach(mood => {
    mood.addEventListener('click', () => {
        if (mood.classList.contains('selected')) {
            mood.classList.remove('selected');
            activeColor = defaultColor;
        } else {
            moods.forEach(mood => {
                mood.classList.remove('selected');
            });

            mood.classList.add('selected');
            activeColor = getComputedStyle(mood).getPropertyValue('color');
        }
    });
});


const getAllDay = year => {
    //yılın ilk ve son günü belinlendi
    const firstDay = new Date(`Ocak 1 $(year)`);
    const lastDay = new Date(`Aralık 31 $(year)`);

    const days = [firstDay];

    let lastDayInArray = firstDay;

    //bu döngü days dizisine yılın tüm günlerini ekleyecek
    while (lastDayInArray.getTime() !== lastDay.getTime()) {
        days.push(addDays(lastDayInArray, 1));
        lastDayInArray = days[days.length - 1];
    }
    return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

months.forEach((month, idx) => {
    monthsHTML += `<div class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays.map(day => `<div class="week_days">${day}</div>`).join('')}</div>
        <div class="days_container"></div>
    </div>`;
});

calendar.innerHTML = monthsHTML;

dates.forEach(date => {
    const month = date.getMonth();
    const monthEl = document.querySelector(`.month_${month} .days_container`);

    if (date.getDate() === 1 && date.getDay() !== 0) {
        for (let i = 0; i < date.getDay(); i++) {
            const emptySpot = createEmptySpot();

            monthEl.appendChild(emptySpot);
        }
    }
    const dateEl = createDateEl(date);
    monthEl.appendChild(dateEl);
});


const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColor;
	});
});


function getRandomColor() {
	return colors[Math.floor(Math.random() * 5)];
}

