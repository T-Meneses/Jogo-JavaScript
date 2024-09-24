//Configuracao do jogo
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.heigth = 400;
let player = {
  x: 50,
  y: 180,
  width: 50,
  heigth: 50,
  speed: 5,
  image: new Image(),
};
let obstacles = [];
let keys = {};

//Carregar imagem do nosso jogador em (Bitmap)
player.image.src = 'player.png';
//Criar Obstaculos (Vetores)
function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i <6; i++){
        color += letters[Math.floor(Math.random() *16)];
    }
    return color;
}
//Atualizar posicao dos obstaculos
function updateObstacles(){
    for (let i = 0; i< obstacles.length; i++){
        obstacles[i].x -= obstacles[i].speed;
        if(obstacles[i].x + obstacles[i].width <0){
            obstacles.splice(i, 1);
            i--;
        }
    }
}
//Deteccao de colisao
function detectCollision(player, obstacle){
    return(
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.heigth &&
        player.y + player.heigth > obstacle.y &&
    );
    //Movimentos do jogador
    if (keys['ArrowUp'] && player.y > 0){
        player.y -= player.speed;
         
    }
    if (keys[Arrowdown] && player.y + player.heigth < canvas.height){
        player.y += player.speed;
    }

}




//Atualizar Jogo
function updateGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.image, player.x, player.y, player.width, player.heigth);
    //Desenhar Obstaculos (vetores)
    for (let i = 0, i < obstacles.length; i++){
        ctx.fillStyle = obstacles[i].color;
        ctx.fillRect = obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height;

        if(detectCollision(player, obstacles[i])){
            alert('GAME OVER');
            document.location.reload();
            break;

    }
}

window.addEventListener('keydown', (e) =>{
    keys[e.key] = true;
});
window.addEventListener('keyup',() =>{
    keys[e.key] = false;
});
setInterval(() =>{
    updateGame();
}, 1000 / 60);
setInterval(() =>{
    createObstacle();
}, 2000);
