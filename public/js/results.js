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

const year_dropdown = document.getElementById('year-dropdown');
const season_dropdown = document.getElementById('season-dropdown');
const result_type_dropdown = document.getElementById('result-type-dropdown');
const all_tables = document.getElementsByTagName('table');
const all_seasons_table = document.getElementById('all-seasons-table');
const race_result_table = document.getElementById('race-result-table');
const sprint_table = document.getElementById('sprint-table');
const fastest_lap_table = document.getElementById('fastest-lap-table');
const wrap_div = document.getElementById('wrap-div');

function create_all_seasons_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');

    table.className = 'all-seasons-table';
    table.id = 'all-seasons-table';

    thead.append(tr);
    table.append(thead, tbody);

    const fields = ['Grand prix', 'Date', 'Winner', 'Car', 'Laps', 'Time']
    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

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
    return table;
}

function create_race_result_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');

    table.className = 'race-result-table';
    table.id = 'race-result-table';

    thead.append(tr);
    table.append(thead, tbody);

    const fields = ['Pos', 'No', 'Driver', 'Car', 'Laps', 'Time/retired', 'Pts']
    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

    Array.from(data).forEach(function (result) {
        const row = document.createElement('tr');
        const pos_td = document.createElement('td');
        const no_td = document.createElement('td');
        const driver_td = document.createElement('td');
        const car_td = document.createElement('td');
        const laps_td = document.createElement('td');
        const time_retired_td = document.createElement('td');
        const pts_td = document.createElement('td');

        pos_td.textContent = Array.from(data).indexOf(result) + 1;
        no_td.textContent = result.position.split(' ')[3];
        driver_td.textContent = result.name;
        car_td.textContent = result.car;
        laps_td.textContent = result.laps;
        time_retired_td.textContent = result.time_retired;
        pts_td.textContent = result.pts;

        Array.from(data).indexOf(result) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

        row.append(pos_td, no_td, driver_td, car_td, laps_td, time_retired_td, pts_td);
        tbody.append(row);
    });
    return table;
}

function create_sprint_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');

    table.className = 'sprint-table';
    table.id = 'sprint-table';

    thead.append(tr);
    table.append(thead, tbody);

    const fields = ['Pos', 'No', 'Driver', 'Car', 'Laps', 'Time/retired', 'Pts']
    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

    Array.from(data).forEach(function (result) {
        const row = document.createElement('tr');
        const pos_td = document.createElement('td');
        const no_td = document.createElement('td');
        const driver_td = document.createElement('td');
        const car_td = document.createElement('td');
        const laps_td = document.createElement('td');
        const time_retired_td = document.createElement('td');
        const pts_td = document.createElement('td');

        pos_td.textContent = Array.from(data).indexOf(result) + 1;
        no_td.textContent = result.position.split(' ')[3];
        driver_td.textContent = result.name;
        car_td.textContent = result.car;
        laps_td.textContent = result.laps;
        time_retired_td.textContent = result.time_retired;
        pts_td.textContent = result.pts;

        Array.from(data).indexOf(result) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

        row.append(pos_td, no_td, driver_td, car_td, laps_td, time_retired_td, pts_td);
        tbody.append(row);
    });
    return table;
}

function create_fastest_lap_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const fields = ['Pos', 'No', 'Driver', 'Car', 'Lap', 'Time of day', 'Time', 'Avg speed']
    const tbody = document.createElement('tbody');

    table.className = 'fastest-lap-table';
    table.id = 'fastest-lap-table';

    thead.append(tr);
    table.append(thead, tbody);

    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

    Array.from(data).forEach(function (result) {
        const row = document.createElement('tr');
        const pos_td = document.createElement('td');
        const no_td = document.createElement('td');
        const driver_td = document.createElement('td');
        const car_td = document.createElement('td');
        const lap_td = document.createElement('td');
        const time_of_day_td = document.createElement('td');
        const time_td = document.createElement('td');
        const avg_speed_td = document.createElement('td');

        pos_td.textContent = Array.from(data).indexOf(result) + 1;
        no_td.textContent = result.position.split(' ')[3];
        driver_td.textContent = result.name;
        car_td.textContent = result.car;
        lap_td.textContent = result.laps;
        time_of_day_td.textContent = result.time_of_day;
        time_td.textContent = result.time;
        avg_speed_td.textContent = result.avg_speed;

        Array.from(data).indexOf(result) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

        row.append(pos_td, no_td, driver_td, car_td, lap_td, time_of_day_td, time_td, avg_speed_td);
        tbody.append(row);
    });
    return table;
}

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
        const all_seasons_table = create_all_seasons_table(data);
        if (wrap_div.lastChild.tagName == 'TABLE') {
            wrap_div.removeChild(wrap_div.lastChild);
        }
        wrap_div.append(all_seasons_table);
    } catch (error) {
        console.log(error);
    }
};

async function fetchResultType(year, grand_prix, result_type) {
    try {
        const response = await fetch(`/api/result/types?year=${year}&grand_prix=${grand_prix}&result_type=${result_type}`);
        const data = await response.json();
        if (Array.from(data).length == 2) {
            const sprint_option = document.createElement('option');
            sprint_option.textContent = 'Sprint';
            result_type_dropdown.append(sprint_option);
        } else {
            result_type_dropdown.removeChild(result_type_dropdown.lastChild);
        }
    } catch (error) {
        console.log(error);
    }
};

async function fetchRaceResult(year, grand_prix, result_type) {
    try {
        const response = await fetch(`/api/result/race-result?year=${year}&grand_prix=${grand_prix}&result_type=${result_type}`);
        const data = await response.json();
        switch (result_type_dropdown.value) {
            case 'Race result':
                var result_table = create_race_result_table(data);
                break;
            case 'Fastest lap':
                var result_table = create_fastest_lap_table(data);
                break;
            case 'Sprint':
                var result_table = create_sprint_table(data);
                break;
            default:
        }
        if (wrap_div.lastChild.tagName == 'TABLE') {
            wrap_div.removeChild(wrap_div.lastChild);
        }
        wrap_div.append(result_table);
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
        fetchAllSeasonsResult(year_dropdown.value);
    } else {
        result_type_dropdown.disabled = false;
        fetchResultType(year_dropdown.value, season_dropdown.value);
        fetchRaceResult(year_dropdown.value, season_dropdown.value, result_type_dropdown.value);
    }
});

result_type_dropdown.addEventListener('change', function (event) {
    fetchRaceResult(year_dropdown.value, season_dropdown.value, result_type_dropdown.value);
});
