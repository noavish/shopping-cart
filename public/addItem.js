$('.add-new-item').click(function () {
    var itemName = $(this).siblings("input[data-id='item-name']").val();
    var itemPrice = $(this).siblings("input[data-id='item-price']").val();
    var itemImage = $(this).siblings("input[data-id='item-image']").val();
    var newItem = {newItemName: itemName, newItemPrice: itemPrice, newItemImage: itemImage};
    addNewItem(newItem);
    clearForm();
});

function addNewItem(newItem) {
    var newItemSource = $('#new-item-template').html();
    var newItemTemplate = Handlebars.compile(newItemSource);
    var newHTML = newItemTemplate(newItem);
    $('.new-item').append(newHTML);
}

function clearForm () {
    $('.new-item-input').children('.form-control').val('');
}

