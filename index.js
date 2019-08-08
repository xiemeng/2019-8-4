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
	const monsterLocation1 = {  // 魔王1的位置
		x:100,
		y:100
	}
	const monsterLocation2 = {  // 魔王2的位置
		x:200,
		y:200
	}
	let hero,moshen,moshenz;// 英雄
	var resourceManager = prepare();  // 绘制
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
		// 进行碰撞检查，检查到碰撞就进行攻击
		console.log(heroLocation)
		if(Math.abs(monsterLocation1.x-heroLocation.x) <=40 && Math.abs(monsterLocation1.y-heroLocation.y) <=40){
			hero.attack(moshen)
		}
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
		function Person(img,context,imgPos,rect,name){  // 超类，所有的人物对象
			this.name = name;
			this.img = img;  // 人物图片
			this.context = context;  // 绘制的context对象
			this.imgPos = {  //人物的位置和宽高
				x: imgPos.x, // 858
				y: imgPos.y,  // 529
				width: 32,
				height: 32
			}
			this.rect = {  // 绘制的位置
				x: rect.x,
				y: rect.y,
				width: 40,
				height: 40
			}
		}
		Person.prototype.draw = function(){  // 绘制方法
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
		function Hero(img,context,imgPos,rect,name){ // 英雄类
			Person.call(this,img,context,imgPos,rect,name)
		}
		Hero.prototype = Object.create(Person.prototype);
		Hero.prototype.attack = function(monsterObj){  // 攻击方法
			alert(`${this.name}攻击了${monsterObj.name}`)
		}
		
		function Monster(img,context,imgPos,rect,name){ // 魔王类
			Person.call(this,img,context,imgPos,rect,name)
		}
		Monster.prototype = Object.create(Person.prototype);
		
		hero = new Hero(heroImg,context,{x:0,y:0},heroLocation,'高达');// 创建一个英雄
		moshen = new Hero(allSpriteImg,context,{x:858,y:529},{x:monsterLocation1.x,y:monsterLocation1.y},'魔神');// 创建一个魔王
		moshenz = new Hero(allSpriteImg,context,{x:858,y:495},{x:monsterLocation2.x,y:monsterLocation2.y},'魔神z');// 创建一个魔王
		hero.draw();
		moshen.draw();
		moshenz.draw();
	}
})()
