
let button_press = false;
let time = 0;
let sel_opt = [1,1];
let next_stage = 0;


function stage_select(sel_stage){



    if(sel_stage == 0){

        draw_sprite(width/2 - 85 * pixel / 2,250,pl_sprites.splash["logo"]);
        fill(255);

        text("PUSH ENTER TO START ", 210, 400, width, 150);
        text("2020 - by Tales C. Dantas ", 160, 550, width, 150);

        if(button_press){
            if(!sound_efects[0].isPlaying()){
                sound_efects[0].play();                                
            }  

            if( Math.floor(sound_efects[0].duration()) <  Math.ceil(sound_efects[0].currentTime()) ){
                stage = 1;
                button_press = false;
                sound_efects[4].setLoop(true);
                sound_efects[4].play();                                
            }

        }

        if(keyIsDown(ENTER) ) {
            button_press = true;


        }
        
        
    }else if(sel_stage == 1){

        back_color = [0,121,248];
        noStroke();
        text("SELECT STAGE", 280, 50, width, 150);

        select_strip(100);
        stage_frame(150,75);
        stage_frame(350,75);
        stage_frame(550,75);

        select_strip(275);
        stage_frame(150,250);
        stage_frame(350,250);
        stage_frame(550,250);

        select_strip(450);
        stage_frame(150,425);
        stage_frame(350,425);
        stage_frame(550,425);

        fill(255);
        text("THE TROOPER", 150, 200, 200, 150);
        text("THE EVIL THAT MAN", 350, 200, 230, 150);
        text("WASTED YEARS", 550, 200, 200, 150);

        text("CAN I PLAY", 150, 375, 200, 150);
        text("RUN TO THE HILLS", 550, 375, 200, 150);

        text("ACES HIGH", 150, 550, 150, 150);
        text("HALLOWED BE THY", 350, 550, 200, 150);
        text("FEAR OF THE DARK", 550, 550, 200, 150);


        joystick();

        let x = 150;
        let y = 75;
        let B = 15

        if(sel_opt[0] == 1){
            x = 350;
        }else if(sel_opt[0] == 2){
            x = 550;
        }

        if(sel_opt[1] == 1){
            y = 250;
        }else if(sel_opt[1] == 2){
            y = 425;
        }

        fill(255);
        rect(x,y,B,B);  
        rect(x+85,y,B,B);  
        rect(x,y+85,B,B);  
        rect(x+85,y+85,B,B);  


    }else if(sel_stage == 2){

        player.draw();
        player.x += 0.5;
        text("LOADING...", 210, 400, width, 150);

        if(song.isLoaded()){
//            sound_efects[4].setLoop(false);
            sound_efects[4].stop();                                

            stage = next_stage;
            player.x = 100;
            song.playMode('restart');
            song.play();
            stage_length = Math.floor(song.duration());
        }else{}


    }else if(sel_stage == 3){


        stage_percent = Math.floor(song.currentTime()/stage_length*100) ;

        //enemys span
        if(time < stage_percent){
            time = stage_percent;
            if(time == 1){
                new_enemy_balls(6);
            }else if(time == 3){
                new_viper(5);
            }else if(time == 6){
                new_walker();
            }else if(time == 9){
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 12){
                new_moais("top");
            }else if(time == 15){
                new_enemy_balls(6);
                new_viper(5);
            }else if(time == 18){
                new_walker();
                new_moais("top");
            }else if(time == 21){
                new_moais("down");
                new_viper(5);
            }else if(time == 24){
                new_walker();
            }else if(time == 27){
                new_enemy_balls(5);
            }else if(time == 30){
                new_viper(5);
            }else if(time == 33){
                new_viper(5);
            }else if(time == 33){
                new_viper(5);
                new_walker();
            }else if(time == 39){
                new_walker();
            }else if(time == 42){                
                new_moais("top");            
            }else if(time == 45){                
                new_enemy_balls(5);
                new_walker();
            }else if(time == 48){                
                new_walker();
            }else if(time == 49){                
                new_viper(5);
            }else if(time == 51){                
                new_moais("top");
                new_moais("down");
            }else if(time == 54){                
                new_viper(10);
            }else if(time == 57){                
                new_walker();
            }else if(time == 60){                
                new_viper(5);
            }else if(time == 63){                
                new_moais("top");
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 66){                
                new_moais("top");
                new_enemy_balls(6);
            }else if(time == 69){                
                new_viper(5);
            }else if(time == 72){                
                new_walker();
                new_moais("down");
            }else if(time == 75){                
                new_moais("top");
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 76){                
                new_moais("top");
                new_viper(5);
            }else if(time == 78){                
                new_moais("top");
                new_moais("down");
            }else if(time == 80){                
                new_moais("top");
                new_moais("down");
            }else if(time == 82){                
                new_moais("top");
                new_moais("down");
            }else if(time == 84){                
                new_enemy_balls(6);
            }else if(time == 86){                
                new_viper(5);
            }else if(time == 88){       
                new_walker();
                new_moais("top");
            }else if(time == 90){                
                new_enemy_balls(6);
                new_walker();
            }else if(time == 91){                
                new_moais("top");
                new_walker();
            }else if(time == 92){                
                new_walker();
            }else if(time == 93){                
                new_moais("top");
                new_moais("down");
            }else if(time == 95){                
                new_moais("top");
                new_moais("down");
            }else if(time == 97){                
                new_moais("top");
                new_enemy_balls(6);
                new_moais("down");
            }else if(time == 98){                
                new_moais("top");
                new_viper(5);
                new_moais("down");
                new_walker();
            }else if(time == 99){                
                new_viper(15);
                new_walker();
            }else if(time == 100){                
                new_walker();
                new_viper(5);
            }

        }

        draw_screen();

    }

}


