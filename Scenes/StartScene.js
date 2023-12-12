/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////MAIN MENU ALREADY WITH PLAYER CONTROLS TO SELECT BUTTONS///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
let buttonBounds;

/////////////////////////////////////////////////// CLASS ///////////////////////////////////////////////////
export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
    // IMAGES
        map = this.add.image(centerX, centerY, 'mapStart');
        map.setScale(1.4);
        const TITLE = this.add.image(centerX, 90, 'title');

    // BUTTONS
        // Start
        this.startButton = this.add.image(400, centerY, 'start_default').setInteractive();

        //Settings
        this.settingsButton = this.add.image(gameConfig.width - 200, gameConfig.height - 200, 'settings_default').setInteractive();

        //Credits
        this.creditsButton = this.add.image(200, gameConfig.height - 200, 'credits_default').setInteractive();

        //Exit
        //this.exitButton = this.add.image(250, 470, 'exit_default').setInteractive();

    // PLAYERS CREATION
        player1 = this.physics.add.image(650, 270, 'player1').setInteractive();

        player2 = this.physics.add.image(880, centerY, 'player2').setInteractive();

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

        // Interaction with Start button
        this.handleButtonInteraction(this.startButton, 'GameScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.startButton, 'GameScene', p2Ctrls.interact);

        //Interaction with Settings button
        this.handleButtonInteraction(this.settingsButton, 'SettingsScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.settingsButton, 'SettingsScene', p2Ctrls.interact);

        //Interaction with Credits button
        this.handleButtonInteraction(this.creditsButton, 'CreditsScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.creditsButton, 'CreditsScene', p2Ctrls.interact);

        // No target scene for exitButton
        //this.handleButtonInteraction(this.exitButton, null, p2ctrls.interactPlayer1);
        //this.handleButtonInteraction(this.exitButton, null, p2ctrls.interactPlayer2);
    
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
            button.setTexture(`${button.texture.key.replace('_default', '_hover')}`);
                
            //Changes scene if key dow
            if (interactKey.isDown) {
                this.sceneChange(targetScene);
            }
        } else {
            //Maintains normal texture of button
            button.setTexture(button.texture.key.replace('_hover', '_default'));
        }
    }

    // Starts another scene
    sceneChange(targetScene) {

        // DOESN'T WORK
        // //Plays click sound if not muted
        // if (gameConfig.audio.click.mute == false){
        //     gameConfig.audio.click.play();
        // }

        this.scene.start(targetScene);
    }

    // Resets controls of player 1
    p1ctrlsReset() {
        p1Ctrls.up.reset();
        p1Ctrls.down.reset();
        p1Ctrls.left.reset();
        p1Ctrls.right.reset();
        p1Ctrls.interact.reset();
    }
}