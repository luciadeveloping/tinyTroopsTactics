import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";

var audioConfig = {
    music: new Audio('audio/marching_music.mp3'),
    click: new Audio('audio/click.mp3'),
};

function playMusic() {
    audioConfig.music.play();
}

var config = {
    //Canvas
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: "display",
    backgroundColor: '#8FC9FF',

    audio: audioConfig,
    scene: [StartScene, GameScene, SettingsScene, CreditsScene],

    callbacks: {
        postBoot: function () {
            // Add a click event listener to play music on user interaction
            document.addEventListener('keydown', playMusic, { once: true });
        },
    },

    //Physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);