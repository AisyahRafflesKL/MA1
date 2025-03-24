class winScene extends Phaser.Scene {

    constructor ()
    {
        super('winScene');
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0x2596be, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(320, 110, 'G', { font: '96px Courier', fill: '#000000' }); // js name
        this.add.text(120, 310, 'Press 1 to preloadScene', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 350, 'Press 2 to gameScene', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 410, 'Press 3 to winScene', { font: '24px Courier', fill: '#000000' });
        
        let aDown = this.input.keyboard.addKey('A');
        let rDown = this.input.keyboard.addKey('R');

        let key1Down = this.input.keyboard.addKey(49); // key number 1
        let key2Down = this.input.keyboard.addKey(50); // key number 2
        let key3Down = this.input.keyboard.addKey(51); // key number 3

        key1Down.on('down', function(){
        console.log("key 1 pressed");
            this.scene.start("preloadScene");
        }, this );

        key2Down.on('down', function(){
            console.log("key 2 pressed");
                this.scene.start("gameScene");
            }, this );

            key3Down.on('down', function(){
                console.log("key 3 pressed");
                    this.scene.start("endScene");
                }, this );

    }
}
