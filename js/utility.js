function collisiondetect({rectangle1, rectangle2}){
    return (rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x &&
        rectangle1.attackbox.position.x < rectangle2.attackbox.position.x + rectangle2.width &&
        rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y&&
        rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height);
}

let timer =60;

function endgame(){
    gamecounter = 0;
    document.querySelector('#result').style.display = 'flex';
    if(player.health === enemy.health){
        document.querySelector('#result').innerHTML = 'Tie';
    }
    else if(player.health > enemy.health){
        document.querySelector('#result').innerHTML = 'Player 1 wins';
        enemy.switchSprite('death');
        enemy.dead = true;
    }
    else if(player.health < enemy.health){
        document.querySelector('#result').innerHTML = 'Player 2 wins';
        player.switchSprite('death');
        player.dead = true;
    }
    
}

let gamecounter = 1;
function decreasetimer(){
    if(timer>0){
        if(gamecounter == 1){
        timer--;
        }
        setTimeout(decreasetimer,1000);
        document.querySelector('#timer').innerHTML = timer;
    }
    if(timer == 0){
       endgame();
    }
}
decreasetimer();
