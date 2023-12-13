/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// FINAL SCENE ////////////////////////////////////////////////
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

        else if(winner == 'none'){

        }

    // BUTTONS
        // Exit
        this.exitButton = this.add.image(centerX, 800, 'exitDefault');

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
                //Check cooldown of player of this interact key
                if (interactKey = p1Ctrls.interact)
                {
                    //Cooldown time of player 1 passsed
                    if(checkCooldown(player1)){
                        this.sceneChange(targetScene);
                    }
                }else if (interactKey = p2Ctrls.interact)
                {
                    //Cooldown time of player 2 passed
                    if(checkCooldown(player2)){
                        this.sceneChange(targetScene);
                    }
                }
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