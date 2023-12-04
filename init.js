import StartScene from "./Scenes/StartScene.js";
import GameScene from "./Scenes/GameScene.js";
import SettingsScene from "./Scenes/SettingsScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: "display",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [StartScene, GameScene, SettingsScene, CreditsScene]
};

var game = new Phaser.Game (config);
game.scene.start('GameScene');