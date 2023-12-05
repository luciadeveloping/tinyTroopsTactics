export default class CreditsScene extends Phaser.Scene {
    constructor () {
        super({key: 'CreditsScene'});
    }

    preload() {
        //Images
        this.load.image("logo", "./assets/misc/Logo.png"); //Logo of Spinaca Studio
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');

        
    }

    create() {
    //CONSTANTS
        var gameConfig = this.sys.game.config;// Access the game configuration using the Scene Manager
        // Get the center coordinates of the canvas
        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

        
    //IMAGES
        const logo = this.add.image(centerX-100, 120, "logo");//Logo image
        logo.setScale(0.3);

        const exitButton = this.add.image(centerX, centerY+180, 'exit_default');

    //FIGURES
        //Name credits background
        var graphics = this.add.graphics();
        graphics.fillStyle(1884159, 0.7); // Set the fill color
        graphics.fillRoundedRect(centerX - 200, centerY - 90, 400, 220, 10); // Rectangle dimensions and corner radius
    
    //TEXTS
        var studioText = this.add.text(
            centerX+70,
            centerY-180,
            'Spinaca\nStudio', 
            {
                fontFamily: 'JosefinSans',
                fontStyle: 'bold',
                fontSize: '40px',
                fill: 'white',
                align: 'center',
                lineSpacing: 5,
                padding:20
            }
        );
        studioText.setOrigin(0.5);

        var subtitle = this.add.text(
            centerX,
            centerY-55, 
            'Developed by', 
            {
                fontFamily: 'JosefinSans',
                fontSize: '20px',
                fill: 'white',
                align: 'center',
                lineSpacing: 10,
                padding:20
            }
        );
        subtitle.setOrigin(0.5); //Center the text around its position

        var creditsText = this.add.text(
            centerX,
            centerY+50, 
            'Paula González Stradiotto\nÁlvaro Moreno García\nAna Ordoñez Gragera\nEduardo Sánchez Abril', 
            {
                fontFamily: 'JosefinSans',
                fontStyle: 'bold',
                fontSize: '24px',
                fill: 'white',
                align: 'center',
                lineSpacing: 10,
                padding:20
            }
        );
        creditsText.setOrigin(0.5); //Center the text around its position
        
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
        exitButton.setInteractive();
        exitButton.on('pointerover', () => exitButton.setTexture('exit_hover'));
        exitButton.on('pointerout', () => exitButton.setTexture('exit_default'));
        exitButton.on('pointerdown', () => {
                // Switch to the main menu scene
                gameConfig.audio.click.play();
		// music.stop(); //Stops music
                this.scene.start('StartScene');
            }
        );
    }
}