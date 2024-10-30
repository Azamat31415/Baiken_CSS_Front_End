document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const property = document.getElementById('property').value;
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const rooms = document.getElementById('rooms').value;
    const area = document.getElementById('area').value;
    const contacts = document.getElementById('contatcs').value;
    const additional = document.getElementById('additional').value;
    const imageInput = document.getElementById('image-upload');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveAd({
                category,
                property,
                location,
                price,
                rooms,
                area,
                contacts,
                additional,
                image: e.target.result
            });
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Please upload an image!");
    }
});

function saveAd(ad) {
    const storageKey = ad.category === 'Sell' ? 'salesAds' : 'leaseAds';
    const ads = JSON.parse(localStorage.getItem(storageKey)) || [];
    ads.push(ad);
    localStorage.setItem(storageKey, JSON.stringify(ads));

    const personalAccountAds = JSON.parse(localStorage.getItem('personalAccountAds')) || [];
    personalAccountAds.push({ ...ad, inCart: false });
    localStorage.setItem('personalAccountAds', JSON.stringify(personalAccountAds));

    alert("Submission successful!");
    document.querySelector('form').reset();
    document.getElementById('preview-image').src = "https://ioscookbook.files.wordpress.com/2018/04/images-icon.jpg";
}

document.getElementById('image-upload').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImage = document.getElementById('preview-image');
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
