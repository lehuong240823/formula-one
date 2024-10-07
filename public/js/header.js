async function loadGoogleTranslate() {
    try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    } catch (error) {
        console.log(error);
    }
}

async function googleTranslateElementInit() {
    try {
        new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    } catch (error) {
        console.log(error);
    }
}

(async function () {
    try {
        loadGoogleTranslate();
        googleTranslateElementInit();
        const google_gadget = document.getElementById('google_translate_element').firstChild;
        google_gadget.removeChild(google_gadget.lastChild);
        google_gadget.removeChild(google_gadget.lastChild);
    } catch (error) {
        console.log(error);
    }
})();

