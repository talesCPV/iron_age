let controllers = []; 
let have_joy = false;
let map_buttons = [0,0,0,0,0,0];
let pressed = [false,false,false,false,false,false]; // x, y, select, start, B, A


function gamepadHandler(event, connecting) {
  let gamepad = event.gamepad;
  if (connecting) {
         print("Connecting to controller "+gamepad.index)
    controllers[gamepad.index] = gamepad
    have_joy = true;
  } else {
    delete controllers[gamepad.index]
    have_joy =  false;
  }
}

function joystick(){

    map_buttons = [0,0,0,0,0,0];

// keyboard
    if(keyIsDown(LEFT_ARROW) ) {
        map_buttons[0] = -1;
    }else if(keyIsDown(RIGHT_ARROW) ) {
        map_buttons[0] = 1;
    }

    if(keyIsDown(UP_ARROW) ) {
        map_buttons[1] = -1;
    }else if(keyIsDown(DOWN_ARROW) ) {
        map_buttons[1] = 1;
    }

//joystick
    if(have_joy){
        map_buttons[0] = controllers[0].axes[6];
        map_buttons[1] = controllers[0].axes[7];
        map_buttons[2] = controllers[0].buttons[6].value;
        map_buttons[3] = controllers[0].buttons[7].value;
        map_buttons[4] = controllers[0].buttons[0].value;
        map_buttons[5] = controllers[0].buttons[1].value;
    }

   if(stage > 3){
        make_control(map_buttons);
    }

}

function keyPressed() {

    let keyIndex = key.charCodeAt(0);

    if(stage == 0){ // KONAMI CODE
        let cheat = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
        if(key == cheat[score]){
            score++;
        }else{
            score = 11;
        }
        if(score == 10){
            get_weapons = [1,1,1,1,1,1,1,1,1];
            player.max_shot = 12;
            player.max_special = 9;
            player.tank = 5;
            sound_efects[9].play();
        }
    }

    if(pause){

        let i = 0
        if(keyIsDown(UP_ARROW) ) {
            i= -1        
        }else if(keyIsDown(DOWN_ARROW) ) {
            i = 1;
        }  

        player.weapon += i;
        while(!get_weapons[player.weapon]){
            player.weapon += i;
            if(player.weapon > 8){
                player.weapon = 0;
            }else if(player.weapon <0){
                player.weapon = 8;
            }
        }

        if( keyIndex == 69 ){ // ENTER => PAUSE
            map_buttons[3] = 1                
        }

        if( keyIndex == 83 ){ // SHIFT
            if(player.tank > 0){
                let energy = 100 - player.shield;
                    while(energy >= 0){
                        if(energy % 2 == 0){
                            sound_efects[5].playMode("restart");
                            sound_efects[5].play();
                        }
                        energy -= 1;
                        player.shield += 1;
                    }
                player.tank -=1;
            }
                          
        }

        


    }else if(stage == 1){

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
     
                if( sel_opt[0] == 0 && sel_opt[1] == 0 ){ // THE TROOPER
                    if(!defeat[0]){ 
                        start_stage(4);
                    }
                }else if( sel_opt[0] == 1 && sel_opt[1] == 0 ){ // THE EVIL THAT MAN DO
                    if(!defeat[1]){ 
                        start_stage(5);
                    }
                }else if( sel_opt[0] == 2 && sel_opt[1] == 0 ){ // WASTED YEARS
                    if(!defeat[2]){ 
                        start_stage(6);
                    }
                }else if( sel_opt[0] == 0 && sel_opt[1] == 1 ){ // CAN I PLAY WITH MADNESS
                    if(!defeat[3]){ 
                        start_stage(7);             
                    }
                }else if( sel_opt[0] == 2 && sel_opt[1] == 1 ){ // RUN TO THE HILLS
                    if(!defeat[4]){ 
                        start_stage(8);
                    }
                }else if( sel_opt[0] == 0 && sel_opt[1] == 2 ){ // ACES HIGH
                    if(!defeat[5]){ 
                        start_stage(9);
                    }
                }else if( sel_opt[0] == 1 && sel_opt[1] == 2 ){ // HALLOWED BE THY NAME
                    if(!defeat[6]){ 
                        start_stage(10);
                    }
                }else if( sel_opt[0] == 2 && sel_opt[1] == 2 ){ // FEAR OF THE DARL
                    if(!defeat[7]){ 
                        start_stage(11);            
                    }
                }
            }
          

        }else if(stage > 3){


            if( keyIndex == 69 ){ // ENTER => PAUSE
                map_buttons[3] = 1                
            }

            if(keyIndex == 32 || keyIndex == 122 ){ // SPACE OR Z
                map_buttons[4] = 1
            }

            if( keyIndex == 120 ){ // X
                map_buttons[5] = 1            
            }

        }
    
    make_control();

}

function make_control(){

    if(map_buttons[1] == -1){
        player.name = "up";
    }else if(map_buttons[1] == 1){
        player.name = "down";
    }else{
        player.name = "main";
    }
        if(!boss_defeat){ // para o controle se o boss foi morto
            player.move(map_buttons[0],map_buttons[1]);
        }

// SELECT
    if( map_buttons[2] == 1){
        if(!pressed[0]){ 
            pressed[0] = true;
        }
    }else{
        pressed[0] = false;
    }

// START
    if( map_buttons[3] == 1 ){        
        if(!pressed[1]){ 
            pressed[1] = true;
            if(song.isPlaying()){
                song.stop();
                pause = true;
                sound_efects[2].play();

            }else{
                song.play();
                song.jump(timer[0])
                pause = false;
            }
        }
    }else{
        pressed[1] = false;
    }

// BUTTON B
    if(map_buttons[4] == 1){
        if(!pressed[2]){ 
            pressed[2] = true;
            player.shot(1); 
        }
    }else{
        pressed[2] = false;
    }

// BUTTON A
    if( map_buttons[5] == 1){
        if(!pressed[3]){
            pressed[3] = true;            
            player.shot(2);            
        }
    }else{
        pressed[3] = false;
    }

}