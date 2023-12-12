/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////LOADS EVERY RESOURCE AND THEN CERTAIN SCENE/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        //StartS startScene when everything is loaded
        this.load.on("complete", () => {
            this.scene.start("GameScene");
        })

        //Buttons
        this.load.image('start_default', 'assets/ui/start_Default.png');
        this.load.image('credits_default', 'assets/ui/credits_Default.png');
        this.load.image('settings_default', 'assets/ui/settings_Default.png');
        this.load.image('exit_default', 'assets/ui/exit_Default.png');
        this.load.image('start_hover', 'assets/ui/start_Hover.png');
        this.load.image('credits_hover', 'assets/ui/credits_Hover.png');
        this.load.image('settings_hover', 'assets/ui/settings_Hover.png');
        this.load.image('exit_hover', 'assets/ui/exit_Hover.png');

        //StartScene
        this.load.image('mapStart', 'assets/map/mapa_1.png');
        this.load.image('title', 'assets/ui/title.png');
        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');
    
        //CredistScene
        this.load.image("logo", "./assets/misc/Logo.png");
        
        //GameScene
        this.load.image('map', 'assets/map/map_lvl1.png');
        for (let i = 0; i < 10; i++) 
            {this.load.image(`mapZone${i}`, `assets/map/mapZone${i}.png`);}
        this.load.image('node', 'assets/map/node.png');
        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');
    }
}