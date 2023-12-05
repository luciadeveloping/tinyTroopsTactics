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
        this.load.image('mapStart', 'assets/map/mapa_blur.png');
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
            interact: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
        };

        // IMAGES
        const map = this.add.image(centerX, 300, 'mapStart');
        const title = this.add.image(centerX, 100, 'title');

        // BUTTONS
        //Start
        const startButton = this.add.image(centerX, 195, 'start_default').setInteractive();
        startButton.on('pointerover', () => startButton.setTexture('start_hover'));
        startButton.on('pointerout', () => startButton.setTexture('start_default'));
        startButton.on('pointerdown', () =>  {
            gameConfig.audio.click.play();
            const transitionConfig = {
                target: 'GameScene',  // Nombre de la escena a la que quieres transicionar
                duration: 1000,       // Duración de la transición en milisegundos
                sleep: true,          // Hacer que la escena actual duerma durante la transición
                onUpdate: null,
                onComplete: null
            };

            this.scene.transition(transitionConfig);
        });

        //Settings
        const settingsButton = this.add.image(centerX, 260, 'settings_default').setInteractive();
        settingsButton.on('pointerover', () => settingsButton.setTexture('settings_hover'));
        settingsButton.on('pointerout', () => settingsButton.setTexture('settings_default'));
        settingsButton.on('pointerdown', () => {
            gameConfig.audio.click.play();
            this.scene.start('SettingsScene');
        });

         //Credits
         const creditsButton = this.add.image(centerX, 325, 'credits_default').setInteractive();
         creditsButton.on('pointerover', () => creditsButton.setTexture('credits_hover'));
         creditsButton.on('pointerout', () => creditsButton.setTexture('credits_default'));
         creditsButton.on('pointerdown', () => {
            gameConfig.audio.click.play();
            this.scene.start('CreditsScene');
        });

        //Exit
        const exitButton = this.add.image(centerX, 390, 'exit_default').setInteractive();
        exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
        exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
        //exitButton.on('pointerdown', () => this.sys.game.destroy(true));


        // PLAYERS (usando sprites y activando físicas)
        player1 = this.physics.add.image(200, centerY, 'player1');
        player2 = this.physics.add.image(1000, centerY, 'player2');
    }

    update() {
        // Movement Player 1 (wasd).
        if (keys.left.isDown) {
            player1.setVelocityX(-100);
        } else if (keys.right.isDown) {
            player1.setVelocityX(100);
        } else {
            player1.setVelocityX(0);
        }

        if (keys.up.isDown) {
            player1.setVelocityY(-100);
        } else if (keys.down.isDown) {
            player1.setVelocityY(100);
        } else {
            player1.setVelocityY(0);
        }

        // Movement Player 2 (arrows).
        if (cursors.left.isDown) {
            player2.setVelocityX(-100);
        } else if (cursors.right.isDown) {
            player2.setVelocityX(100);
        } else {
            player2.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            player2.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            player2.setVelocityY(100);
        } else {
            player2.setVelocityY(0);
        }
    }
}