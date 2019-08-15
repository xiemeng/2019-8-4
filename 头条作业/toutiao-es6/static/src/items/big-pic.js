/*
* @file 大图的组件
*
*/ 
import Component from './components'
export default class BigPic extends Component {
	constructor(props) {
		super(props)
	}
	render(){
		const data = this.props;
		
		return `<div class="bigPic">
			<h3>
			    ${data.title}
			</h3>
			<img class="imgBig" src="${data.imageList[0]}" />
		</div>`
	}
}