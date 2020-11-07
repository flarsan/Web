let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box= 32;
snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

/**Draws game backgroud */
function Backgroud(){
    context.fillStyle = "#D1EDF2";
    context.fillRect(0, 0, 16 * box, 16 * box); /**posição de x e y e a altura e largura */
}

/** Draws snake */
function DrawSnake(){
    for (i=0; i < snake.length; i++){
        context.fillStyle = "#0000CD";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/** listens to the direction command */
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

/** set snake food */
food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
} 

/** draws snake food */
function drawFood(){
    context.fillStyle = "#CD3700";
    context.fillRect(food.x, food.y, box, box);
}

/**Start the game */
function gameStart(){

    /** if snake hit itself end the game */
    for (i=1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            gameOver();
        }
    }

    /**Function for end the game */
    function gameOver(){
        clearInterval(jogo);
        document.getElementById('title').innerHTML = 'Game Over';
        document.body.style.backgroundColor = '#f2f2f2';
        alert('game over');
    }
    
    /** if snake hit the wall end the game */
    if ((snake[0].x > 15 * box && direction == "right") || (snake[0].x < 0 && direction == "left") ||
    (snake[0].y > 15 * box && direction == "down") || (snake[0].y < 0 && direction == "up"))  gameOver(); 

    Backgroud();
    DrawSnake();
    drawFood();

    /**Sets snake directions */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;


    /**Sets food direction if snake eat*/
    
    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

alert("Welcome to the Snake Game \n\nRemember: the snake can't hit the wall nor hit itself\n\nReady to play?")
let jogo = setInterval(gameStart, 100);
