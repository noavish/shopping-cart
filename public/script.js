// an array with all of our cart items
var cart = [];

var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $('.cart-list').empty();
  var itemSource = $('#item-template').html();
  var itemTemplate = Handlebars.compile(itemSource);
  var newHTML = itemTemplate({items: cart});
  $('.cart-list').append(newHTML);
  $('.total').text(sumUpCart());
}

var addItem = function (item) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
  cart.push(item);
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  cart = [];
  updateCart();
}

// Summing up the cart total price
function sumUpCart () {
  var cartSum = 0;
  for (var i=0; i<cart.length; i++) {
    cartSum += cart[i].itemPrice;
  }
  return cartSum;
}

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggleClass('show');
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var itemName = $(this).parents('.item').data().name;
  var itemPrice = $(this).parents('.item').data().price;
  var item = {itemName: itemName, itemPrice: itemPrice};
  addItem(item);
  updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
updateCart();

