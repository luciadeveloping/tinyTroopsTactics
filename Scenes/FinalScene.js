/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// MAIN MENU /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalScene' });
    }

    create(){
    // SOUNDS
        this.music = this.sound.add('secondaryMusic', musicConfig);
        this.clickSound = this.sound.add('clickSound');

        if (musicEnabled){
            this.music.play();
        }

    // IMAGES
        //winner = 'player1';
        
        // Congrats to player 1
        if (winner == 'player1'){
            map = this.add.image(centerX, centerY, 'mapStart');
        }
        // Congrats to player 2
        else if(winner == 'player2'){

        }

    // BUTTONS
        // Exit
        this.exitButton = this.add.image(centerX, 800, 'exitDefault');

        // Interactivity
        this.exitButton.setInteractive();
        this.exitButton.on('pointerover', () => this.exitButton.setTexture(`${this.exitButton.texture.key.replace('Default', 'Hover')}`));
        this.exitButton.on('pointerout', () => this.exitButton.setTexture(`${this.exitButton.texture.key.replace('Hover', 'Default')}`));
        this.exitButton.on('pointerdown', () => {
            //Play click sound
            if (effectsEnabled){
                this.clickSound.play();
            }

            //Stops music
            this.music.stop();

            this.scene.start('StartScene');
        });

    }
}