// Create new item object according to the ADD ITEM form and clear the form fields.
$('.add-new-item').click(function () {
    var itemName = $(this).siblings("input[data-id='item-name']").val();
    var itemPrice = $(this).siblings("input[data-id='item-price']").val();
    var itemImage = $(this).siblings("input[data-id='item-image']").val();
    var newItem = {newItemName: itemName, newItemPrice: itemPrice, newItemImage: itemImage};
    addNewItem(newItem);
    $('.new-item-input').children('.form-control').val('');
});

// Append new item to the store using Handlebars.
function addNewItem (newItem) {
    var newItemSource = $('#new-item-template').html();
    var newItemTemplate = Handlebars.compile(newItemSource);
    var newHTML = newItemTemplate(newItem);
    $('.new-item').append(newHTML);
}


