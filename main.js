// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");

// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";

// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
  ctx.drawImage(bgImg,0,0);
}

// 執行 draw 函式
setTimeout(draw, 1000);
var bgImg2 = document.createElement("img");
bgImg2.src = "images/rukia.gif";
function draw2(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
  ctx.drawImage(bgImg2,0,0);
}
setTimeout(draw2, 1000);