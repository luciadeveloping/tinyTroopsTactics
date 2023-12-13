/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// CREDITS //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class CreditsScene extends Phaser.Scene {
    constructor () {
        super({key: 'CreditsScene'});
    }

    create() {
    // SOUNDS
        this.music = this.sound.add('secondaryMusic', musicConfig);
        this.clickSound = this.sound.add('clickSound');

        if (musicEnabled){
            this.music.play();
        }

    //IMAGES
        this.title = this.add.image(centerX, 220, 'creditsTitle');
        this.title.setScale(0.7);

        this.logo = this.add.image(centerX-100, centerY - 100, 'logo');
        this.logo.setScale(0.3);

    // BUTTONS
        // Exit
        this.exitButton = this.add.image(centerX, 800, 'exitDefault');

    //FIGURES
        //Name credits background
        var graphics = this.add.graphics();
        graphics.fillStyle(1884159, 0.7); // Set the fill color
        graphics.fillRoundedRect(centerX - 200, centerY , 400, 220, 10); // Rectangle dimensions and corner radius
    
    //TEXTS
        var studioText = this.add.text(
            centerX+70,
            centerY-100,
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
            centerY+30, 
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
            centerY+130, 
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

    /*
    ///////////////////////////////////////////////////////////////////////////////////////////
    //INTERACTIVITY
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
        ///////////////////////////////////////////////////////////////////////////////////////////
    */

    // PLAYERS CREATION
        player1 = this.physics.add.image(centerX-300, centerY, 'player1');//.setInteractive();
        player2 = this.physics.add.image(centerX+300, centerY, 'player2');//.setInteractive();

        // Collision with world bounds
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);

        // CONTROLS OF PLAYERS
        // PLayer 1 is controlled with WASD and interacts with SPACE
        p1Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Player 2 is controlled with arrow keys and interacts with ENTER
        p2Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'interact': Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        // To avoid player 1 automatic movement after returning to this scene 
        //(because it uses WASD)
        this.p1ctrlsReset();
    }


    update() {

        // Assigns p1ctrls as controls for player1
        this.handlePlayerMovement(player1, p1Ctrls);
        // Assigns p2ctrls as controls for player2
        this.handlePlayerMovement(player2, p2Ctrls);

        // Interaction with Exit button
        this.handleButtonInteraction(this.exitButton, 'StartScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.exitButton, 'StartScene', p2Ctrls.interact);

    }

    // Resets controls of player 1
    p1ctrlsReset() {
        p1Ctrls.up.reset();
        p1Ctrls.down.reset();
        p1Ctrls.left.reset();
        p1Ctrls.right.reset();
        p1Ctrls.interact.reset();
    }

    // Detects if key in input is pressed to move player
    handlePlayerMovement(player, input) {
        if (input.left.isDown) {
            player.setVelocityX(-PLAYER_SPEED);
        } else if (input.right.isDown) {
            player.setVelocityX(PLAYER_SPEED);
        } else {
            player.setVelocityX(0);
        }

        if (input.up.isDown) {
            player.setVelocityY(-PLAYER_SPEED);
        } else if (input.down.isDown) {
            player.setVelocityY(PLAYER_SPEED);
        } else {
            player.setVelocityY(0);
        }
    }

    // Detects if player interacts with the button to start another scene
    handleButtonInteraction(button, targetScene, interactKey) {
        p1Bounds = player1.getBounds();
        p2Bounds = player2.getBounds();
        buttonBounds = button.getBounds();

        //If bounds of any player and the button intersect
        if (Phaser.Geom.Intersects.RectangleToRectangle(p1Bounds, buttonBounds) ||
            Phaser.Geom.Intersects.RectangleToRectangle(p2Bounds, buttonBounds)) {
            
            //Changes button texture to hover
            button.setTexture(`${button.texture.key.replace('Default', 'Hover')}`);
                
            //Changes scene if key down and plays sound
            if (interactKey.isDown) {
                //Play click sound
                if (effectsEnabled){
                    this.clickSound.play();
                }

                this.sceneChange(targetScene);
            }
        } else {
            //Maintains normal texture of button
            button.setTexture(button.texture.key.replace('Hover', 'Default'));
        }
    }

    // Starts another scene
    sceneChange(targetScene) {
        //Stops music
        this.music.stop();

        this.scene.start(targetScene);
    }
}