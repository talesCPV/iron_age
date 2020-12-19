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

    keyIndex = key.charCodeAt(0);


    if(stage == 1){


        if(keyIsDown(LEFT_ARROW) ) {
            sel_opt[0] -= 1;
            if(sel_opt[0] < 0){
                sel_opt[0] = 2;
            }
        }else if(keyIsDown(RIGHT_ARROW) ) {
            sel_opt[0] += 1;
            if(sel_opt[0] > 2){
                sel_opt[0] = 0;
            }
        }else if(keyIsDown(UP_ARROW) ) {
            sel_opt[1] -= 1;
            if(sel_opt[1] < 0){
                sel_opt[1] = 2;
            }
        }else if(keyIsDown(DOWN_ARROW) ) {
            sel_opt[1] += 1;
            if(sel_opt[1] > 2){
                sel_opt[1] = 0;
            }
        }

        if( keyIndex == 69 ){ // ENTER => Select Stage
            if( sel_opt[0] == 0 && sel_opt[1] == 0 ){
                back_color = [0,0,0];
                song = loadSound('assets/Trooper.mp3');
                stage = 2;
                next_stage = 4;
                player.x = 50;
            }else if( sel_opt[0] == 1 && sel_opt[1] == 0 ){
                alert("The Evil that Man Do");
            }else if( sel_opt[0] == 2 && sel_opt[1] == 0 ){
                back_color = [0,0,0];
                song = loadSound('assets/Wasted.mp3');
                stage = 2;
                next_stage = 4;
                player.x = 50;
            }else if( sel_opt[0] == 0 && sel_opt[1] == 1 ){
                alert("Can I Play With Madness");
            }else if( sel_opt[0] == 2 && sel_opt[1] == 1 ){
                alert("Run To The Hills");
            }else if( sel_opt[0] == 0 && sel_opt[1] == 2 ){
                alert("Aces High");
            }else if( sel_opt[0] == 1 && sel_opt[1] == 2 ){
                alert("Hallowed Be Thy Name");
            }else if( sel_opt[0] == 2 && sel_opt[1] == 2 ){
                alert("Fear Of The Dark");                
            }
        }
      

    }else if(stage > 3){


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