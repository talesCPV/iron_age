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







//    alert(map_buttons)


}

function keyPressed() {

    keyIndex = key.charCodeAt(0);


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
            player.x = 50;
            time = 0;
            if( sel_opt[0] == 0 && sel_opt[1] == 0 ){
                back_color = [0,0,0];
                song = loadSound('assets/Trooper.mp3');
                scene.push(new Ground("cavern","montanhas",true));
                scene.push(new Ground("cavern","arvores"));
                scene[scene.length-1].fill();
                stage = 2;
                next_stage = 4;
            }else if( sel_opt[0] == 1 && sel_opt[1] == 0 ){
                alert("The Evil that Man Do");
            }else if( sel_opt[0] == 2 && sel_opt[1] == 0 ){
                back_color = [25,20,158];
//                back_color = [108,184,225];
                song = loadSound('assets/Wasted.mp3');
                scene.push(new Ground("sea","agua",false,true));
                scene[scene.length-1].fill();
                stage = 2;
                next_stage = 5;
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
        player.move(map_buttons[0],map_buttons[1]);

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
                song.pause();
                pause = true;
                sound_efects[2].play();

            }else{
                song.play();
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