/*
* @file 多图的组件
*
*/ 
import Component from './components'
export default class SingPic extends Component {
	constructor(props) {
		super(props)
	}
	render(){
		const data = this.props;
		const imageList = data.imageList.map(imgUrl => {
			return `<img src="${imgUrl}" />`
		})
		return `<div class="item multiple-image" on:click="aa">
			 <h3>
			    ${data.title}
			</h3>
			<div class="image-list">
			    ${imageList}
			</div>
		</div>`
	}
}