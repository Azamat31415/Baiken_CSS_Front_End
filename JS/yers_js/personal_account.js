document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('ads-container');
    const adsCountElement = document.getElementById('ads-count');
    let ads = JSON.parse(localStorage.getItem('personalAccountAds')) || [];

    // Функция для отображения всех объявлений
    function displayAds() {
        adsCountElement.innerText = `Number of Ads: ${ads.length}`; // Обновляем количество

        // Очищаем контейнер
        cartContainer.innerHTML = ''; 

        if (ads.length === 0) {
            cartContainer.innerHTML = '<p class="personal-account-text">You don\'t have any ads on your site yet</p>';
        } else {
            ads.forEach(ad => {
                createAdCard(ad); // Теперь передача функции не нужна
            });
        }
    }

    // Функция для создания карточки объявления
    function createAdCard(ad) {
        const newCard = document.createElement('div');
        newCard.classList.add('col-md-4', 'mb-4');
        newCard.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="default_image.jpg" class="card-img-top" alt="Card image">
                <div class="card-body d-flex flex-grow-1 flex-column">
                    <h5 class="card-title">${ad.location}</h5>
                    <p><strong>Category:</strong> ${ad.property}</p>
                    <p class="card-text"><strong>Price:</strong> $${ad.price}</p>
                    <p><strong>Number of rooms:</strong> ${ad.rooms}</p>
                    <p><strong>Area:</strong> ${ad.area} sq. meters</p>
                    <p><strong>Additional:</strong> ${ad.additional}</p>
                </div>
                <div class="mt-auto">
                    <a href="#" class="mb-2 btn btn-danger remove-ad-btn">Remove</a>
                </div>
            </div>
        `;

        // Добавляем обработчик события для удаления
        newCard.querySelector('.remove-ad-btn').addEventListener('click', function(event) {
            event.preventDefault();
            removeAd(ad.location);
        });

        cartContainer.appendChild(newCard);
    }

    // Функция для удаления объявления
    function removeAd(location) {
        ads = ads.filter(ad => ad.location !== location);
        localStorage.setItem('personalAccountAds', JSON.stringify(ads));
        displayAds(); // Обновляем отображение без перезагрузки страницы
    }

    // Инициализация
    displayAds();
});
