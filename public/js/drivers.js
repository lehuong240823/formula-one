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

(async function fetchDrivers() {
    try {
        const response = await fetch('/api/driver');
        const data = await response.json();
        const card_layout = document.getElementById('card-layout');
        Array.from(data).forEach(function (driver) {
            const driver_card = document.createElement('div');
            const driver_img = document.createElement('img');
            const driver_infor = document.createElement('div');
            const name_div = document.createElement('div');
            const first_name_div = document.createElement('div');
            const first_name = document.createElement('text');
            const country_flag = document.createElement('img');
            const last_name = document.createElement('text');
            const point_div = document.createElement('div');
            const point_num = document.createElement('text');
            const pts = document.createElement('text');
            const card_footer = document.createElement('div');
            const team_name = document.createElement('text');
            const driver_pos = document.createElement('img');

            driver_card.className = 'driver-card';
            driver_img.className = 'driver-img';
            driver_infor.className = 'driver-infor';
            name_div.className = 'name-div';
            first_name_div.className = 'first-name-div';
            first_name.className = 'first-name';
            country_flag.className = 'country-flag';
            last_name.className = 'last-name';
            point_div.className = 'point-div';
            point_num.className = 'point-num';
            pts.className = 'pts';
            card_footer.className = 'card-footer';
            team_name.className = 'team-name';
            driver_pos.className = 'driver-pos';

            driver_img.src = driver.profile_avif;
            first_name.textContent = driver.name.split(' ')[0];
            last_name.textContent = driver.name.split(' ')[1];
            country_flag.src = '../img/flags/drivers/'.concat(driver.country, '.jpg');
            point_num.textContent = driver.points;
            pts.textContent = 'PTS';
            team_name.textContent = driver.short_name;
            driver_pos.src = driver.position_png;

            driver_card.append(driver_img, driver_infor, card_footer);
            driver_infor.append(name_div, point_div);
            name_div.append(first_name_div, last_name);
            first_name_div.append(first_name, country_flag);
            point_div.append(point_num, pts);
            card_footer.append(team_name, driver_pos);
            card_layout.append(driver_card);
        });
    } catch (error) {
        console.log(error);
    }
})();
