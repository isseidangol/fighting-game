const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.7;
const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc:'./images/Background.png',
    scale:3.19
})

const shop = new Sprite({
    position:{
        x:570,
        y:127
    },
    imageSrc:'./images/shop_anim.png',
    scale:2.9,
    frameMax:6
})
const player = new Fighter({
    position:{
        x : 0,
        y : 0
    },
    velocity:{
        x : 0,
        y : 0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc : './Fantasy Warrior/Sprites/Idle.png',
    frameMax : 11,
    scale:2.6,
    offset:{
        x:180,
        y:112
    },
    sprites:{
        idle:{
            imageSrc:'./Fantasy Warrior/Sprites/Idle.png',
            frameMax:10
        },
        run:{
            imageSrc:'./Fantasy Warrior/Sprites/Run.png',
            frameMax:8,
        },
        jump:{
            imageSrc:'./Fantasy Warrior/Sprites/Jump.png',
            frameMax:3,
        },
        fall:{
            imageSrc:'./Fantasy Warrior/Sprites/Fall.png',
            frameMax:3
        },
        attack1:{
            imageSrc:'./Fantasy Warrior/Sprites/Attack3.png',
            frameMax: 8
        },
        hit:{
            imageSrc: './Fantasy Warrior/Sprites/Take hit.png',
            frameMax:3
        },
        death:{
            imageSrc:'./Fantasy Warrior/Sprites/Death.png',
            frameMax: 7
        }
    },
    attackbox:{
        offset:{
            x:0,
            y:50
        },
        width:200,
        height:50
    }
}    
);

const enemy = new Fighter({
    position:{
        x : 500,
        y : 100
    },
    velocity : {
        x : 0,  
        y : 0
    },
    offset:{
        x:-50,
        y:0
    },
    imageSrc:'./Medieval King Pack 2/Sprites/Idle.png',
    frameMax: 8,
    scale: 2.3,
    offset:{
        x:150,
        y:92
    },
    sprites:{
        idle:{
            imageSrc:'./Medieval King Pack 2/Sprites/Idle.png',
            frameMax : 8
        },
        run:{
            imageSrc:'./Medieval King Pack 2/Sprites/Run.png',
            frameMax : 8
        },
        jump:{
            imageSrc:'./Medieval King Pack 2/Sprites/Jump.png',
            frameMax : 2
        },
        fall:{
            imageSrc:'./Medieval King Pack 2/Sprites/Fall.png',
            frameMax : 2
        },
        attack1:{
            imageSrc:'./Medieval King Pack 2/Sprites/Attack1.png',
            frameMax:4
        },
        hit:{
            imageSrc:'./Medieval King Pack 2/Sprites/Take Hit - white silhouette.png',
            frameMax:4
        },
        death:{
            imageSrc:'./Medieval King Pack 2/Sprites/Death.png',
            frameMax:6
        }
    },
    attackbox:{
        offset:{
            x:-130,
            y:50
        },
        width:130,
        height:50
    }
})

console.log(player);

const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    }
}

function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();
    
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
        if(keys.a.pressed && player.lastKey =='a'){
            player.switchSprite('run');
            player.velocity.x = -5;
        }
        else if(keys.d.pressed && player.lastKey == 'd'){
            player.velocity.x = 5;
            player.switchSprite('run');
        }else{
        player.switchSprite('idle');
        }

        if(player.velocity.y < 0){
            player.switchSprite('jump');
        }else if(player.velocity.y>0){
            player.switchSprite('fall');
        }

    //enemy movement
        if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
            enemy.velocity.x = -5;
            enemy.switchSprite('run');
        }
        else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
            enemy.velocity.x = 5;
            enemy.switchSprite('run');
        }else{
        enemy.switchSprite('idle');

        }
        if(enemy.velocity.y < 0){
            enemy.switchSprite('jump');
        }else if(enemy.velocity.y >0){
            enemy.switchSprite('fall');
        }

    //detection for collision
        if(collisiondetect({
            rectangle1:player,
            rectangle2:enemy
        })&&player.isAttacking  && player.framesCurrent === 2){
            player.isAttacking = false;
            enemy.health -= 10;
            enemy.switchSprite('hit');
            document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        }
        if(collisiondetect({
            rectangle1:enemy,
            rectangle2:player
        })&&enemy.isAttacking && enemy.framesCurrent === 2){
            enemy.isAttacking = false;
            player.switchSprite('hit');
            player.health -= 10;
            document.querySelector('#playerHealth').style.width = player.health + '%';
        }

        //if the attack misses
        if(enemy.isAttacking && enemy.framesCurrent === 2){
            enemy.isAttacking = false;
        }else if(player.isAttacking && player.framesCurrent ===2){
            player.isAttacking = false;
        }
    
    //end game based on the health
    if(player.health == 0){
        endgame();
    }
    else if(enemy.health ==0){
        endgame();
    }
}

animate();
// let jumpCount = 0;
window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'w':
            // if(jumpCount == 0){
            player.velocity.y = -20;
            // player.lastKey = 'w';
            // jumpCount = 1;
        // }
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'g':
            player.attack();
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            // enemy.lastKey = 'Arrowup';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case ' ':
            enemy.attack();
            break;
    }
})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
})
