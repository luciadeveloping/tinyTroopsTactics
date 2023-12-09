import Bootloader from "./Scenes/Bootloader.js";
import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";


//Audio global configuration
var audio = {
    music: new Audio('audio/marching_music.mp3'),
    click: new Audio('audio/click.mp3')
};

function playMusic() {
    audio.music.play({
        volume: 0.2,
        loop: true
    });
}

//Game config
var config = {
    //Canvas settings
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: "display", //Hosting container
    backgroundColor: '#8FC9FF',

    audio: audio,

    scene: [GameScene, Bootloader, StartScene, SettingsScene, CreditsScene],


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

var game = new Phaser.Game(config); //New game is created