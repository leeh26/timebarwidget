function updateBars() {
    const now = new Date();
    
    // Hour
    const hoursPassed = now.getHours() + now.getMinutes() / 60;
    const hourPercentage = (hoursPassed / 24) * 100;
    updateBar('.group:nth-child(1) .bar', hourPercentage);
    
    // Day
    const daysPassed = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
    const dayPercentage = (daysPassed / 24) * 100;
    updateBar('.group:nth-child(2) .bar', dayPercentage);
    
    // Month
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthDaysPassed = now.getDate() + (now.getHours() / 24) + (now.getMinutes() / 1440);
    const monthPercentage = (monthDaysPassed / daysInMonth) * 100;
    updateBar('.group:nth-child(3) .bar', monthPercentage);
    
    // Year
    const daysInYear = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0) ? 366 : 365;
    const yearDaysPassed = (now.getMonth() * 30.44) + (now.getDate() + (now.getHours() / 24) + (now.getMinutes() / 1440)); // Approximation
    const yearPercentage = (yearDaysPassed / daysInYear) * 100;
    updateBar('.group:nth-child(4) .bar', yearPercentage);
}

function updateBar(selector, percentage) {
    const bar = document.querySelector(selector);
    bar.innerHTML = `<div class="fill" style="width: ${percentage}%;"></div>`;
}

updateBars();

setInterval(updateBars, 60000);

document.querySelector('.settings').addEventListener('click', function() {
    document.querySelector('.settings-menu').style.display = 'flex';
});

document.getElementById('close-settings').addEventListener('click', function() {
    document.querySelector('.settings-menu').style.display = 'none';
});

document.getElementById('text-color').addEventListener('input', function(event) {
    const textColor = event.target.value;
    document.querySelectorAll('.group .title').forEach(title => {
        title.style.color = textColor;
    });

    document.querySelectorAll('.group .bar').forEach(bar => {
        bar.style.outlineColor = textColor;
    });

    document.getElementById("settings-dot").style.color = textColor;
});

document.getElementById('fill-color').addEventListener('input', function(event) {
    const fillColor = event.target.value;
    document.querySelectorAll('.bar .fill').forEach(fill => {
        fill.style.backgroundColor = fillColor;
    });

});