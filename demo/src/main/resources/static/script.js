$(document).ready(function () {

    var userNameInput = $('#userName-input');
    var passwordInput = $('#password-input');
    var userNameSignInInput = $('#userNameSignIn-input');
    var passwordSignInInput = $('#passwordSignIn-input');

    var newUserNameInput = $('#newUserName-input');
    var passwordUserToDeleteInput = $('#passwordUserToDelete-input');

    $("#signUp-button").click(function () {
        var username = userNameInput.val();
        var password = passwordInput.val();

        if (username === "") {
            console.log("Please enter a username.");
            return;
        }
        if (password === "") {
            console.log("Please enter a password.");
            return;
        }

        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            success: function (user) {
                console.log("Username already exists");
            },
            error: function (xhr) {
                if (xhr.status === 404) {
                    console.log("User not found, signing up");
                    var newUser = {
                        "name": username,
                        "password": password
                    };

                    $.ajax({
                        method: "POST",
                        url: 'http://localhost:8080/socialPage/CreateUser',
                        data: JSON.stringify(newUser),
                        processData: false,
                        contentType: "application/json",
                        success: function (message) {
                            console.log("User creation status:", message);
                            $('#user-actions').show();
                            $('#user-enter').hide();
                            localStorage.setItem('currentUser', JSON.stringify(newUser));
                        },
                        error: function (xhr) {
                            console.log("Error creating user:", xhr.responseText);
                        }
                    });
                } else {
                    console.log("Error:", xhr.responseText);
                }
            }
        });
    });

    $("#signIn-button").click(function () {
        var username = userNameSignInInput.val();
        var password = passwordSignInInput.val();

        if (username === "") {
            console.log("Please enter a username.");
            return;
        }
        if (password === "") {
            console.log("Please enter a password.");
            return;
        }

        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            success: function (user) {
                if (user.password === password) {
                    $('#user-actions').show();
                    $('#user-enter').hide();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    console.log("Incorrect password");
                }
            },
            error: function (xhr) {
                if (xhr.status === 404) {
                    console.log("User not found");
                }
            }
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
        });
    });

    $('#update-button').click(function(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserName = currentUser.name;
        var newName = newUserNameInput.val();

        if (newName === "") {
            console.log("Please enter a new username.");
            return;
        }

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/socialPage/update/user/' + currentUserName,
            data: JSON.stringify(newName),
            processData: false,
            contentType: "application/json"
        }).done(function (message) {
            console.log(message);
            if (message.includes("Error")) {
                console.log("Error updating user");
            } else {
                currentUser.name = newName;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log("User updated successfully");
            }
        }).fail(function (xhr) {
            console.log("Error updating user:", xhr.responseText);
        });
    });

    $('#delete-button').click(function(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserName = currentUser.name;
        var passwordUserToDelete = passwordUserToDeleteInput.val(); // Obtener la contraseña del usuario a eliminar
    
        if (passwordUserToDelete === "") {
            console.log("Please enter your password to confirm.");
            return;
        }
    
        $.ajax({
            method: "DELETE",
            url: 'http://localhost:8080/socialPage/delete/user/' + currentUserName, // Incluir el nombre de usuario en la URL
            headers: { "Authorization": "Bearer " + passwordUserToDelete }, // Pasar la contraseña como encabezado de autorización
            success: function (message) {
                console.log(message);
                if (message.includes("User deleted successfully")) {
                    localStorage.removeItem('currentUser');
                    $('#user-actions').hide();
                    $('#user-enter').show();
                } else {
                    console.log("Error deleting user");
                }
            },
            error: function (xhr) {
                console.log("Error deleting user:", xhr.responseText);
            }
        });
    });
    
    

});