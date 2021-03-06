import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import style from './Model.less';

export default class Model extends PureComponent {
	constructor(props) {
		super(props);
		// 使用this.props初始化this.state也是反模式的一种
		this.state = {name: this.props.name};

		this._reject = null;
		this._resolve = null;
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
		this._container = null;
	}

	static show = (name) => {
		// 显示组件
		let div = document.createElement('div');
			// _model 就是当前的 Model的一个实例
		let _model = ReactDOM.render(<Model name={name} />, div);
		document.querySelector('body').appendChild(div);
		
		_model._container = div; //在_model实例中保存div的引用，销毁要用
		// 返回一个promise
		return _model._promise;
	}

	// 销毁 1.销毁react组件 2.销毁 div 元素
	_removeModel = () => {
		this._container.remove();
		ReactDOM.unmountComponentAtNode(this._container);
	}

	handleChange = (e) => {
		this.setState({name: e.target.value});
	}

	handleClickSave = () => {
		this._resolve(this.state.name);
		this._removeModel();
	}

	handleClickCancel = () => {
		this._reject(`cancen update name`);
		this._removeModel();
	}

	render() {
		return (
			<section className={style.model}>
				<div className={style.content}>
					<h1>请输入新名字</h1>
					<input type="text" 
								value={this.state.name} 
								onChange={this.handleChange} />
					<div>
						<a onClick={this.handleClickCancel} >取消</a>
						<a onClick={this.handleClickSave} >保存</a>
					</div>
				</div>
			</section>
		)
	}
}
Model.PropTypes = {
	name: PropTypes.string.isRequired
}