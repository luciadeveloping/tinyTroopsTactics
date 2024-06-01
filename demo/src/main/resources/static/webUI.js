// When page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Divisions
    const cheats = document.getElementById('cheats');
    const userEnterButtons = document.getElementById('user-enter');
    const userActionButtons = document.getElementById('user-actions');
    const gameContainer = document.getElementById('game-container');
    const display = document.getElementById('display');

    // Buttons
    const signOutButton = document.getElementById('signOut-button');
    const playButton = document.getElementById('play-button');
    const exitButton = document.getElementById('exit-button');
    const cheatsButton = document.getElementById('cheats-button');

    //Headers
    var usernameHeader = document.getElementById('username-header');

    // Paragraphs
    var victoriesCount = document.getElementById('victories-count');

    cheatsButton.addEventListener('click', () => {
        if (cheats.style.display == 'none'){
            cheats.style.display = 'block';
        }
        else {
            cheats.style.display = 'none';
        }
    });

    // Sign OUT
    signOutButton.addEventListener('click', () => {
        console.log("Signed out");
        userEnterButtons.style.display = 'block';
        userActionButtons.style.display = 'none';

        // Remove the currentUser item from localStorage
        localStorage.removeItem('currentUser');

        usernameHeader.textContent = "Not signed up/in yet";
        victoriesCount.textContent = "";
    });

    // Play game
    playButton.addEventListener('click', () => {
        userActionButtons.style.display = 'none';
        gameContainer.style.display = 'block';
        display.style.display = 'block';

        // New game
        game = new Phaser.Game(gameConfig);
    });

    // Exit game
    exitButton.addEventListener('click', () => {
        // Remove the currentUser item from localStorage
        localStorage.removeItem('currentUser');

        // Forces page reload
        location.reload(true);
    });
});