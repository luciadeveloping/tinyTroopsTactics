
$(document).ready(function () {

    /*
    loadItems(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showItem(items[i]);
        }
    });*/

    var userNameInput = $('#userName-input')
    var passwordInput = $('#password-input')
    var currentUserNameInput = $('#currentUserName-input')
    var newUserNameInput = $('#newUserName-input')

    //var info = $('#info')

    //Handle delete buttons
    /*
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
    */

    //Handle add button
    $("#add-button").click(function () {
        
        var u = {
            "name": userNameInput.val(),
            "password": passwordInput.val() 
        };
    
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/socialPage/CreateUser',
            data: JSON.stringify(u),
            processData: false,
            contentType: "application/json"
        }).done(function (message) {
            console.log("User creation status: " + JSON.stringify(message));
        });
    });

    $('#getUsers-button').click(function () {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/users',
            dataType: "json", 
            processData: false,
            success: function(data){
                console.log(data);
            }
        })
    });

    $('#update-button').click(function(){
        var currentName = currentUserNameInput.val();
        var newName = newUserNameInput.val();

        console.log("Pulsado boton acutalizar, antigua nombre: " + currentName + " nuevo nombre: " + newName);

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/socialPage/update/user/' + currentName,
            data: newName,
            processData: false,
            contentType: "application/json"

        }).done(function (message) {
            console.log("User update status: " + JSON.stringify(message));
        });
    })
    
})