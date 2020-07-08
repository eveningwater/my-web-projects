/**
 * Created by admin on 2017/3/21.
 */
function chessGame() {
	this.chessBoard = [];
	this.over = false;
	// 落子
	this.chessSon = true;
	// 赢法数组，为一个三维数组
	this.wins = [];
	// 赢法统计数组
	this.computerWins = [];//AI方
	this.myWins = [];//我方
	// 赢法种类，初始值为0
	this.count = 0;
	this.popBox = document.getElementsByClassName("popBox")[0];
	this.popBoxContent = this.popBox.getElementsByTagName("h1")[0];
	this.sure = this.popBox.getElementsByTagName("button")[0];
	this.cancel = this.popBox.getElementsByTagName("button")[1];
	this.chess = document.getElementById("chess");
	this.ctx = this.chess.getContext("2d");
	this.ctx.strokeStyle = "#656363";
	this.init();
}
chessGame.prototype.init = function () {
	this.resetComputeWins();
	this.resetWinTypes();
	this.drawBackground();
	this.bindEvent();
}
chessGame.prototype.drawBackground = function () {
	let _self = this;
	let img = new Image();
	img.src = 'img/bg.jpg';
	//画水印
	img.onload = function () {
		_self.ctx.drawImage(img, 0, 0, 450, 450);
		_self.drawLine();
	}
}
// 画棋盘
chessGame.prototype.drawLine = function () {
	for (var i = 0; i < 15; i++) {
		this.ctx.moveTo(15 + i * 30, 15);
		this.ctx.lineTo(15 + i * 30, 435);
		this.ctx.stroke();
		this.ctx.moveTo(15, 15 + i * 30);
		this.ctx.lineTo(435, 15 + i * 30);
		this.ctx.stroke();
	}
}
// 画棋子
chessGame.prototype.drawChess = function (i, j, chessSon) {
	this.ctx.beginPath();
	this.ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	this.ctx.closePath();
	var gradient = this.ctx.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (chessSon) {
		gradient.addColorStop(0, "#0d0202");
		gradient.addColorStop(1, "#6d6b6b");
	} else {
		gradient.addColorStop(0, "#ffffff");
		gradient.addColorStop(1, "#ddd7d7");
	}
	this.ctx.fillStyle = gradient;
	this.ctx.fill();
}
chessGame.prototype.bindEvent = function () {
	//落子事件
	this.chess.onclick =  (e) => {
		if (this.over || !this.chessSon) {return false;}
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x / 30);
		var j = Math.floor(y / 30);
		if (this.chessBoard[i][j] == 0) {
			this.drawChess(i, j, this.chessSon);
			this.chessBoard[i][j] = 1;
			for (var k = 0; k < this.count; k++) {
				if (this.wins[i][j][k]) {
					this.myWins[k]++;
					this.computerWins[k] = 6;
					if (this.myWins[k] == 5) {
						this.createPopBox("恭喜你赢了!");
						this.over = true;
					}
				}
			}
			if (!this.over) {
				this.chessSon = !this.chessSon;
				this.computerAI();
			}
		}
	}
}
chessGame.prototype.computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (this.chessBoard[i][j] == 0) {
				for (var k = 0; k < this.count; k++) {
					if (this.wins[i][j][k]) {
						if (this.myWins[k] == 1) {
							myScore[i][j] += 200;
						} else if (this.myWins[k] == 2) {
							myScore[i][j] += 400;
						} else if (this.myWins[k] == 3) {
							myScore[i][j] += 2000;
						} else if (this.myWins[k] == 4) {
							myScore[i][j] += 10000;
						}
						if (this.computerWins[k] == 1) {
							computerScore[i][j] += 220;
						} else if (this.computerWins[k] == 2) {
							computerScore[i][j] += 420;
						} else if (this.computerWins[k] == 3) {
							computerScore[i][j] += 2100;
						} else if (this.computerWins[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore[i][j] == max) {
					if (myScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if (computerScore[i][j] == max) {
					if (computerScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	this.drawChess(u, v, false);
	this.chessBoard[u][v] = 2;
	for (var k = 0; k < this.count; k++) {
		if (this.wins[u][v][k]) {
			this.computerWins[k]++;
			this.myWins[k] = 6;
			if (this.computerWins[k] == 5) {
				this.createPopBox("对不起你输了!");
				this.over = true;
			}
		}
	}
	if (!this.over) {
		this.chessSon = !this.chessSon;
	}
}
chessGame.prototype.resetWinTypes = function () {
	//横线赢法
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				this.wins[i][j + k][this.count] = true;
			}
			this.count++;
		}
	}
	//竖线赢法
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				this.wins[j + k][i][this.count] = true;
			}
			this.count++;
		}
	}
	//斜线赢法
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				this.wins[i + k][j + k][this.count] = true;
			}
			this.count++;
		}
	}
	//反斜线赢法
	for (var i = 0; i < 11; i++) {
		for (var j = 14; j > 3; j--) {
			for (var k = 0; k < 5; k++) {
				this.wins[i + k][j - k][this.count] = true;
			}
			this.count++;
		}
	}
	for (var i = 0; i < this.count; i++) {
		this.myWins[i] = 0;
		this.computerWins[i] = 0;
	}
	for (var i = 0; i < 15; i++) {
		this.chessBoard[i] = [];
		for (var j = 0; j < 15; j++) {
			this.chessBoard[i][j] = 0;
		}
	}
}
chessGame.prototype.resetComputeWins = function () {
	for (let i = 0; i < 15; i++) {
		this.wins[i] = [];
		for (let j = 0; j < 15; j++) {
			this.wins[i][j] = [];
		}
	}
}
chessGame.prototype.createPopBox = function (text) {
	let popBox = this.popBox;
	popBox.classList.add("popBoxAnimate");
	popBox.style.display = "block";
	this.popBoxContent.textContent = text;
	if (popBox.style.display === "block") {
		this.sure.onclick = function () {
			closePopBox(popBox);
		}
		this.cancel.onclick = function () {
			closePopBox(popBox);
		}
	}
	function closePopBox(popBox) {
		popBox.classList.remove("popBoxAnimate");
		popBox.style.display = "none";
		window.location.reload(true);
	}
}
