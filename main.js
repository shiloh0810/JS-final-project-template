var FPS = 60;
var clock = 0;
var hp = 100;
var con= true;
// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var slimeImg = document.createElement("img");
var daighImg = document.createElement("img");
var jasonImg = document.createElement("img");
var rukiaImg = document.createElement("img");
var buttonImg = document.createElement("img");
var defenseImg = document.createElement("img");
var crossImg = document.createElement("img");

// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
slimeImg.src = "images/slime.gif";
daighImg.src = "images/daigh.gif";
jasonImg.src = "images/jason.gif";
rukiaImg.src = "images/rukia.gif";
buttonImg.src = "images/tower-btn.png";
defenseImg.src = "images/tower.png";
crossImg.src = "images/crosshair.png";

// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");
var newX;

function draw(){
  if(con)
  {
  	console.log(con)
  	clock++;
  	if(clock%80==0)
	  {
	  	var newEnemy= new Enemy();
	  	enemies.push(newEnemy);
	  }
	  // 將背景圖片畫在 canvas 上的 (0,0) 位置
	  ctx.drawImage(bgImg,0,0);
	  for(i=0; i<enemies.length; i++)
	  {
	  	if(enemies[i].hp<=0)
	  	{
	  		enemies.splice(i, 1);
	  	}
	  	else
	  	{
	  		enemies[i].move();
	  		ctx.drawImage(pic[enemies[i].picture],enemies[i].x,enemies[i].y);
	  	}
	  }
	  ctx.drawImage(buttonImg,640-80,480-80,80,80);
	  if(isBuilding){

	  	ctx.drawImage(defenseImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32);

	  }
	  else
	  {
	  	ctx.drawImage (defenseImg, tower.x, tower.y)
	  }
	  ctx.font="24px Arial";
	  ctx.fillStyle="white";
	  ctx.fillText("HP: "+hp, 10, 40);
	  tower.searchEnemy();
	  if(tower.aimingEnemyId!=null)
	  {
	  	var id = tower.aimingEnemyId;
	  	ctx.drawImage (crossImg, enemies[id].x, enemies[id].y)
	  }
  } 
}

$("body").on("keypress", pause);
function pause(event)
{
	console.log(event.which)
	if(event.which == 112)
	{
		if(con){
			con=false;
		}
		else{
			con=true;
		}
	}
}

var enemyPath=[
	{x:80, y:0},
	{x: 80, y: 176},
	{x: 336, y: 176},
	{x: 336, y: 304},
	{x: 144, y: 304},
	{x: 144, y: 400},
	{x: 528, y: 400},
	{x: 528, y: 128},
]

var pic=[
	slimeImg,
	daighImg,
	jasonImg,
	rukiaImg,
]

function Enemy(){
	this.fast = 80+clock/20;
	this.x = 80;
	this.y = 0;
	this.speedX = 0;
	this.speedY = this.fast;
	this.pathDes = 0;
	this.picture = Math.floor((Math.random() * 4) + 0);
	this.hp=10;
	this.move = function(){
		
		if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,
				this.x, this.y, this.fast/FPS, this.fast/FPS)){
			//移動
			this.x=enemyPath[this.pathDes].x;
			this.y=enemyPath[this.pathDes].y;
			//指定
			this.pathDes++;
			if(this.pathDes==enemyPath.length)
			{
				this.hp=0;
				hp-=10;
				return;
			}
			//計算，修改
			if(enemyPath[this.pathDes].y<this.y){
				//up
				this.speedX=0;
				this.speedY= -this.fast;
			}else if(enemyPath[this.pathDes].x>this.x){
				//right
				this.speedX=this.fast;
				this.speedY=0;
			}else if(enemyPath[this.pathDes].y>this.y){
				//down
				this.speedX=0;
				this.speedY=this.fast;
			}else{
				//left
				this.speedX=-this.fast;
				this.speedY=0;
			}
		}else{
			this.x += this.speedX/FPS;
			this.y += this.speedY/FPS;
		}
	}
}

var enemies = [];

var cursor = {
	x: 0,
	y : 0,
}
var tower = {
	x: 0,
	y: 0,
	range: 96,
	aimingEnemyId: null,
	
	searchEnemy: function(){
	for(var i=0; i<enemies.length; i++){
		var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
		if (distance<=this.range) {
			this.aimingEnemyId = i;
			return;
		}
	}
	// 如果都沒找到，會進到這行，清除鎖定的目標
	this.aimingEnemyId = null;
	}
	
}

$("#game-canvas").on("mousemove", mousemove);
$("#game-canvas").on("click", click);
var isBuilding = false;

function click(){
	if (cursor.x >= (640-80) && cursor.y >= (480-80)){
		isBuilding = true;
	}else{
		//蓋塔
		if(isBuilding)
		{
			tower.x = cursor.x-cursor.x%32;
			tower.y = cursor.y-cursor.y%32;
		}
		isBuilding = false; //建造完成
	}
}

function mousemove(event){
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
}

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight){
	if(targetX<=pointX && pointX<=targetX+targetWidth 
		&& targetY<=pointY && pointY<=targetY+targetHeight){
		return true;
	}else{
		return false;
	}
}
// 執行 draw 函式
setInterval(draw, 1000/FPS);