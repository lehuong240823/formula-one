fetch('../html/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

fetch('../html/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

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
