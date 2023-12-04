export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('mapStart', 'assets/map/mapa_blur.png');
        //TITULO
        this.load.image('title', 'assets/ui/title.png');

        //BOTONES
        this.load.image('start_default', 'assets/ui/start_Default.png');
        this.load.image('credits_default', 'assets/ui/credits_Default.png');
        this.load.image('settings_default', 'assets/ui/settings_Default.png');
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('start_hover', 'assets/ui/start_Hover.png');
        this.load.image('credits_hover', 'assets/ui/credits_Hover.png');
        this.load.image('settings_hover', 'assets/ui/settings_Hover.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');

        //SONIDO
        this.load.audio('clickSound', 'audio/click.mp3');
    }

    create() {

        // MAPA
        this.cameras.main.setBackgroundColor('#add8e6'); // Código azul claro
        const map = this.add.image(600, 300, 'mapStart');

        // SONIDO
        this.clickSound = this.sound.add('clickSound');

        const title = this.add.image(600, 100, 'title');
        // BOTONES
        this.createButtons();

    }

    createButtons() {
        // Botón Start
        const startButton = this.add.image(600, 195, 'start_default').setInteractive();
        startButton.on('pointerover', () => startButton.setTexture('start_hover'));
        startButton.on('pointerout', () => startButton.setTexture('start_default'));
        startButton.on('pointerdown', () =>  {
            this.clickSound.play();
            // Transición suave
            const transitionConfig = {
                target: 'GameScene',  // Nombre de la escena a la que quieres transicionar
                duration: 1000,       // Duración de la transición en milisegundos
                sleep: true,          // Hacer que la escena actual duerma durante la transición
                onUpdate: null,
                onComplete: null
            };

            this.scene.transition(transitionConfig);
        });

        // Botón Settings
        const settingsButton = this.add.image(600, 260, 'settings_default').setInteractive();
        settingsButton.on('pointerover', () => settingsButton.setTexture('settings_hover'));
        settingsButton.on('pointerout', () => settingsButton.setTexture('settings_default'));
        settingsButton.on('pointerdown', () => {
            this.clickSound.play();
            this.scene.start('SettingsScene');
        });

         // Botón Credits
         const creditsButton = this.add.image(600, 325, 'credits_default').setInteractive();
         creditsButton.on('pointerover', () => creditsButton.setTexture('credits_hover'));
         creditsButton.on('pointerout', () => creditsButton.setTexture('credits_default'));
         creditsButton.on('pointerdown', () => {
            this.clickSound.play();
            this.scene.start('CreditsScene');
        });

        // Botón Exit
        const exitButton = this.add.image(600, 390, 'exit_default').setInteractive();
        exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
        exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
        //exitButton.on('pointerdown', () => this.sys.game.destroy(true));

    }

    update(time, delta) {
        // Puedes agregar lógica de actualización si es necesario
    }
}

