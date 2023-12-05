import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";

var config = {
    //Canvas
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: "display",
    backgroundColor: '#8FC9FF',

    //Physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    //Scenes
    scene: [StartScene, GameScene, SettingsScene, CreditsScene],

    //Audio
    audio: {
        effectsMuted: false,
        musicMuted: false,
        //musicPlaying: false
    }
};

var game = new Phaser.Game (config);