(async function fetchImageFromDir() {
    try {
        const response = await fetch('/api/img-file');
        const data = await response.json();
        const path = '../img/sponsors/white/';
        const sponsor_img_div = document.getElementById('sponsor-img-div');
        Array.from(data).forEach(function(img_name) {
            let sponsor_img = document.createElement('img');
            sponsor_img.className = 'sponsor-img';
            sponsor_img.src = path.concat(img_name);
            sponsor_img_div.appendChild(sponsor_img);
        });
    } catch (error) {
        console.log(error);
    }
})();