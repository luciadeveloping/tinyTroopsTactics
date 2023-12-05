export default class SettingsScene extends Phaser.Scene {
    constructor () {
        super({key: 'SettingsScene'});
    }

    preload() {
        //Images
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');

        //Audios
        this.load.audio('clickSound', 'audio/click.mp3');
        this.load.audio('music', 'audio/marching_music.mp3');
    }

    create() {
        //CONSTANTS
            const gameConfig = this.sys.game.config;//Game configuration 
            const centerX = gameConfig.width / 2;// Get the center coordinates of the canvas

        //SOUNDS
            //Click
            this.clickSound = this.sound.add('clickSound');

            //Music
            var music = this.sound.add('music', {
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
            const exitButton = this.add.image(centerX, 480, 'exit_default');

        //FIGURES
            var graphics = this.add.graphics();
            graphics.fillStyle(1884159, 0.7); // Set the fill color
            graphics.fillRoundedRect(centerX - 200, 200, 400, 220, 10); // Rectangle dimensions and corner radius
        
        //TEXTS
            //Settings
            var sceneTitle = this.add.text(
                centerX, 
                130, 
                'SETTINGS', 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '60px',
                    fill: 'white',
                    align: 'center'
                }
            );
            sceneTitle.setOrigin(0.5);

            //Music
            var musicText = this.add.text(
                centerX-40, 
                260, 
                'Music: ', 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '40px',
                    fill: 'white',
                    align: 'center'
                }
            );
            musicText.setOrigin(0.5);

            //(Music:) On/Off
            var musicIs, musicColor;
            if(gameConfig.audio.musicMuted){//If music muted: Off in red
                musicIs = 'Off';
                musicColor = 'red';
            }else{//If not: On in green
                musicIs = 'On';
                musicColor = 'green'
            };

            var musicButton = this.add.text(
                centerX+50,
                260,
                musicIs, 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '40px',
                    fill: musicColor,
                    align: 'center'
                }
            );
            musicButton.setOrigin(0.5);

            //Effects
            var effectsText = this.add.text(
                centerX-45, 
                350,
                'Effects: ', 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '40px',
                    fill: 'white',
                    align: 'center'
                }
            );
            effectsText.setOrigin(0.5);

            //(Effects:) On/Off
            var effectsAre, effectsColor;
            if(gameConfig.audio.effectsMuted){//If effects muted: Off in red
                effectsAre = 'Off';
                effectsColor = 'Red';
            }else{//If not: On in green
                effectsAre = 'On';
                effectsColor = 'Green';
            };

            var effectsButton = this.add.text(
                centerX+50,
                350,
                effectsAre, 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '40px',
                    fill: effectsColor,
                    align: 'center'
                }
            );
            effectsButton.setOrigin(0.5);

            //Return to main menu
            var returnText = this.add.text(
                centerX, 
                530, 
                'Return to main menu', 
                {
                    fontFamily: 'JosefinSans',
                    fontSize: '18px',
                    fill: 'white',
                    align: 'center',
                    lineSpacing: 10,
                    padding:20
                }
            );
            returnText.setOrigin(0.5);

        //INTERACTIVITY
            //Music button
            musicButton.setInteractive();
            musicButton.on('pointerover', () => musicButton.setTint('12094720'));
            musicButton.on('pointerout', () => musicButton.clearTint());
            musicButton.on('pointerdown', () => {

                    //Muting of sound is effectsMuted
                    this.clickSound.play({mute: gameConfig.audio.effetcsMuted});

                    //Changes text and color
                    if(gameConfig.audio.musicMuted){
                        musicButton.setText('On');
                        musicButton.setFill('green');
                    }else{
                        musicButton.setText('Off');
                        musicButton.setFill('red');
                    }

                    //Toggles music
                    gameConfig.audio.musicMuted  = !gameConfig.audio.musicMuted;

                    music.setMute(gameConfig.audio.musicMuted);
                }
            );

            //Effects button
            effectsButton.setInteractive();
            effectsButton.on('pointerover', () => effectsButton.setTint('12094720'));
            effectsButton.on('pointerout', () => effectsButton.clearTint());
            effectsButton.on('pointerdown', () => {

                    //Toggles effects
                    gameConfig.audio.effectsMuted = !gameConfig.audio.effectsMuted;

                    //Muting of sound is effectsMuted
                    this.clickSound.play({mute: gameConfig.audio.effectsMuted});

                    //Changes text and color
                    if(!gameConfig.audio.effectsMuted){
                        effectsButton.setText('On');
                        effectsButton.setFill('green');
                    }else{
                        effectsButton.setText('Off');
                        effectsButton.setFill('red');
                    }
                }
            );

            //Exit button
            exitButton.setInteractive();
            exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
            exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
            exitButton.on('pointerdown', () => {
                    //Muting of sound is effectsMuted
                    this.clickSound.play({mute: gameConfig.audio.effectsMuted});

                    music.stop();//Stops music

                    // Switch to the main menu scene
                    this.scene.start('StartScene');
                }
            );
    }
}