const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const WIDTH = 40;
const HEIGHT = 20;

let playerX = Math.floor(WIDTH / 2);
let enemies = [];
let enemyDirection = 1;
let enemyMoveCounter = 0;
let bullets = [];
let score = 0;
let lives = 3;
let gameOver = false;

function createEnemies() {
    enemies = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            enemies.push({ x: 5 + col * 4, y: 3 + row * 2, alive: true });
        }
    }
}

function drawGame() {
    let grid = [];
    for (let i = 0; i <= HEIGHT; i++) {
        grid[i] = [];
        for (let j = 0; j <= WIDTH + 1; j++) {
            grid[i][j] = ' ';
        }
    }
    
    for (let i = 0; i <= HEIGHT; i++) {
        grid[i][0] = '#';
        grid[i][WIDTH + 1] = '#';
    }
    for (let i = 0; i <= WIDTH + 1; i++) {
        grid[0][i] = '#';
        grid[HEIGHT][i] = '#';
    }
    
    grid[HEIGHT - 1][playerX] = 'A';
    
    for (let enemy of enemies) {
        if (enemy.alive) {
            grid[enemy.y][enemy.x] = 'W';
        }
    }
    
    for (let bullet of bullets) {
        if (bullet.y > 0 && bullet.y < HEIGHT) {
            grid[bullet.y][bullet.x] = '|';
        }
    }
    
    for (let i = 0; i <= HEIGHT; i++) {
        let line = '';
        for (let j = 0; j <= WIDTH + 1; j++) {
            line += grid[i][j];
        }
        console.log(line);
    }
    
    console.log('# Счет: ' + score + '  Жизни: ' + lives + '  #');
    console.log('# A/D или ←/→ - движение, ПРОБЕЛ - стрельба, Q - выход #');
}

function moveEnemies() {
    enemyMoveCounter++;
    if (enemyMoveCounter < 15) return;
    enemyMoveCounter = 0;
    
    let edgeReached = false;
    for (let enemy of enemies) {
        if (enemy.alive) {
            enemy.x += enemyDirection;
            if (enemy.x <= 2 || enemy.x >= WIDTH - 1) {
                edgeReached = true;
            }
        }
    }
    
    if (edgeReached) {
        enemyDirection *= -1;
        for (let enemy of enemies) {
            if (enemy.alive) {
                enemy.y++;
                if (enemy.y >= HEIGHT - 1) {
                    gameOver = true;
                }
            }
        }
    }
}

function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y--;
        if (bullets[i].y <= 1) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j].alive && 
                bullets[i].x === enemies[j].x && 
                bullets[i].y === enemies[j].y) {
                enemies[j].alive = false;
                bullets.splice(i, 1);
                score += 10;
                i--;
                break;
            }
        }
    }
}

function checkWin() {
    for (let enemy of enemies) {
        if (enemy.alive) return false;
    }
    return true;
}

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'q') {
        console.log('\nВыход из игры...');
        process.exit();
    }
    
    if (!gameOver) {
        if (key.name === 'left' || key.name === 'a') {
            playerX = Math.max(2, playerX - 1);
        }
        if (key.name === 'right' || key.name === 'd') {
            playerX = Math.min(WIDTH - 1, playerX + 1);
        }
        if (key.name === 'space') {
            bullets.push({ x: playerX, y: HEIGHT - 2 });
        }
    }
});

function gameLoop() {
    if (!gameOver) {
        moveEnemies();
        moveBullets();
        checkCollisions();
        
        if (checkWin()) {
            console.clear();
            drawGame();
            console.log('\n========== ВЫ ПОБЕДИЛИ! ==========');
            console.log('Ваш счет: ' + score);
            process.exit();
        }
    }
    
    console.clear();
    drawGame();
    
    if (gameOver) {
        console.log('\n========== GAME OVER ==========');
        console.log('Ваш счет: ' + score);
        process.exit();
    }
    
    setTimeout(gameLoop, 100);
}

console.log('========== КОСМИЧЕСКИЕ ЗАХВАТЧИКИ ==========');
console.log('Управление: A/D или стрелки, ПРОБЕЛ - стрельба, Q - выход');
console.log('Игра запускается через 2 секунды...');

setTimeout(() => {
    createEnemies();
    gameLoop();
}, 2000);