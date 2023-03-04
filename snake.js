var canvas=document.getElementById('interface');
var ctx=canvas.getContext('2d');


class SnakeGrowth{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

var snakeSpeed=7;

var tileCount=20;                                      // declare a variable  to divise the screen to 20 squars 
 var tileSize=canvas.width /tileCount - 2



var snkX=10;                    //to set the position of the snakehead middle
var snkY=10;
var snakeBody=[];
var snakeBodyLenght=2;        // when the snake contact the fruit the body lenght grow 2


var moveX=0;                     // set var for the movemnt of the snake 
var moveY=0;

var fruitX=5;
var fruitY=5;

//this is the game loop 
function gameloop(){
    changeSnakePosition();
    clearScreen();  
    drawSnake();
    
    drawfruit();
    fruitcontact();
    
setTimeout(gameloop,1000/snakeSpeed);

}


//to cleanScreen 

function clearScreen() {

    //this is to make the screen get  black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}  



function drawSnake(){
   

    ctx.fillStyle='yellow';
    for(var i=0;i<snakeBody.length;i++){
   var part=snakeBody[i];
   ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize) 
    }

    snakeBody.push(new SnakeGrowth(snkX,snkY));    //put body item in the arr next to the head 
    if(snakeBody.length>snakeBodyLenght){
        snakeBody.shift();               // we gonna remove the further snake parts if the is more than the body tail siez
    }
 


    ctx.fillStyle="red"                //coloring the snake with red
    ctx.fillRect(snkX * tileCount,snkY*tileCount, tileSize,18)                                 //make the snake rectangle

}



function changeSnakePosition(){
 snkX=snkX+moveX;
 snkY=snkY+moveY;

}
 
// to draw the fruit and set posit
function drawfruit(){
    ctx.fillStyle="green ";
    ctx.fillRect(fruitX * tileCount,fruitY * tileCount,tileSize,tileSize)
}

// fn of fruitcontact
function fruitcontact(){
 if(fruitX === snkX && fruitY === snkY){               //if the snake head hit fruit UD/LR
    fruitX=Math.floor(Math.random() * tileCount ) ;         //change the position randomly
    fruitY=Math.floor(Math.random() * tileCount );
    snakeBodyLenght++;
 }

}


document.body.addEventListener('keydown',keyDown);    //set the event listner for the move

function keyDown(event){
    //make it move only up
  if(event.keyCode==38){      //38 key code 
    if(moveY==1)          //block the  reverse mvmt
    return;
     
    moveY=-1;
    moveX=0;       //0 to stop left right
   }

 //make it move only down
 if(event.keyCode==40){       //40 key code 
    if(moveY==-1)          //block the  reverse mvmt
    return;
    moveY=1;
    moveX=0;       //0 to stop left right
 } 

 //make it move only left
 if(event.keyCode==37){        //--
    if(moveX==1)          //block the  reverse mvmt
    return;
    moveY=0;              //0 to stop  up down
    moveX=-1;       
 }

  //make it move only right
if(event.keyCode==39){        //--
    if(moveY==-1)          //block the  reverse mvmt
    return;
    moveY=0;               //0 to stop  up down
    moveX=1;       
 }

}




gameloop();   //calling the function gameloop
 