fetch(`../html/header.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

fetch('../html/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

fetch('/api/circuit')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data[0]);
        const card_layout = document.getElementById('card-layout');
        data.forEach(function(element) {
            const circuit_name = document.createElement('text');
            const circuit_img = document.createElement('img');
            const circuit_card = document.createElement('div');

            circuit_name.className = 'circuit-name';
            circuit_img.className = 'circuit-img';
            circuit_card.className = 'circuit-card';

            circuit_name.textContent = element.name;
            circuit_img.src = element.carbon_png;

            circuit_card.append(circuit_name, circuit_img);
            card_layout.append(circuit_card);
        });
    })
    .catch(error => {
        console.error('Error fetching circuits:', error);
    });
