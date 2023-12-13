/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// INITIALIZES GAME //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// SCENES IMPORTATION (MODULES) ///////////////////////////////////////

import Bootloader from "./Scenes/Bootloader.js";
import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";

///////////////////////////////////////////// GAME CONFIGURATION ////////////////////////////////////////////

gameConfig = {
    //Canvas settings
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    parent: "display", //Hosting container
    backgroundColor: '#8FC9FF',

    scene: [Bootloader, StartScene, GameScene, SettingsScene, CreditsScene],

    //Game behaviour
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    
};

//Assigns values to center of canvas now that gameConfig has been defined
centerX = gameConfig.width / 2;
centerY = gameConfig.height / 2;

///////////////////////////////////////////// SOUND CONFIGURATION ///////////////////////////////////////////

musicEnabled = true,
effectsEnabled = true

musicConfig = {
    volume: 0.8,
    loop: true
}

//////////////////////////////////////////// GAME INITIALIZATION ////////////////////////////////////////////
game = new Phaser.Game(gameConfig); //New game is created with that configuration