1.1

function Person() {
	this.name = 1;
	return {};
}
var person = new Person();
console.log('name:', person.name);   // undefind 因为 当执行new方法时，构造函数有return会优先调用自己的retrun方法。
1.2

function Person() {
	this.name = 1;
}
Person.prototype = {
	show: function() {
		console.log('name	is:', this.name);
	}
};
var person = new Person();
person.show(); // 1,this指向的是person 而person的name 值是1
1.3

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name	is:', this.name);
	}
};
var person = new Person();
Person.prototype.show = function() {
	console.log('new	show');
};
person.show();  // new	show   改写了原型 方法
1.4

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name	is:', this.name);
	}
};
var person = new Person();
var person2 = new Person();
person.show = function() {
	console.log('new	show');
};
person2.show();  // 1 
person.show();  // new	show
2、 综合题

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name	is:', this.name);
	}
};
Person.prototype.show();  // 2 show方法的this 指向Person.prototype 而，原型的name是2
(new Person()).show();  // 1 show的this 指向构造出来的对象，根据原型链关系，name 首先指向本身的1、
