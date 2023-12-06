var cursors;
var keys;
var player1;
var player2;

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        //Images
        this.load.image('mapStart', 'assets/map/mapa_1.png');
        this.load.image('title', 'assets/ui/title.png');
        this.load.image('start_default', 'assets/ui/start_Default.png');
        this.load.image('credits_default', 'assets/ui/credits_Default.png');
        this.load.image('settings_default', 'assets/ui/settings_Default.png');
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('start_hover', 'assets/ui/start_Hover.png');
        this.load.image('credits_hover', 'assets/ui/credits_Hover.png');
        this.load.image('settings_hover', 'assets/ui/settings_Hover.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');

        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');
    }

    create() {
        const gameConfig = this.sys.game.config;
        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

        // KEYBOARD INPUTS
        cursors = this.input.keyboard.createCursorKeys();
        keys = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            interactPlayer1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            interactPlayer2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
        };

        // IMAGES
        const map = this.add.image(850, centerY, 'mapStart');
        const title = this.add.image(250, 150, 'title');

        // BUTTONS
        // Start
        this.startButton = this.add.image(250, 230, 'start_default').setInteractive();

        //Settings
        this.settingsButton = this.add.image(250, 310, 'settings_default').setInteractive();

        //Credits
        this.creditsButton = this.add.image(250, 390, 'credits_default').setInteractive();

        //Exit
        this.exitButton = this.add.image(250, 470, 'exit_default').setInteractive();

        player1 = this.physics.add.image(900, 200, 'player1').setInteractive();
        player2 = this.physics.add.image(1000, centerY, 'player2').setInteractive();

        this.resetKeys();
        
    }

    update() {
    // Movement Player 1 (wasd).
    this.handlePlayerMovement(player1, keys);

    // Movement Player 2 (arrows).
    this.handlePlayerMovement(player2, cursors);

    this.handleButtonInteraction(this.startButton, 'GameScene', keys.interactPlayer1);
    this.handleButtonInteraction(this.startButton, 'GameScene', keys.interactPlayer2);

    this.handleButtonInteraction(this.settingsButton, 'SettingsScene', keys.interactPlayer1);
    this.handleButtonInteraction(this.settingsButton, 'SettingsScene', keys.interactPlayer2);

    this.handleButtonInteraction(this.creditsButton, 'CreditsScene', keys.interactPlayer1);
    this.handleButtonInteraction(this.creditsButton, 'CreditsScene', keys.interactPlayer2);

    // No target scene for exitButton
    this.handleButtonInteraction(this.exitButton, null, keys.interactPlayer1);
    this.handleButtonInteraction(this.exitButton, null, keys.interactPlayer2);
    
    }

    handleButtonInteraction(button, targetScene, interactKey) {
        const player1Bounds = player1.getBounds();
        const player2Bounds = player2.getBounds();
        const buttonBounds = button.getBounds();

        if (
        Phaser.Geom.Intersects.RectangleToRectangle(player1Bounds, buttonBounds) ||
        Phaser.Geom.Intersects.RectangleToRectangle(player2Bounds, buttonBounds)
        ) {
            button.setTexture(`${button.texture.key.replace('_default', '_hover')}`);
            if (interactKey.isDown) {
            this.handleButtonClick(targetScene);
            }
        } else {
        button.setTexture(button.texture.key.replace('_hover', '_default'));
        }
    }

    handlePlayerMovement(player, input) {
        if (input.left.isDown) {
            player.setVelocityX(-200);
        } else if (input.right.isDown) {
            player.setVelocityX(200);
        } else {
            player.setVelocityX(0);
        }

        if (input.up.isDown) {
            player.setVelocityY(-200);
        } else if (input.down.isDown) {
            player.setVelocityY(200);
        } else {
            player.setVelocityY(0);
        }
    }

    handleButtonClick(targetScene) {
        if (targetScene) {
            this.scene.start(targetScene);
        } else {
            // If no target scene is provided
        }   

    }

    resetKeys() {
        keys.up.reset();
        keys.down.reset();
        keys.left.reset();
        keys.right.reset();
        keys.interactPlayer1.reset();
        keys.interactPlayer2.reset();
    }
}