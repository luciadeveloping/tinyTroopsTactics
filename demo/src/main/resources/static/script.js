$(document).ready(function () {

    // Inputs
    var userNameInput = $('#userName-input');
    var passwordInput = $('#password-input');
    var userNameSignInInput = $('#userNameSignIn-input');
    var passwordSignInInput = $('#passwordSignIn-input');
    var newUserNameInput = $('#newUserName-input');
    var passwordUserToDeleteInput = $('#passwordUserToDelete-input');

    // Headers
    var usernameHeader = $('#username-header');

    // Paragraphs
    var victoriesCount = $('#victories-count');

    function enterAccount(user) {
        // Toggles divisions
        $('#user-actions').show();
        $('#user-enter').hide();

        // Saves current user
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Gets current user again
        getCurrentUser();
    }

    function getCurrentUser(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Current user: ");
        console.log(currentUser);
        // Shows current username
        usernameHeader.text("@" + currentUser.name);
        // Shows current victories
        victoriesCount.text("Victories: " + currentUser.victories);
    }

    // SIGN UP
    // GET + POST
    $("#signUp-button").click(function () {
        var username = userNameInput.val();
        var password = passwordInput.val();

        // Checks if username and password are entered
        if (username === "") {
            alert("Please enter a username.");
            return;
        }
        if (password === "") {
            alert("Please enter a password.");
            return;
        }

        // Check if the user already exists
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            success: function (user) {
                // Does nothing if exists
                alert("Username already exists. Enter another one.");
            },
            error: function (xhr) {
                // If it doesn't exist
                if (xhr.status === 404) {
                    console.log("User not found, signing up");
                    var newUser = {
                        "name": username,
                        "password": password,
                        "victories": 0
                    };

                    // Creates a new one
                    $.ajax({
                        method: "POST",
                        url: 'http://localhost:8080/socialPage/CreateUser',
                        data: JSON.stringify(newUser),
                        processData: false,
                        contentType: "application/json",
                        success: function (message) {
                            enterAccount(newUser);
                        },
                        error: function (xhr) {
                            alert("Error creating user:", xhr.responseText);
                        }
                    });
                } else {
                    alert("Error:", xhr.responseText);
                }
            }
        });
    });

    // SIGN IN
    // GET + _
    $("#signIn-button").click(function () {
        var username = userNameSignInInput.val();
        var password = passwordSignInInput.val();

        // Checks if username and password are entered
        if (username === "") {
            alert("Please enter your username.");
            return;
        }
        if (password === "") {
            alert("Please enter your password.");
            return;
        }

        // Check if the user already exists
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            // It exists
            success: function (user) {
                // If password is correct
                if (user.password === password) {
                    enterAccount(user);
                } else {
                    alert("Incorrect password");
                }
            },
            error: function (xhr) {
                // If it doesn't exist
                if (xhr.status === 404) {
                    alert("User not found. Are you sure that username is correct?");
                }
            }
        });
    });

    // PRINTS USERS LIST
    // GET
    $('#getUsers-button').click(function () {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/users',
            dataType: "json",
            processData: false,
            success: function(data){
                // Prints list
                console.log(data);
            }
        });
    });

    // UPDATE USERNAME
    // PUT
    $('#update-button').click(function(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var newName = newUserNameInput.val();

        // Checks if a new username has been entered
        if (newName === "") {
            alert("Please enter a new username.");
            return;
        }

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/socialPage/updateName/' + currentUser.name,
            data: newName,
            processData: false,
            contentType: "application/json"
        }).done(function (message) {
            console.log(message);
            if (message.includes("Error")) {
                console.log("Error updating user name");
            } else {
                // Update the currentUser object with the new name
                currentUser.name = newName;
                
                // Updates current user
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
                // Gets current user again
                getCurrentUser();

                console.log("User name updated successfully");
            }
        }).fail(function (xhr) {
            alert("Error updating user name: " + xhr.responseText);
        });
    });

    // UPDATES VICTORIES (One more)
    // PUT
    $('#addVictory-button').click(function(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/socialPage/updateVictories/' + currentUser.name
        }).done(function (message) {
            console.log(message);
            if (message.includes("Error")) {
                console.log("Error updating user");
            } else {
                // Update the currentUser object adding a victory
                currentUser.victories += 1;
                
                // Updates current user
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Gets current user again
                getCurrentUser();

                console.log("User victories updated successfully");
            }
        }).fail(function (xhr) {
            alert("Error updating user victories: " + xhr.responseText);
        });
    });

    // DELETE USER
    // DELETE
    $('#delete-button').click(function(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserName = currentUser.name;
        var passwordUserToDelete = passwordUserToDeleteInput.val(); // Obtener la contraseña del usuario a eliminar
    
        if (passwordUserToDelete === "") {
            alert("Please enter your password to confirm.");
            return;
        }
    
        $.ajax({
            method: "DELETE",
            url: 'http://localhost:8080/socialPage/delete/user/' + currentUserName, // Incluir el nombre de usuario en la URL
            headers: { "Authorization": "Bearer " + passwordUserToDelete }, // Pasar la contraseña como encabezado de autorización
            success: function (message) {
                console.log(message);
                if (message.includes("User deleted successfully")) {
                    // Removes current user from memory
                    localStorage.removeItem('currentUser');

                    // Toggles divisions
                    $('#user-actions').hide();
                    $('#user-enter').show();

                    // Resets username header
                    usernameHeader.text("Not signed up/in yet");
                    // Resetsvictories count
                    victoriesCount.text("");
                } else {
                    console.log("Error deleting user");
                }
            },
            error: function (xhr) {
                alert("Error deleting user: " + xhr.responseText);
            }
        });
    });
});