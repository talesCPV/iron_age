function joystick(){

    if(keyIsDown(LEFT_ARROW) && p1.x > 20) {
        p1.x -= player_speed;
    }else if(keyIsDown(RIGHT_ARROW) && p1.x < width - 100) {
        p1.x += player_speed;
    }

    if(keyIsDown(UP_ARROW) && p1.y > 50) {
        p1.y -= player_speed;
        sprite_name = "up";
    }else if(keyIsDown(DOWN_ARROW) && p1.y < height - 40) {
        p1.y += player_speed;
        sprite_name = "down";
    }else{
        sprite_name = "main";
    }
}

function keyPressed() {
    keyIndex = key.charCodeAt(0);

    if(keyIndex == 32 || keyIndex == 122 ){ // SPACE OR UP => TURN THE PIECE
        let wp = ["main","laser","riple","spread"];
//        shooting.push(new Shoting(player.x,player.y, wp[sel_weapon]));
        shot(sel_weapon);
        sound_efects[1].play();

    }
    if( keyIndex == 120 ){ // SPACE OR UP => TURN THE PIECE
        shot(10);
//        shooting.push(new Bombing(player.x,player.y));
    }
}