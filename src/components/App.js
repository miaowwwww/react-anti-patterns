import React, {PureComponent } from 'react';

import Model from './Model.js';
import style from '../style/index.less';
export default class App extends PureComponent {
	constructor() {
		super();
		this.state = {name: 'miaowwwww'};
	}
	handleClick = () => {
		Model.show(this.state.name)
			.then(newname => {
				this.setState({name: newname});
			})
			.catch(reject => {
				console.log(reject);
			}) 
	}

	/*	// 使用import()按需加载Model
	handleClick = () => {
		import('./Model.js')
			.then(model => {
				model.default.show(this.state.name)
					.then(newname => {
						this.setState({name: newname});
					})
					.catch(reject => {
						console.log(reject);
					}) 
			})
			.catch(err => console.log('import error!!!!!!!!!'))
	}*/

	render() {
		return (
			<div className={style.bg} >
				<label>{`hellow ! my name is ' ${this.state.name} '`}</label>
				<button onClick={this.handleClick} >修改名字</button>
			</div>
		)
	}
}
