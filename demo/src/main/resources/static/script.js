
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
        var username = userNameInput.val();
        var password = passwordInput.val();

        // Check if the username is empty
        if (username === "") {
            console.log("Please enter a username.");
            return;
        }
        // Check if the password is empty
        if (password === "") {
            console.log("Please enter a password.");
            return;
        }
    
        // Check if the user exists
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            success: function (user) {
                // User exists, can't sign up
                console.log("Username already exists");
            },
            error: function (xhr, status, error) {
                // Handle 404 error (user not found)
                if (xhr.status === 404) {
                    console.log("User not found, signing up");
                    var newUser = {
                        "name": username,
                        "password": password
                    };
                    // Create new user
                    $.ajax({
                        method: "POST",
                        url: 'http://localhost:8080/socialPage/CreateUser',
                        data: JSON.stringify(newUser),
                        processData: false,
                        contentType: "application/json",
                        success: function (message) {
                            console.log("User creation status:", message);
                            // Show user actions division
                            $('#user-actions').show();
                            // Hide user enter division
                            $('#user-enter').hide();
                            // Store the current user in localStorage
                            localStorage.setItem('currentUser', JSON.stringify(newUser));
                        },
                        error: function (xhr, status, error) {
                            console.log("Error creating user:", error);
                        }
                    });
                } else {
                    console.log("Error:", error);
                }
            }
        });
    });

    $("#signIn-button").click(function () {
        
        var username = userNameSignInInput.val();
        var password = passwordSignInInput.val();

        // Check if the username is empty
        if (username === "") {
            console.log("Please enter a username.");
            return;
        }
        // Check if the password is empty
        if (password === "") {
            console.log("Please enter a password.");
            return;
        }

        // Check if the user exists
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/socialPage/user/' + username,
            success: function (user) {
                // User exists, check password
                if (user.password === password) {
                    // Show user actions division
                    $('#user-actions').show();
                    // Hide user enter division
                    $('#user-enter').hide();
                    // Store the current user in localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    console.log("Incorrect password");
                }
            },
            error: function (xhr, status, error) {
                // Handle 404 error (user not found)
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
        })
    });

    $('#update-button').click(function(){
        var currentUser = localStorage.getItem('currentUser'); // Current username
        var newName = newUserNameInput.val();
        
        // Check if the username is empty
        if (newName === "") {
            console.log("Please enter a new username.");
            return;
        }
        
        console.log("Current user: " + currentUser);

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/socialPage/update/user/' + currentUser,
            data: newName,
            //processData: false,
            contentType: "application/json"

        }).done(function (message) {
            if (!message){
                console.log("Error updating user");
            }else{
                // Store the current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
    })

    $('#delete-button').click(function(){
        var currentUser = localStorage.getItem('currentUser'); // Current username
        var passwordUserToDelete = passwordUserToDeleteInput.val()
        console.log("Current user: " + currentUser);
        
        // Check if the passwordn is empty
        if (passwordUserToDelete === "") {
            console.log("Please enter your password to confirm.");
            return;
        }

        $.ajax({
            method: "DELETE",
            url: 'http://localhost:8080/socialPage/delete/user/' + currentUser,
            data: passwordUserToDelete,
            processData: false,
            contentType: "application/json"
        }).done(function (message) {
            if (!message){
                console.log("Error deleting user");
            }else{
                // Remove the currentUser item from localStorage
                localStorage.removeItem('currentUser');
                // Show user actions division
                $('#user-actions').hide();
                // Hide user enter division
                $('#user-enter').show();
            }
        });
    })
    
})