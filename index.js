// 闭包，保证变量不污染全局
(function() {
	/*
		direction:String 方向：left|right|top|bottom
	*/
	const context = document.getElementById('myGame');
	const border = { // 找到边框
		height: context.clientHeight, // 300
		width: context.clientWidth // 500
	}
	const stepNumber = 40; // 移动步数的大小
	var heroLocation = { // 英雄的初始位置
		x: 0,
		y: 0
	}
	var resourceManager = prepare();
	resourceManager.getResource(drawImg,{x:0,y:0})
	function location(direction) {
		switch (direction) {
			case 'left': // 左
				if (heroLocation.x <= 0) return;
				heroLocation.x -= stepNumber;
				if (heroLocation.x <= 0) heroLocation.x = 0;
				break;
			case 'top': // 上
				if (heroLocation.y <= 0) return;
				heroLocation.y -= stepNumber;
				if (heroLocation.y <= 0) heroLocation.y = 0;
				break;
			case 'right': // 右
				if (heroLocation.x >= border.width) return;
				heroLocation.x += stepNumber;
				if (heroLocation.x >= border.width) heroLocation.x = border.width;
				break;
			case 'bottom': // 下
				if (heroLocation.y >= border.height) return;
				heroLocation.y = stepNumber + heroLocation.y
				if (heroLocation.y >= border.height) heroLocation.y = border.height;
				break;
			default:
				break;

		}
		console.log(heroLocation)
		resourceManager.getResource(drawImg, heroLocation)
	}
	document.onkeydown = function(event) {
		const e = event || window.event || arguments.callee.caller.arguments[0];
		switch (e.keyCode) {
			case 37: // 左
				location('left')
				break;
			case 38: // 上
				location('top')
				break;
			case 39: // 右
				location('right')
				break;
			case 40: // 下
				location('bottom')
				break;
			default:
				break;
		}
	}
	/*
		@param {Function} [callback] 准备好了，之后要调用的回调，回调接收3个参数，context，heroImg，allSpriteImg
   */
	function prepare() {
		const imgTask = (img, src) => {
			return new Promise(function(resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};
		const context = document.getElementById('myGame').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();
		const allResourTash = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg')
		]);
		return {
			getResource(callBack, heroLocation) {
				allResourTash.then(() => {
					callBack && callBack(context, heroImg, allSpriteImg, heroLocation)
				})
			}
		}
	}
	/*
		绘制图像
	*/
	function drawImg(context, heroImg, allSpriteImg, heroLocation) {
		var draw = function() {
			this.context.drawImage(
				this.img,
				this.imgPos.x,
				this.imgPos.y,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x,
				this.rect.y,
				this.rect.width,
				this.rect.height
			)
		}
		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},
			rect: {
				x: heroLocation.x,
				y: heroLocation.y,
				width: 40,
				height: 40
			},
			draw: draw
		}
		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},
			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},
			draw: draw
		}
		hero.draw();
		monster.draw();
	}
})()
