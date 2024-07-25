document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h2').innerText;
            const productPrice = parseFloat(button.getAttribute('data-price'));

            const cartItem = cart.find(item => item.name === productName);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada!');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function updateCart() {
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `<span>${item.name} (x${item.quantity})</span> - R$ ${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceEl.innerText = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
});
