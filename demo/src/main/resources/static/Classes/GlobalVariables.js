const PLAYER_SPEED = 300; // Movement speed of players
const BUTTON_INTERACTION_COOLDOWN = 500; // Milliseconds passed between button click

//Defined in init.js
let game,
gameConfig, //Game configuration
centerX, //Center of canvas in X
centerY, //Center of canvas in Y
musicEnabled,
effectsEnabled,
musicConfig, //Music configuration
initTimeDraftP1, //Last time the Player 1 interacted with a button
initTimeDraftP2, //Last time the Player 2 interacted with a button

//Defined in bootloader.js
skinList, //Array of skins for players
p1Skin, //Skin used by player 1
p2Skin, //Skin used by player 2

//Defined in every scene as needed
map,
player1,
p1Ctrls, //Player 1 controls
p1Bounds, //Player 1 bounds
player2,
p2Ctrls, //Player 2 controls
p2Bounds, //Player 2 bounds
buttonBounds,

//Defined in GameScene.js
winner
;

// Websocket - Defined in bootloader.
var connection; // Reference to websocket
var assignedPlayer; // Either 1 or 2
var otherPlayerPosDirty;

// Input variables from the web player
var otherInputInfo = [0, 0, 0]; // [horizontal, vertical, interaction]

//Checks if cooldown time of a player has passed from last interaction
function checkCooldown(player){
    let time = new Date(); //Current time
    let timeElapsedP1, timeElapsedP2; //Time passed from last interaction
    
    //Recognizes playerby its interact key
    if (player == player1){
        
        timeElapsedP1 = (time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds()) - initTimeDraftP1;

        if(timeElapsedP1 >= BUTTON_INTERACTION_COOLDOWN){
            initTimeDraftP1 = time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds();
            return true;
        }else{
            return false;
        }
    }else if (player == player1){
        timeElapsedP2 = (time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds()) - initTimeDraftP2;
        
        if(timeElapsedP2 >= BUTTON_INTERACTION_COOLDOWN){
            initTimeDraftP2 = time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds();
            return true;
        }else{
            return false;
        }
    }
};