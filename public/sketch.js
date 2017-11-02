//Client side
var socket = io.connect;

//initialize the canvas

var canvas = document.getElementById("canvas"),
    //ctx = canvas.getContext("2d"),
    width = 500,
    height = 500,
    // player var
    player = {
    x : width/2,
    y : height-5,
    width : 10,
    height : 10,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false
    },
    friction = 0.8,
    gravity = 0.3;

var keys = {};

/*document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
});*/

function setup() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    //createCanvas(500,500);
    //background(51);
    //connect to socket on client
    socket = io.connect('http://localhost:3000');
    //recieve message newDrawing
    
    //when socket is turned on
    socket.on('player', newPlayer);
}

//update function for movement
function update(){
    // check keys
        if (keys[38] || keys[32]) {
            // up arrow or space
            if(!player.jumping){
                player.jumping = true;
                player.velY = -player.speed*2;
                }
        }
        if (keys[39]) {
            // right arrow
            if (player.velX < player.speed) {
                player.velX++;
            }
        }
        if (keys[37]) {
            // left arrow
            if (player.velX > -player.speed) {
                player.velX--;
            }
        }
    
        player.velX *= friction;
    
        player.velY += gravity;
    
        player.x += player.velX;
        player.y += player.velY;
        
        console.log('width: '+width);
        if (player.x >= 500) {
            player.x = 0;
        } else if (player.x < 0) {
            player.x = 500;
        }
    
        if(player.y >= height-player.height){
            player.y = height - player.height;
            player.jumping = false;
        }
    
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        //log player pos
        //console.log('Sending: ' + player.x + ',' + player.y);

        //create data to emit to server
        var data = {
            x: player.x,
            y: player.y
        } 
        // send data from client
        socket.emit('player', data);
        //player pos data
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        //console.log('Data: '+data.x+' '+data.y);
        requestAnimationFrame(update);
        }
        //end update


//end

//function 
function newPlayer(data){
    //noStroke();
    ctx.clearRect(0,0,500,canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(data.x, data.y, player.width, player.height);
    

}

function draw() {   
    //ctx.clearRect(0,0,width,height);
    //ctx.fillStyle = "red";
    //ctx.fillRect(player.x, player.y, player.width, player.height);
}
