function flyToCart(button) {
    const card = button.closest('.card');
    const productImage = card.querySelector('.card-img-top');
    const cartIcon = document.getElementById("cart-icon");

    // Получаем начальные и конечные координаты
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Создаем клон изображения
    const flyingImage = productImage.cloneNode(true);
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${productRect.left}px`;
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.width = `${productRect.width}px`;
    flyingImage.style.height = `${productRect.height}px`;
    flyingImage.style.zIndex = '1000'; // Устанавливаем высокий z-index для поверхностного слоя
    flyingImage.style.transition = 'all 1s ease-in-out';
    flyingImage.style.borderRadius = '10%'; // Закругление углов
    document.body.appendChild(flyingImage);

    // Запускаем анимацию
    setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.width = '30px';
        flyingImage.style.height = '30px';
        flyingImage.style.opacity = '0.5';
    }, 10);

    // Удаляем клон и добавляем класс анимации корзине
    flyingImage.addEventListener('transitionend', () => {
        flyingImage.remove();
        cartIcon.classList.add('animated');

        // Удаляем класс анимации после её завершения
        setTimeout(() => {
            cartIcon.classList.remove('animated');
        }, 500); // Продолжительность анимации совпадает с CSS (0.5s)
    });
}

function addToCart(button) {
    const card = button.closest('.card');
    const imgSrc = card.querySelector('.card-img-top').getAttribute('src');
    const title = card.querySelector('.card-title').innerText;
    const address = card.querySelector('.card-text').innerText;
    const phone = card.querySelector('strong').innerText;

    // Создаем уникальный ключ для каждой квартиры, например, по номеру телефона
    const key = `cartItem-${phone}`;

    // Сохраняем данные квартиры по ключу
    localStorage.setItem(`${key}-imgSrc`, imgSrc);
    localStorage.setItem(`${key}-title`, title);
    localStorage.setItem(`${key}-address`, address);
    localStorage.setItem(`${key}-phone`, phone);

    // Сохраняем выбранные опции
    card.querySelectorAll('input[type="checkbox"]:checked').forEach((option, index) => {
        localStorage.setItem(`${key}-option-${index}`, `${option.value}|${option.nextElementSibling.innerText}`);
    });

    // Запускаем анимацию
    flyToCart(button);
}
