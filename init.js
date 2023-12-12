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
    width: 1200,
    height: 600,
    parent: "display", //Hosting container
    backgroundColor: '#8FC9FF',

    audio: {
        music: new Audio('audio/marching_music.mp3'),
        click: new Audio('audio/click.mp3')
    },

    //1. Bootloader 2.StartScene 3.GameScene
    scene: [Bootloader, GameScene, StartScene, SettingsScene, CreditsScene],

    callbacks: {
        postBoot: function () {
            //Plays music when keyboard input detected
            //document.addEventListener('keydown', playMusic, { once: true });
        },
    },

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

///////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////

//Plays background music
function playMusic() {
    gameConfig.audio.music.play();
}

//////////////////////////////////////////// GAME INITIALIZATION ////////////////////////////////////////////
game = new Phaser.Game(gameConfig); //New game is created with that configuration