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

controls,

//Defined in GameScene.js
winner
;






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
}

// Websocket - Defined in bootloader.
var connection; // Reference to websocket
var assignedPlayer; // Either 1 or 2
var otherInfo = [0, 0, 0]; // Variables from the web player : [xPos, yPos, InteractionInput (0,1)]
var connectionOnline;

function sendMessageToWS(type, content){
    var msg = {
        type : type,
        content : content
    }

    if(connectionOnline){
        connection.send(JSON.stringify(msg)); // Convert yo JSON and send to WS.
    }else{
        console.log("Send command failed. Connection to server closed.");
    }
    
}

function updateInfoToWS(player, input){
    let info = [];

    info[0] = player.x;
    info[1] = player.y;
    
    if(input.interact.isDown){
        info[2] = 1
    }else{
        info[2] = 0;
    }
    sendMessageToWS("InputUpdate", info);
}



function movementHandler(thisPlayer, otherPlayer){

    handlePlayerMovement(thisPlayer, p1Ctrls);
    updateOtherPlayerPos(otherPlayer, otherInfo[0], otherInfo[1]);
    updateInfoToWS(thisPlayer, p1Ctrls);
}

function handlePlayerMovement(player, input) {
        
    if (input.right.isDown) {
        player.setVelocityX(PLAYER_SPEED);
    } else if (input.left.isDown) {
        player.setVelocityX(-PLAYER_SPEED);
    } else {
        player.setVelocityX(0);
    }

    if (input.up.isDown) {
        player.setVelocityY(-PLAYER_SPEED);
    } else if (input.down.isDown) {
        player.setVelocityY(PLAYER_SPEED);
    } else {
        player.setVelocityY(0);
    }
}
    

    
function updateOtherPlayerPos(otherPlayer, newXPos, newYPos){
    otherPlayer.x = newXPos;
    otherPlayer.y = newYPos;
}

