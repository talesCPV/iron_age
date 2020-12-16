
let button_press = false;
let time = 0;

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
                song.playMode('restart');
                song.play();
                stage_length = Math.floor(song.duration());
                stage = 1;
                button_press = false;
            }

        }

        if(keyIsDown(ENTER) ) {
            button_press = true;
        }
        
    }else if(sel_stage == 1){

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
                new_moais("down");
            }
            }else if(time == 42){                
                new_enemy_balls(6);
                new_walker();
            }else if(time == 45){                
                new_walker();
            }else if(time == 48){                
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
                new_walker();

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