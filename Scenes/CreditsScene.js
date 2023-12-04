export default class CreditsScene extends Phaser.Scene {
    constructor () {
        super({key: 'CreditsScene'});
    }

    preload() {
        this.load.image("logo", "./assets/misc/Logo.png"); //Logo of Spinaca Studio
        this.load.audio('clickSound', 'audio/click.mp3');
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');
    }

    create() {
    //CONSTANTS
        const gameConfig = this.sys.game.config;// Access the game configuration using the Scene Manager
        // Get the center coordinates of the canvas
        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

    //SOUNDS
        this.clickSound = this.sound.add('clickSound');//Sound when button clicked

    //IMAGES
        const logo = this.add.image(centerX-100, 120, "logo");//Logo image
        logo.setScale(0.3);

        const exitButton = this.add.image(centerX, centerY+180, 'exit_default');

    //FIGURES
        //Name credits background
        var graphics = this.add.graphics();
        graphics.fillStyle(2590530, 0.7); // Set the fill color
        graphics.fillRoundedRect(centerX - 200, centerY - 90, 400, 220, 10); // Rectangle dimensions and corner radius
        
        //Button background
        // var button = this.add.graphics();
        // button.fillStyle(3056593, 1);
        // button.fillRoundedRect(centerX - 150, centerY+160 , 300, 70, 10);

        //Button hit area
        //var buttonHitArea = this.add.rectangle()
    
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

        exitButton.on('pointerdown', () => 
            {
                this.scene.start('StartScene'); // Switch to the main menu scene
                this.clickSound.play();
            }
        );

        //button.setInteractive();
        // //When pointer over changes color
        // button.on('pointerover', function () 
        //     { 
        //         button.fillStyle(7328247, 1);
        //     }
        // ,this);
        // //When pointer not over resets color
        // button.on('pointerout', function () 
        //     {
        //         button.fillStyle(3056593, 1);
        //     }
        // ,this);
        // //When clicked plays sound and returns to start menu
        // button.on('pointerdown', function ()
        //     {
        //         this.clickSound.play();
        //         this.scene.start('StartScene');
        //     }
        // ,this);

        // Handle button click
        // returnText.setInteractive(button);
        // returnText.on('pointerdown', function () 
        //     {
        //         this.scene.start('StartScene'); // Switch to the main menu scene
        //         this.clickSound.play();
        //     }, 
        // this);
    }
}