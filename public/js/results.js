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

const year_dropdown = document.getElementById('year-dropdown');
const season_dropdown = document.getElementById('season-dropdown');
const result_type_dropdown = document.getElementById('result-type-dropdown');
const all_tables = document.getElementsByTagName('table');
const all_seasons_table = document.getElementById('all-seasons-table');

(async function fetchYear() {
    try {
        const response = await fetch('/api/schedule/year');
        const data = await response.json();
        const current_year = new Date().getFullYear();
        Array.from(data).forEach(function (schedule) {
            const year_option = document.createElement('option');
            year_option.textContent = schedule.year;
            year_dropdown.append(year_option);
            if (schedule.year == current_year) {
                year_option.selected = true;
                fetchGrandPrix(current_year);
                fetchAllSeasonsResult(current_year);
            }
        });
    } catch (error) {
        console.log(error);
    }
})();

async function fetchGrandPrix(year) {
    try {
        const response = await fetch(`/api/schedule/grand-prix?year=${year}`);
        const data = await response.json();
        season_dropdown.innerHTML = '';
        const all_seasons_option = document.createElement('option');
        all_seasons_option.textContent = 'All seasons';
        season_dropdown.append(all_seasons_option);
        Array.from(data).forEach(function (schedule) {
            const season_option = document.createElement('option');
            season_option.textContent = schedule.grand_prix;
            season_dropdown.append(season_option);
        });
    } catch (error) {
        console.log(error);
    }
}

async function fetchAllSeasonsResult(year) {
    try {
        const response = await fetch(`/api/result/all-seasons?year=${year}`);
        const data = await response.json();
        const tbody = all_seasons_table.getElementsByTagName('tbody')[0];
        if (tbody != null) {
            tbody.innerHTML = '';
        }

        Array.from(data).forEach(function (result) {
            const row = document.createElement('tr');
            const grand_prix_td = document.createElement('td');
            const date_td = document.createElement('td');
            const winner_td = document.createElement('td');
            const car_td = document.createElement('td');
            const laps_td = document.createElement('td');
            const time_td = document.createElement('td');

            grand_prix_td.textContent = result.grand_prix;
            date_td.textContent = result.date.toString().concat(' ', result.month, ' ', result.year);
            winner_td.textContent = result.name;
            car_td.textContent = result.car;
            laps_td.textContent = result.laps;
            time_td.textContent = result.time_retired;

            Array.from(data).indexOf(result) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

            row.append(grand_prix_td, date_td, winner_td, car_td, laps_td, time_td);
            tbody.append(row);
        });
    } catch (error) {
        console.log(error);
    }
};

year_dropdown.addEventListener('change', function (event) {
    fetchGrandPrix(this.value);
    fetchAllSeasonsResult(this.value);
    season_dropdown.options[0].selected = true;
    result_type_dropdown.options[0].selected = true;
    result_type_dropdown.disabled = true;
});

season_dropdown.addEventListener('change', function (event) {
    if (this.value == this.options[0].value) {
        result_type_dropdown.disabled = true;
        result_type_dropdown.options[0].selected = true;
        const selected_table = this.options[0].value.toLowerCase().replace(' ', '-').concat('-table');
        Array.from(all_tables).forEach(function (table) {
            table.className == selected_table ? table.style.display = 'table' : table.style.display = 'none';
        });
    } else {
        result_type_dropdown.disabled = false;
        //fetch
    }
});

result_type_dropdown.addEventListener('change', function (event) {
    const selected_table = this.value.toLowerCase().replace(' ', '-').concat('-table');
    Array.from(all_tables).forEach(function (table) {
        table.className == selected_table ? table.style.display = 'table' : table.style.display = 'none';
    });
});