function draw_screen(){

        // show control screen
        text("SCORE: "+score, 10, 25, 200, 150);
        text("SHIELD: "+player.shield+"%", 210, 25, 200, 150);
        text("WEAPON: "+weap_names[player.weapon]+" x"+player.max_shot, 410, 25, 200, 150);

        // show all shottings
        for(let i=0;i<shooting.length;i++){
            shooting[i].move(i);
        }
    
        // show bomb
        for(let i=0;i<bombing.length;i++){
            bombing[i].move(i);
        }
        // show all enemys
        for(let i=0;i<enemy.length;i++){
            enemy[i].move(i);
        }

        // show background    
        for(let i=0;i<scene.length;i++){
            scene[i].move(i);         
        }


        // show itens    
        for(let i=0;i<itens.length;i++){

            if(collision(player,itens[i])){
                if(itens[i].item == 1 && player.max_shot < 9 ){ // add shot
                    player.max_shot += 1;

                }else if(itens[i].item == 2){ // laser
                    if(player.weapon != 2){
                        player.max_shot = 1;
                        player.weapon = 2;                        
                    }else{
                        player.max_shot += 1;
                    }

                }else if(itens[i].item == 3){ // Ripple

                }else if(itens[i].item == 4){ // Increese Speed
                    player.speed += 1;

                }else if(itens[i].item == 5){ // Torp
                    player.bomb = 4;
                    player.max_bomb += 1;
                }

                itens.splice(i,1);

            }else{
                itens[i].move(i);
            }



        }


        hit();    
        joystick();

        // draw player
        player.draw();
}

function draw_pixel(x,y,N){
    let x2 = pixel;
    let y2 = pixel;

    for(let i=0;i<N.length;i++){
        let color = N[i].color;
        fill(color);
        for(let j=0; j<N[i].data.length; j++){
            let x1 = x + N[i].data[j][0]*pixel;
            let y1 = y - N[i].data[j][1]*pixel;
            if(N[i].data[j].length > 2){
              x2 =  N[i].data[j][2]*pixel;
              y2 =  N[i].data[j][3]*pixel;
            }
            rect(x1,y1, x2, y2);
        }
    }
}


function draw_sprite(x,y,JSON){
    let dots = JSON.dots
    draw_pixel(x,y,dots);

    let lines = JSON.lines
    draw_pixel(x,y,lines);
}

function hit(){

    for(let i=0; i<enemy.length;i++){

        // atack
        for(let j=0; j<shooting.length;j++){

            if(collision(shooting[j],enemy[i])){
                enemy[i].energy -= shooting[j].power;
                shooting.splice(j,1);
            }            
        }

        // defense
        if(collision(player,enemy[i])){
            player.shield -= enemy[i].power ;
            enemy[i].energy -= 5;
        }

        if(bombing.length > 0){
            if(collision(bombing[0],enemy[i])){
                enemy[i].energy -= bombing[0].power;
                bombing.splice(0,1);
            }               
        }

    }
}

function collision(obj1,obj2){

    // axis X
    let x1 = obj1.x;
    let hx1 = obj1.hitbox[0] / 2;

    if(obj1.pivot[0] == 0){
        x1 += hx1;
    }else if(obj1.pivot[0] == 2){
        x1 -= hx1;
    }

    let x2 = obj2.x;
    let hx2 = obj2.hitbox[0] / 2;

    if(obj2.pivot[0] == 0){
        x2 += hx2;
    }else if(obj2.pivot[0] == 2){
        x2 -= hx2;
    }


    if( Math.abs(x1-x2) < hx1+hx2){
        // axis Y
        let y1 = obj1.y;
        let hy1 = obj1.hitbox[1] / 2;

        if(obj1.pivot[1] == 0){
            y1 += hy1;
        }else if(obj1.pivot[1] == 2){
            y1 -= hy1;
        }

        let y2 = obj2.y;
        let hy2 = obj2.hitbox[1] / 2;

        if(obj2.pivot[1] == 0){
            y2 += hy2;
        }else if(obj2.pivot[1] == 2){
            y2 -= hy2;
        }    
        if( Math.abs(y1-y2) < hy1+hy2){
            return true;
        }
    }
    return false;
}


function stage_frame(x,y){
        // rect
        let B = 15
        fill(0);
        rect(x,y,100,100);
        fill(255);
        rect(x+B,y+2,100 - 2*B,2);
        rect(x+B,y+97,100 - 2*B,2);
        rect(x+2,y+B,2,100 - 2*B);
        rect(x+97,y+B,2,100 - 2*B);
        fill(0,236,220);
        rect(x+B,y+5,100 - 2*B,B-5);
        rect(x+B,y+86,100 - 2*B,B-5);
        rect(x+5,y+B,B-5,100 - 2*B);
        rect(x+86,y+B,B-5,100 - 2*B);

}


function select_strip(y){

        fill(0,236,220);
        rect(0,y,width,pixel); 
        y += 2*pixel       
        rect(0,y,width,pixel);        
        y += 2*pixel       
        rect(0,y,width,pixel*8);        
        y += 9*pixel       
        rect(0,y,width,pixel);        
        y += 2*pixel       
        rect(0,y,width,pixel);   

}
