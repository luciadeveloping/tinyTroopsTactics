//Load users from server
function loadUsers(callback) {
    $.ajax({
        url: 'http://localhost:8080/users'
    }).done(function (users) {
        console.log('users loaded: ' + JSON.stringify(users));
        callback(users);
    })
}

//Create user in server
function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("user created: " + JSON.stringify(user));
        callback(user);
    })
}

//Update user in server
function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/users/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Updated user: " + JSON.stringify(user))
    })
}

//Delete user from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/users/' + userId
    }).done(function (user) {
        console.log("Deleted user " + userId)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show user in page
function showUser(user) {

    /*
    var checked = '';
    var style = '';

    if (user.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }
    */

    $('#info').append(
        '<div id="user-' + user.id + '" victories=" victories-' + user.victories + '"><button>Delete</button></div>')
        //<input type="checkbox" ' + checked + '>
        //<span ' + style + '>' + user.description + '</span>
}

$(document).ready(function () {

    loadUsers(function (users) {
        //When users are loaded from server
        for (var i = 0; i < users.length; i++) {
            showUser(users[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var userDiv = elem.parent();
            var userId = userDiv.attr('id').split('-')[1];
            userDiv.remove()
            deleteuser(userId);
        }
    })

    //Handle users checkboxs
    info.change(function (event) {

        /*
        //Get page elements for user
        //var checkbox = $(event.target);
        var userDiv = checkbox.parent();
        var textSpan = userDiv.find('span');

        //Read user info from elements
        var userName = textSpan.text();
        //var userChecked = checkbox.prop('checked');
        var userId = userDiv.attr('id').split('-')[1];

        //Create updated user
        var updateduser = {
            id: userId,
            name: userName,
        }

        //Update user in server
        updateUser(updateduser);

        //Update page when checked
        var style = userChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);
        */
    })

    //Handle add button
    $("#add-button").click(function () {

        var value = input.val();
        input.val('');

        var user = {
            name: value,
            victories: 0
        }

        createUser(user, function (userWithId) {
            //When user with id is returned from server
            showUser(userWithId);
        });
    })
})