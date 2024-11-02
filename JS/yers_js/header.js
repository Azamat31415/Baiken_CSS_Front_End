document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы корзины из localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartSalesItems = JSON.parse(localStorage.getItem("cartSales") || "[]");
    const cartLeaseItems = JSON.parse(localStorage.getItem("cartLease") || "[]");

    // Считаем общее количество элементов в корзине
    const totalItems = cartItems.length + cartSalesItems.length + cartLeaseItems.length;

    // Находим элемент иконки корзины в хедере
    const cartIcon = document.querySelector(".header-right a[href='Cart.html']");

    if (totalItems > 0 && cartIcon) {
        // Создаем элемент для значка с числом
        const badge = document.createElement("span");
        badge.style.position = "absolute";
        badge.style.top = "-5px";
        badge.style.right = "-10px";
        badge.style.backgroundColor = "#008B8B";
        badge.style.color = "white";
        badge.style.borderRadius = "50%";
        badge.style.padding = "2px 7px";
        badge.style.fontSize = "12px";
        badge.style.fontWeight = "bold";
        badge.style.zIndex = "10";
        badge.textContent = totalItems;

        // Добавляем значок к элементу иконки корзины
        cartIcon.style.position = "relative";
        cartIcon.appendChild(badge);
    }
});