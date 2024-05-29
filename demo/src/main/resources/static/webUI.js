// When page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Divisions
    const authButtons = document.getElementById('auth-buttons');
    const userActions = document.getElementById('user-actions');
    const gameContainer = document.getElementById('game-container');
    const display = document.getElementById('display');

    // Buttons
    const signUpButton = document.getElementById('signUp-button');
    const signInButton = document.getElementById('signIn-button');
    const signOutButton = document.getElementById('signOut-button');
    const playButton = document.getElementById('play-button');
    const exitButton = document.getElementById('exit-button');

    // Sign UP
    signUpButton.addEventListener('click', () => {
        authButtons.style.display = 'none';
        userActions.style.display = 'block';
    });

    // Sign IN
    signInButton.addEventListener('click', () => {
        authButtons.style.display = 'none';
        userActions.style.display = 'block';
    });

    // Sign OUT
    signOutButton.addEventListener('click', () => {
        authButtons.style.display = 'block';
        userActions.style.display = 'none';
    });

    // Play game
    playButton.addEventListener('click', () => {
        userActions.style.display = 'none';
        gameContainer.style.display = 'block';
        display.style.display = 'block';

        // New game
        game = new Phaser.Game(gameConfig);

        /*
        // If there is no game
        if (!game){
            // New game
            game = new Phaser.Game(gameConfig);
        }else{ // If there is, it will be paused
            // Resumes 
            //game.scene.manager.resume(game.scene.manager.currentScene);
        }
        */
    });

    // Exit game
    exitButton.addEventListener('click', () => {
        gameContainer.style.display = 'none';
        userActions.style.display = 'block';
        display.style.display = 'none';

        // Forces page reload
        location.reload(true);
    });
});