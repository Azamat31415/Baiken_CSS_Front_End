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

    const ad = {
        category,
        property,
        location,
        price,
        rooms,
        area,
        contacts,
        additional
    };

    // Сохраняем объявление в localStorage
    const storageKey = category === 'Sell' ? 'salesAds' : 'leaseAds';
    const ads = JSON.parse(localStorage.getItem(storageKey)) || [];
    ads.push(ad);
    localStorage.setItem(storageKey, JSON.stringify(ads));

    // Сохраняем объявление в personal account
    const personalAccountAds = JSON.parse(localStorage.getItem('personalAccountAds')) || [];
    personalAccountAds.push({ ...ad, inCart: false }); // Добавляем поле inCart для отслеживания
    localStorage.setItem('personalAccountAds', JSON.stringify(personalAccountAds));


    alert("Submission successful!");

    // Очищаем форму после отправки
    document.querySelector('form').reset();
});
