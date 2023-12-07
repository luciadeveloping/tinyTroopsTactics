export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        // CONSTANTS
        const gameConfig = this.sys.game.config; // Game configuration
        const centerX = gameConfig.width / 2; // Get the center coordinates of the canvas

        // IMAGES
        const exitButton = this.add.image(centerX, 480, 'exit_default');

        // FIGURES
        var graphics = this.add.graphics();
        graphics.fillStyle(1884159, 0.7); // Set the fill color
        graphics.fillRoundedRect(centerX - 200, 200, 400, 220, 10); // Rectangle dimensions and corner radius

        // TEXTS
        // Settings
        var sceneTitle = this.add.text(
            centerX,
            130,
            'SETTINGS',
            {
                fontFamily: 'JosefinSans',
                fontSize: '60px',
                fill: 'white',
                align: 'center',
            }
        );
        sceneTitle.setOrigin(0.5);

        // MusicText
        var musicText = this.add.text(
            centerX - 40,
            260,
            'Music: ',
            {
                fontFamily: 'JosefinSans',
                fontSize: '40px',
                fill: 'white',
                align: 'center',
            }
        );
        musicText.setOrigin(0.5);

        // (Music:) On/Off
        var musicIs, musicColor;
        if (!gameConfig.audio.music.mute) {
            // If music not muted: On in green
            musicIs = 'On';
            musicColor = 'green';
        } else {
            // If music muted: Off in red
            musicIs = 'Off';
            musicColor = 'red';
        }

        var musicButton = this.add.text(
            centerX + 50,
            260,
            musicIs,
            {
                fontFamily: 'JosefinSans',
                fontSize: '40px',
                fill: musicColor,
                align: 'center',
            }
        );
        musicButton.setOrigin(0.5);

        // Effects
        var effectsText = this.add.text(
            centerX - 45,
            350,
            'Effects: ',
            {
                fontFamily: 'JosefinSans',
                fontSize: '40px',
                fill: 'white',
                align: 'center',
            }
        );
        effectsText.setOrigin(0.5);

        // (Effects:) On/Off
        var effectsAre, effectsColor;
        if (!gameConfig.audio.click.mute) {
            // If effects not muted: On in green
            effectsAre = 'On';
            effectsColor = 'green';
        } else {
            // If effects muted: Off in red
            effectsAre = 'Off';
            effectsColor = 'red';
        }

        var effectsButton = this.add.text(
            centerX + 50,
            350,
            effectsAre,
            {
                fontFamily: 'JosefinSans',
                fontSize: '40px',
                fill: effectsColor,
                align: 'center',
            }
        );
        effectsButton.setOrigin(0.5);

        // Return to main menu
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
                padding: 20,
            }
        );
        returnText.setOrigin(0.5);

    // INTERACTIVITY
    // Music button
    musicButton.setInteractive();
    musicButton.on('pointerover', () => musicButton.setTint('12094720'));
    musicButton.on('pointerout', () => musicButton.clearTint());
    musicButton.on('pointerdown', () => {
        //Plays click sound if not muted
        if (gameConfig.audio.click.mute == false){
            gameConfig.audio.click.play();
        }
        
        // Toggles music
        gameConfig.audio.music.mute = !gameConfig.audio.music.mute;

        // Changes text and color
        if (!gameConfig.audio.music.mute) {
            musicButton.setText('On');
            musicButton.setFill('green');
            // Play music only if there's user interaction
            this.sound.context.resume().then(() => {
            gameConfig.audio.music.play();
            });
        } else {
            musicButton.setText('Off');
            musicButton.setFill('red');

            // Pause music
            gameConfig.audio.music.pause();
        }
        });

    // Effects button
    effectsButton.setInteractive();
    effectsButton.on('pointerover', () => effectsButton.setTint('12094720'));
    effectsButton.on('pointerout', () => effectsButton.clearTint());
    effectsButton.on('pointerdown', () => {
    // Toggles effects
        gameConfig.audio.click.mute = !gameConfig.audio.click.mute;

        //Plays click sound if not muted
        if (gameConfig.audio.click.mute == false){
            gameConfig.audio.click.play();
        }

    // Changes text and color
        if (!gameConfig.audio.click.mute) {
            effectsButton.setText('On');
            effectsButton.setFill('green');
        } else {
            effectsButton.setText('Off');
            effectsButton.setFill('red');
        }
        });

// Exit button
    exitButton.setInteractive();
    exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
    exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
    exitButton.on('pointerdown', () => {
        //Plays click sound if not muted
        if (gameConfig.audio.click.mute == false){
            gameConfig.audio.click.play();
        }

    // Stop music (if it's playing)
        if (gameConfig.audio.music.isPlaying) {
            gameConfig.audio.music.stop();
        }

        // Switch to the main menu scene
        this.scene.start('StartScene');
        });
    }
}
