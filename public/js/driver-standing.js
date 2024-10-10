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
const wrap_div = document.getElementById('wrap-div');
const dropdown_div = document.getElementById('dropdown-div');
const year_dropdown = document.getElementById('year-dropdown');

function create_all_drivers_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');
    const fields = ['Pos', 'Driver', 'Nationality', 'Car', 'Pts']

    table.className = 'all-drivers-table';
    table.id = 'all-drivers-table';

    thead.append(tr);
    table.append(thead, tbody);

    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

    Array.from(data).forEach(function (standing) {
        const row = document.createElement('tr');
        const pos_td = document.createElement('td');
        const driver_td = document.createElement('td');
        const nationality_td = document.createElement('td');
        const car_td = document.createElement('td');
        const pts_td = document.createElement('td');

        pos_td.textContent = Array.from(data).indexOf(standing) + 1;
        driver_td.textContent = standing.name;
        nationality_td.textContent = standing.country;
        car_td.textContent = standing.car;
        pts_td.textContent = standing.total_pts;

        Array.from(data).indexOf(standing) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

        row.append(pos_td, driver_td, nationality_td, car_td, pts_td);
        tbody.append(row);
    });

    return table;
}

function create_driver_table(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');
    const fields = ['Grand prix', 'Date', 'Car', 'Race position', 'Pts']

    table.className = 'driver-table';
    table.id = 'driver-table';

    thead.append(tr);
    table.append(thead, tbody);

    fields.forEach(function (field) {
        const th = document.createElement('th');
        th.textContent = field;
        tr.append(th);
    })

    Array.from(data).forEach(function (standing) {
        const row = document.createElement('tr');
        const grand_prix_td = document.createElement('td');
        const date_td = document.createElement('td');
        const car_td = document.createElement('td');
        const race_pos_td = document.createElement('td');
        const pts_td = document.createElement('td');

        grand_prix_td.textContent = standing.grand_prix;
        date_td.textContent = standing.date.toString().concat(' ', standing.month, ' ', standing.year);
        car_td.textContent = standing.car;
        race_pos_td.textContent = standing.time_retired;
        pts_td.textContent = standing.total_pts;

        Array.from(data).indexOf(standing) % 2 == 0 ? row.className = 'white-row' : row.className = 'gray-row';

        row.append(grand_prix_td, date_td, car_td, race_pos_td, pts_td);
        tbody.append(row);
    });

    return table;
}

(async function fetchYear() {
    try {
        const response = await fetch('/api/driver-standing/year');
        const data = await response.json();
        const current_year = new Date().getFullYear();
        Array.from(data).forEach(function (standing) {
            const option = document.createElement('option');
            option.textContent = standing.year;
            year_dropdown.append(option);
            if (standing.year == current_year) {
                option.selected = true;
                fetchAllDrivers(current_year);
                fetchAllDriversStanding(current_year);
            }
        });
    } catch (error) {
        console.log(error);
    }
})();

function create_driver_dropdown(data) {
    const dropdown = document.createElement('select');

    dropdown.className = 'driver-dropdown';
    dropdown.id = 'driver-dropdown';

    const all_drivers_option = document.createElement('option');
    all_drivers_option.textContent = 'All drivers';
    dropdown.append(all_drivers_option);
    if (Array.from(data).length != 0) {
        Array.from(data).forEach(function (standing) {
            const option = document.createElement('option');
            option.textContent = standing.name;
            dropdown.append(option);
        });
        dropdown_div.append(dropdown);
    } else {
        dropdown_div.removeChild(dropdown_div.lastChild);
    }

    dropdown.addEventListener('change', function (event) {
        if (this.value == this.options[0].value) {
            fetchAllDriversStanding(year_dropdown.value);
        } else {
            fetchDriverStanding(year_dropdown.value, this.value);
        }
    });

    return dropdown;
}

async function fetchAllDrivers(year) {
    try {
        const response = await fetch(`/api/driver-standing/driver?year=${year}`);
        const data = await response.json();
        create_driver_dropdown(data);
    } catch (error) {
        console.log(error);
    }
};

async function fetchAllDriversStanding(year) {
    try {
        const response = await fetch(`/api/driver-standing/all-drivers-standing?year=${year}`);
        const data = await response.json();
        const standing_table = create_all_drivers_table(data);
        if (wrap_div.lastChild.tagName == 'TABLE') {
            wrap_div.removeChild(wrap_div.lastChild);
        }
        wrap_div.append(standing_table);
    } catch (error) {
        console.log(error);
    }
};

async function fetchDriverStanding(year, driver_name) {
    try {
        const response = await fetch(`/api/driver-standing/driver-standing?year=${year}&driver_name=${driver_name}`);
        const data = await response.json();
        console.log(data)
        const standing_table = create_driver_table(data);
        if (wrap_div.lastChild.tagName == 'TABLE') {
            wrap_div.removeChild(wrap_div.lastChild);
        }
        wrap_div.append(standing_table);
    } catch (error) {
        console.log(error);
    }
};

year_dropdown.addEventListener('change', function (event) {
    fetchAllDrivers(this.value);
    fetchAllDriversStanding(this.value);
});

