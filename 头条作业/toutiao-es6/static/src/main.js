/*
* @file 管理全局的入口文件
* @auther xiemeng
*/ 
import {request} from './request.js';
import components from './items/index.js';
class Manager {
	constructor($container) {
	    this.$container = $container
	}
	init(){
		request({
			url:'/list',
		}).then(res => {
			console.log(res)
			res.data.forEach(item => {
				const component = new components[item.type](item.data);
				const componentElement = component.constructElement();
				this.$container.appendChild(componentElement)
			})
			
			
		}).catch(error => {
			console.log(error)
		})
	}
	static getInstance($container){
		return new Manager($container)
	}
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();