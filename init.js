import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";

var audioConfig = {
    music: new Audio('audio/marching_music.mp3'),
    click: new Audio('audio/click.mp3'),
};

/*audioConfig.music.addEventListener('canplaythrough', function () {
    audioConfig.music.play();
});*/

var config = {
    //Canvas
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: "display",
    backgroundColor: '#8FC9FF',

    audio: audioConfig,

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

};
var game = new Phaser.Game(config);