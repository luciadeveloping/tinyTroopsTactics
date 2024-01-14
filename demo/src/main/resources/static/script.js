
$(document).ready(function () {

    /*
    loadItems(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showItem(items[i]);
        }
    });*/

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var itemDiv = elem.parent();
            var itemId = itemDiv.attr('id').split('-')[1];
            itemDiv.remove()
            deleteItem(itemId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var itemDiv = checkbox.parent();
        var textSpan = itemDiv.find('span');

        //Read item info from elements
        var itemDescription = textSpan.text();
        var itemChecked = checkbox.prop('checked');
        var itemId = itemDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedItem = {
            id: itemId,
            description: itemDescription,
            checked: itemChecked
        }

        //Update item in server
        updateItem(updatedItem);

        //Update page when checked
        var style = itemChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {

        var sender = {
            id : 1,
            name : input.val(),
            password : "Gatito"
        }

        input.val('');

        var message = {
            id : 1, 
            content : "hola q tal",
            user : sender
        }

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/socialPage',
            data: JSON.stringify(message),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }

        }).done(function (message) {
            console.log("Item created: " + JSON.stringify(message));
            //callback(message);
        })

        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/chatLog',
            dataType: "json", 
            processData: false,
            success: function(data){
                console.log(data);
            }
        })

        $.ajax({
            method: 'DELETE',
            url: 'http://localhost:8080/socialPage/user/' + 1
        }).done(function (user) {
            console.log("Deleted item " + user.id);
        })
    })
})