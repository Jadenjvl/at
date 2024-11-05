const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;  // Size of the snake block
const tileCount = canvas.width / gridSize;  // 20x20 grid

let snake = [{ x: 8, y: 8 }];
let direction = 'right';
let food = spawnFood();
let score = 0;
let gameInterval;
let snowflakes = [];

// Snowflake class for snow effect
class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() + 0.5;
        this.size = Math.random() * 5 + 2;
    }
    
    move() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize snowflakes
for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake());
}

function gameLoop() {
    clearCanvas();
    drawSnowflakes();
    moveSnake();
    checkCollisions();
    drawSnake();
    drawFood();
    updateScore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnowflakes() {
    for (let flake of snowflakes) {
        flake.move();
        flake.draw();
    }
}

function moveSnake() {
    let head = { ...snake[0] };
    
    if (direction === 'left') head.x -= gridSize;
    if (direction === 'right') head.x += gridSize;
    if (direction === 'up') head.y -= gridSize;
    if (direction === 'down') head.y += gridSize;
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function checkCollisions() {
    let head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
    
    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function drawSnake() {
    ctx.fillStyle = '#1d3557';  // Dark blue for the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
}

function drawFood() {
    ctx.fillStyle = '#e63946';  // Red for food
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function spawnFood() {
    let foodX = Math.floor(Math.random() * tileCount) * gridSize;
    let foodY = Math.floor(Math.random() * tileCount) * gridSize;
    return { x: foodX, y: foodY };
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function resetGame() {
    snake = [{ x: 8, y: 8 }];
    direction = 'right';
    score = 0;
    food = spawnFood();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

gameInterval = setInterval(gameLoop, 100);
