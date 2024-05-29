
$(document).ready(function () {

    var userNameInput = $('#userName-input')
    var passwordInput = $('#password-input')
    var userNameSignInInput = $('#userNameSignIn-input')
    var passwordSignInInput = $('#passwordSignIn-input')

    var currentUserNameInput = $('#currentUserName-input')
    var newUserNameInput = $('#newUserName-input')
    var userNameToDeleteInput = $('#userNameToDelete-input')
    var passwordUserToDeleteInput = $('#passwordUserToDelete-input')

    $("#signUp-button").click(function () {
        
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

    $("#signIn-button").click(function () {
        
        var name = userNameSignInInput.val();
        var password = passwordSignInInput.val();

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/socialPage/user/' + name,
            data: password,
            processData: false,
            contentType: "application/json"

        }).done(function (message) {
            console.log("User sign in status: " + JSON.stringify(message));
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
        var currentName = currentUserNameInput.val(); //Current username
        var newName = newUserNameInput.val();

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

    $('#delete-button').click(function(){
        var userNameToDelete = userNameToDeleteInput.val(); // Current username
        var passwordUserToDelete = passwordUserToDeleteInput.val()

        $.ajax({
            method: "DELETE",
            url: 'http://localhost:8080/socialPage/delete/user/' + userNameToDelete,
            data: passwordUserToDelete,
            processData: false,
            contentType: "application/json"

        }).done(function (message) {
            console.log("User delete status: " + JSON.stringify(message));
        });
    })
    
})