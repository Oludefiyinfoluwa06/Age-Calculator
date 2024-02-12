const calcBtn = document.getElementById('calc-btn');

let yearTitle = document.querySelector('.year-title');
let monthTitle = document.querySelector('.month-title');
let dayTitle = document.querySelector('.day-title');

let year = document.getElementById('year');
let month = document.getElementById('month');
let day = document.getElementById('day');

let yearValue = document.getElementById('year-value');
let monthValue = document.getElementById('month-value');
let dayValue = document.getElementById('day-value');

let yearError = document.getElementById('year-error');
let monthError = document.getElementById('month-error');
let dayError = document.getElementById('day-error');

const isValidDate = (year, month, day) => {
    let date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
    );
}

calcBtn.addEventListener('click', () => {
    const today = new Date();
    const thisYear = today.getFullYear();

    yearError.innerText = '';
    yearTitle.style.color = '';
    year.style.borderColor = '';
    monthError.innerText = '';
    monthTitle.style.color = '';
    month.style.borderColor = '';
    dayError.innerText = '';
    dayTitle.style.color = '';
    day.style.borderColor = '';

    if (year.value === '') {
        yearError.innerText = 'This field is required';
        yearTitle.style.color = 'hsl(0, 100%, 67%)';
        year.style.borderColor = 'hsl(0, 100%, 67%)';
    } else if (isNaN(year.value) || parseInt(year.value) < 1) {
        yearError.innerText = 'Must be a valid year';
        yearTitle.style.color = 'hsl(0, 100%, 67%)';
        year.style.borderColor = 'hsl(0, 100%, 67%)';
    } else if (parseInt(year.value) > thisYear) {
        yearError.innerText = 'Must be in the past';
        yearTitle.style.color = 'hsl(0, 100%, 67%)';
        year.style.borderColor = 'hsl(0, 100%, 67%)';
    } else {
        yearError.innerText = '';
        yearTitle.style.color = '';
        year.style.borderColor = '';
    }

    if (month.value === '') {
        monthError.innerText = 'This field is required';
        monthTitle.style.color = 'hsl(0, 100%, 67%)';
        month.style.borderColor = 'hsl(0, 100%, 67%)';
    } else if (isNaN(month.value) || parseInt(month.value) < 1 || parseInt(month.value) > 12) {
        monthError.innerText = 'Must be a valid month';
        monthTitle.style.color = 'hsl(0, 100%, 67%)';
        month.style.borderColor = 'hsl(0, 100%, 67%)';
    } else {
        monthError.innerText = '';
        monthTitle.style.color = '';
        month.style.borderColor = '';
    }

    if (day.value === '') {
        dayError.innerText = 'This field is required';
        dayTitle.style.color = 'hsl(0, 100%, 67%)';
        day.style.borderColor = 'hsl(0, 100%, 67%)';
    } else if (isNaN(day.value) || parseInt(day.value) < 1 || parseInt(day.value) > 31) {
        dayError.innerText = 'Must be a valid day';
        dayTitle.style.color = 'hsl(0, 100%, 67%)';
        day.style.borderColor = 'hsl(0, 100%, 67%)';
    } else if (!isValidDate(parseInt(year.value), parseInt(month.value), parseInt(day.value))) {
        dayError.innerText = 'Must be a valid day';
        dayTitle.style.color = 'hsl(0, 100%, 67%)';
        day.style.borderColor = 'hsl(0, 100%, 67%)';
    } else {
        dayError.innerText = '';
        dayTitle.style.color = '';
        day.style.borderColor = '';
    }

    if (yearError.innerText !== '' || monthError.innerText !== '' || dayError.innerText !== '') {
        return;
    }

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }

    let ageYears = thisYear - parseInt(year.value);
    let ageMonths = today.getMonth() - parseInt(month.value);
    let ageDays = today.getDate() - parseInt(day.value);

    if (ageDays < 0) {
        ageDays += daysInMonth(today.getMonth() + 1, thisYear);

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths = 11;
        } else if (ageMonths === 0 && ageDays >= 0) {
            ageMonths = 0;
        } else {
            ageMonths--; 
        }
    }

    if (ageMonths < 0) {
        ageMonths = 0;
    }

    yearValue.innerText = ageYears;
    monthValue.innerText = ageMonths;
    dayValue.innerText = ageDays;
});
