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

        //Audio
        this.load.audio('clickSound', 'audio/click.mp3');
        this.load.audio('music', 'audio/marching_music.mp3');
    }

    create() {
    //CONSTANTS
        const gameConfig = this.sys.game.config;// Access the game configuration using the Scene Manager
        // Get the center coordinates of the canvas
        const centerX = gameConfig.width / 2;
        const soundManager = this.sys.game.sound;

    //SOUNDS
        //Click
        var clickSound = soundManager.add('clickSound');

        //Music
        var music = soundManager.add('music', {
            volume: 0.2,
            loop: true,
            delay: 0
        });
        
        music.play({mute: gameConfig.audio.musicMuted});

        /* //Starts music if  it's not already playing
        if (!gameConfig.audio.musicPlaying){
            music.play({mute: gameConfig.audio.musicMuted});
            gameConfig.audio.musicPlaying = true;//Music has 
        } */
        

    //IMAGES
        const map = this.add.image(centerX, 300, 'mapStart');
        const title = this.add.image(centerX, 100, 'title');

    //BUTTONS
        //Start
        const startButton = this.add.image(centerX, 195, 'start_default').setInteractive();
        startButton.on('pointerover', () => startButton.setTexture('start_hover'));
        startButton.on('pointerout', () => startButton.setTexture('start_default'));
        startButton.on('pointerdown', () =>  {

            clickSound.play({mute: gameConfig.audio.effectsMuted});
            
            music.stop();//Stops music
            
            //Smooth transition to GameScene
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
            
            clickSound.play({mute: gameConfig.audio.effectsMuted});
            
            music.stop();//Stops music
            
            this.scene.start('SettingsScene', {
                    musicData : music, //To settings scene: from start scene
                    clickSoundData : clickSound
                }
            );
        });

         //Credits
         const creditsButton = this.add.image(centerX, 325, 'credits_default').setInteractive();
         creditsButton.on('pointerover', () => creditsButton.setTexture('credits_hover'));
         creditsButton.on('pointerout', () => creditsButton.setTexture('credits_default'));
         creditsButton.on('pointerdown', () => {

            clickSound.play({mute: gameConfig.audio.effectsMuted});
            
            music.stop();//Stops music
            
            this.scene.start('CreditsScene');
        });

        //Exit
        const exitButton = this.add.image(centerX, 390, 'exit_default').setInteractive();
        exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
        exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
        //exitButton.on('pointerdown', () => this.sys.game.destroy(true));

    }
}

