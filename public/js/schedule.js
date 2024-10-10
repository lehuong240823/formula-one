(async function fetchHeader() {
    try {
        const response = await fetch('../html/header.html');
        const data = await response.text();
        document.getElementById('header').innerHTML = data;
        loadGoogleTranslate();
    } catch (error) {
        console.log(error);
    }
})();

(async function fetchFooter() {
    try {
        const response = await fetch('../html/footer.html');
        const data = await response.text();
        const footer = document.getElementById('footer');
        const scripts = footer.getElementsByTagName('script');
        footer.innerHTML = data;
        Array.from(scripts).forEach(function (script) {
            const new_script = document.createElement('script');
            new_script.src = script.src;
            document.body.appendChild(new_script);
        });
    } catch (error) {
        console.log(error);
    }
})();

function loadGoogleTranslate() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
}

window.addEventListener('load', function () {
    const google_gadget = document.getElementById('google_translate_element').firstChild;
    google_gadget.removeChild(google_gadget.lastChild);
    google_gadget.removeChild(google_gadget.lastChild);
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

//---------------------------------------------------------------------------------------------------------

(async function fetchSchedule() {
    try {
        const response = await fetch('/api/schedule');
        const data = await response.json();
        const card_layout = document.getElementById('card-layout');
        Array.from(data).forEach(function (schedule) {
            const schedule_card = document.createElement('div');
            const round = document.createElement('text');
            const schedule_hr_1 = document.createElement('hr');
            const date_flag_div = document.createElement('div');
            const date_div = document.createElement('div');
            const date = document.createElement('text');
            const month = document.createElement('text');
            const country_flag = document.createElement('img');
            const schedule_hr_2 = document.createElement('hr');
            const grand_prix_div = document.createElement('div');
            const venue = document.createElement('text');
            const grand_prix = document.createElement('text');
            const schedule_hr_3 = document.createElement('hr');
            const circuit_div = document.createElement('div');
            const circuit_img = document.createElement('img');

            schedule_card.className = 'schedule-card';
            round.className = 'round';
            schedule_hr_1.className = 'schedule-hr';
            date_flag_div.className = 'date-flag-div';
            date_div.className = 'date-div';
            date.className = 'date';
            month.className = 'month';
            country_flag.className = 'country-flag';
            schedule_hr_2.className = 'schedule-hr';
            grand_prix_div.className = 'grand-prix-div';
            venue.className = 'venue';
            grand_prix.className = 'grand-prix';
            schedule_hr_3.className = 'schedule-hr';
            circuit_div.className = 'circuit-div';
            circuit_img.className = 'circuit-img';

            round.textContent = schedule.round;
            date.textContent = schedule.date;
            month.textContent = schedule.month;
            country_flag.src = '../img/flags/schedule/'.concat(schedule.grand_prix, '.png');
            venue.textContent = schedule.grand_prix;
            grand_prix.textContent = schedule.grand_prix_title;
            circuit_img.src = schedule.carbon_png;

            card_layout.append(schedule_card);
            schedule_card.append(round, schedule_hr_1, date_flag_div, schedule_hr_2, grand_prix_div, schedule_hr_3, circuit_div);
            date_flag_div.append(date_div, country_flag);
            date_div.append(date, month);
            grand_prix_div.append(venue, grand_prix);
            circuit_div.append(circuit_img);
        });
    } catch (error) {
        console.log(error);
    }
})();