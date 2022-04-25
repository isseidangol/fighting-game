class Sprite{
    constructor({position, imageSrc, scale = 1,frameMax =1, offset={x:0,y:0}}){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.framesCurrent = 0;
        this.framesElapse = 0;
        this.framesHold = 7;
        this.offset = offset;
    }
    
    draw(){
       context.drawImage(
            this.image,
            this.framesCurrent*(this.image.width/this.frameMax),
            0,
            this.image.width/this.frameMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.image.width/this.frameMax) * this.scale,
            this.image.height*this.scale);
    }

    animateFrames(){
        this.framesElapse++;
        if(this.framesElapse%this.framesHold == 0){
            if(this.framesCurrent<this.frameMax -1){
                this.framesCurrent++;
            }else{
                this.framesCurrent = 0;
            }
        }
    }
    update(){
        this.draw();
        this.animateFrames();
    }

    switchSprite(sprite){
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.frameMax-1) return;

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.frameMax = this.sprites.idle.frameMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.frameMax = this.sprites.run.frameMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image)
                {   this.image = this.sprites.jump.image;
                    this.frameMax = this.sprites.jump.frameMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.frameMax = this.sprites.fall.frameMax;
                    this.framesCurrent = 0;
                }
                break; 
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image;
                    this.frameMax = this.sprites.attack1.frameMax;
                    this.framesCurrent = 0;
                    }
                break;
        }
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        color,
        imageSrc,
        frameMax = 1,
        scale =1,
        offset = {x:0, y:0},
        sprites
    }){
        super({
            position,
            imageSrc,
            frameMax,
            scale,
            offset
        });
        this.framesCurrent = 0;
        this.framesElapse = 0;
        this.framesHold = 7;

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.color = color;
        
        this.lastKey;
        this.isAttacking;
        this.health = 100;
        this.sprites = sprites;
        this.dead = false;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image;
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites);

        //attackbox
        this.attackbox = {
            position : {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width : 100,
            height : 50
        }
    }

    update(){
        this.draw();
        this.animateFrames();
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x;
        this.attackbox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //gravity function
        if( this.position.y + this.height + this.velocity.y >= canvas.height - 78){
            this.velocity.y = 0 ;
            this.position.y = 348; 
            // jumpCount = 0;
        }else{
        this.velocity.y += gravity;
        } 
    }
    attack(){
        this.isAttacking = true;
        this.switchSprite('attack1');
            setTimeout(()=>{
                this.isAttacking = false;
            }, 100);
    }
}