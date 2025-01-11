const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const gridSize = 20;
const rows = 20;
const cols = 20;
canvas.width = gridSize * cols;
canvas.height = gridSize * rows;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let direction = { x: 0, y: 0 };
let newDirection = { x: 0, y: 0 };
let gameRunning = true;
let gameSpeed = 200;
let score = 0;

// Game loop
function gameLoop() {
  if (!gameRunning) return;
  setTimeout(() => {
    clearCanvas();
    updateSnake();
    drawFood();
    drawSnake();
    gameLoop();
  }, gameSpeed);
}

// Clear canvas
function clearCanvas() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw snake
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Update snake position
function updateSnake() {
  direction = newDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Handle snake wrapping around the boundaries
  if (head.x < 0) head.x = cols - 1; // Wrap left
  if (head.x >= cols) head.x = 0;    // Wrap right
  if (head.y < 0) head.y = rows - 1; // Wrap up
  if (head.y >= rows) head.y = 0;    // Wrap down

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } else {
    snake.pop();
  }
}

// Draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Handle on-screen button clicks for direction
document.getElementById("up").addEventListener("click", () => {
  if (direction.y === 0) newDirection = { x: 0, y: -1 };
});
document.getElementById("down").addEventListener("click", () => {
  if (direction.y === 0) newDirection = { x: 0, y: 1 };
});
document.getElementById("left").addEventListener("click", () => {
  if (direction.x === 0) newDirection = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
  if (direction.x === 0) newDirection = { x: 1, y: 0 };
});

// Keyboard controls for snake direction
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction.y === 0) newDirection = { x: 0, y: -1 };
  if (event.key === "ArrowDown" && direction.y === 0) newDirection = { x: 0, y: 1 };
  if (event.key === "ArrowLeft" && direction.x === 0) newDirection = { x: -1, y: 0 };
  if (event.key === "ArrowRight" && direction.x === 0) newDirection = { x: 1, y: 0 };
});

// End game
function endGame() {
  gameRunning = false;
  alert(`Game Over! Your score is ${score}. Press OK to restart.`);
  location.reload();
}

// Start the game
gameLoop();


