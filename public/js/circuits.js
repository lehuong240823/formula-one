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

(async function fetchCircuit() {
    try {
        const response = await fetch(`/api/circuit`);
        const data = await response.json();
        const card_layout = document.getElementById('card-layout');

        Array.from(data).forEach(function (element) {
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
    } catch (error) {
        console.log(error);
    }
})();
