// Assigning shoppingCart as the STORAGE_ID
var STORAGE_ID = 'shoppingCart';

// Save array to LS as string
var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
}

// Get filled array or empty array if none exists from LS
var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

// Populating cart from LS
var cart = getFromLocalStorage();

// Clears and renders the items in the cart according to the array including a remove btn per item and a total cart sum
var updateCart = function () {
    $('.cart-list').empty();
    var itemSource = $('#item-template').html();
    var itemTemplate = Handlebars.compile(itemSource);
    var newHTML = itemTemplate({ items: cart });
    $('.cart-list').append(newHTML);
    $('.cart-list').children('p').append(`<span><i class="fa fa-trash-o rmbtn"></i></span>`);
    $('.total').text(sumUpCart());
}

// Check if item exists, yes - increase quantity by 1, no - push item to cart. Save to LS
var addItem = function (item) {
    for (var i = 0; i < cart.length; i++) {
        if (item.itemName === cart[i].itemName) {
            cart[i].itemQuantity += 1;
            saveToLocalStorage();
            return;
        }
    }
    cart.push(item);
    saveToLocalStorage();
}

// Remove all items from cart, save to LS and updateCart view
var clearCart = function () {
    cart = [];
    saveToLocalStorage();
    updateCart();
}

// Summing up the cart total price acoreding to price and quantity of each item, return total cart sum
function sumUpCart() {
    var cartSum = 0;
    for (var i = 0; i < cart.length; i++) {
        cartSum += cart[i].itemPrice * cart[i].itemQuantity;
    }
    return cartSum;
}

// Toggle show/hide shopping cart
$('.view-cart').on('click', function () {
    $('.shopping-cart').toggleClass('show');
});

// Toggle show/hide ADD ITEM Form
$('.view-add-item').on('click', function () {
    $('.new-item-input').toggle();
});

// Create item object according to the HTML page data, calls addItem and updateCart
$('.container').on('click', '.add-to-cart', function () {
    // TODO: get the "item" object from the page
    var itemName = $(this).parents('.item').data().name;
    var itemPrice = $(this).parents('.item').data().price;
    var item = { itemName: itemName, itemPrice: itemPrice, itemQuantity: 1 };
    addItem(item);
    updateCart();
});

// Clear the shopping cart
$('.clear-cart').on('click', function () {
    clearCart();
});

// Remove item from shopping cart - if quantity is greater than 1 decrease quantity by 1, else remove item
$('.cart-list').on('click', 'span', function () {
    var removeItem = $(this).parents('p').data().name
    for (var i = 0; i < cart.length; i++) {
        if (removeItem === cart[i].itemName) {
            if (cart[i].itemQuantity > 1) {
                cart[i].itemQuantity--;
            } else {
                cart.splice(i, 1);
            }
            saveToLocalStorage();
            break;
        }
    }
    updateCart();
});

// Update the cart as soon as the page loads!
updateCart();


