function joystick(){

    if(keyIsDown(LEFT_ARROW) && player.x > 20) {
        player.move(-1,0);
    }else if(keyIsDown(RIGHT_ARROW) && player.x < width - 100) {
        player.move(1,0);
    }

    if(keyIsDown(UP_ARROW) && player.y > 50) {
        player.move(0,-1);
        player.name = "up";
    }else if(keyIsDown(DOWN_ARROW) && player.y < height - 40) {
        player.move(0,1);
        player.name = "down";
    }else{
        player.name = "main";
    }


}

function keyPressed() {

    if(stage == 1){

        keyIndex = key.charCodeAt(0);

        if( keyIndex == 69 ){ // ENTER => PAUSE

                if(song.isPlaying()){
                    song.pause();
                    noLoop();
                    sound_efects[2].play();

                }else{
                    song.play();
                    loop();
                }

        }

        if(keyIndex == 32 || keyIndex == 122 ){ // SPACE OR Z
            if(shooting.length < player.max_shot){
                shot(player.weapon);
                sound_efects[1].play();
            }

        }
        if( keyIndex == 120 ){ // X
            if(bombing.length < player.max_bomb){
                shot(player.bomb);
            }
        }

    }

}