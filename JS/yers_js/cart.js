document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector('.cart-main .row');
    let isCartEmpty = true;
    
    // Создаем временный контейнер для добавляемых карточек
    const tempContainer = document.createElement('div');
    tempContainer.classList.add('row');

    // Ищем карточки в localStorage и добавляем их в tempContainer
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cartItem-') && key.endsWith('-title')) {
            isCartEmpty = false;
            const baseKey = key.replace('-title', '');

            const imgSrc = localStorage.getItem(`${baseKey}-imgSrc`);
            const title = localStorage.getItem(`${baseKey}-title`);
            const address = localStorage.getItem(`${baseKey}-address`);
            const phone = localStorage.getItem(`${baseKey}-phone`);

            // Собираем выбранные опции
            let optionsHTML = '';
            for (let j = 0; localStorage.getItem(`${baseKey}-option-${j}`); j++) {
                const optionData = localStorage.getItem(`${baseKey}-option-${j}`).split('|');
                optionsHTML += `<li class="list-group-item">${optionData[1]}</li>`;
            }

            const card = document.createElement('div');
            card.classList.add('col-md-4');
            card.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <img src="${imgSrc}" class="card-img-top" alt="Apartment image">
                    <div class="card-body d-flex flex-grow-1 flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${address}</p>
                        <p class="card-text"><strong>${phone}</strong></p>
                        <ul class="list-group list-group-flush">${optionsHTML}</ul>
                    </div>
                    <div class="mt-auto">
                        <button class="mb-2 btn btn-danger" onclick="removeFromCart('${baseKey}')">Remove</button>
                    </div>
                </div>
            `;

            // Добавляем карточку в начало временного контейнера
            tempContainer.insertBefore(card, tempContainer.firstChild);
        }
    }

    // Проверяем, пуста ли корзина и выводим сообщение, если карточек нет
    if (isCartEmpty) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Если карточки есть, добавляем временный контейнер в начало основного контейнера корзины
        cartContainer.prepend(tempContainer);
    }
});



function removeFromCart(baseKey) {
    localStorage.removeItem(`${baseKey}-imgSrc`);
    localStorage.removeItem(`${baseKey}-title`);
    localStorage.removeItem(`${baseKey}-address`);
    localStorage.removeItem(`${baseKey}-phone`);

    // Удаляем сохраненные опции
    for (let i = 0; localStorage.getItem(`${baseKey}-option-${i}`); i++) {
        localStorage.removeItem(`${baseKey}-option-${i}`);
    }

    location.reload(); // Перезагружаем страницу для обновления корзины
}

