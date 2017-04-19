import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
	title: { 
		type: 'input',
		label: 'Title for Post'
	},
	categories: { 
		type: 'input',
		label: 'Enter some categories for this post'
	},
	content: {
		type: 'textarea',
		label: 'Post Contents'
	}
};

// ['title','categories','content']; 


class PostsNew extends Component {
	// PostsNew.contextTypes
	static contextTypes = {
		router: PropTypes.object
	};

	// tämän propsit ovat formin sisällön propsit
	onSubmit(props) {
		this.props.createPost(props)
			.then(() => { 
				// blogpost on tehty. Navigoi useri indexiin
				// navigoimme kutsumalla this.context.router.push sillä polulla mihin haluamme siirtyä
				this.context.router.push('/');
			});
	}

	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];

		return (
			<div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
				<label>{fieldConfig.label}</label>
				<fieldConfig.type type="text" className="form-control" {...fieldHelper} />
				<div className="text-help">
					{fieldHelper.touched ? fieldHelper.error : ''}
				</div>
			</div>
		);
	}

	render() {
		// saadaan nämä käyttöön reduxFormin ainsiosta exportissa, handleSubmit on oma Reduxformista
		//const { fields: { title, categories, content }, handleSubmit } = this.props;
		const { handleSubmit } = this.props;

		// {...title} destrukturoi objektin ja syöttii sen inputtiin
		// tämä liittyivanhaan koodiin. Nyt destructuroitu kokonaan lodashin avulla
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				{_.map(FIELDS, this.renderField.bind(this))}
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Enter a ${field}`;
		}
	});

	return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStatetoProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: _.keys(FIELDS), 
	validate
}, null, { createPost })(PostsNew);

// user types something in...record it on application state
// state === {
// 	form: {
// 		PostsNewForm: {
// 			title: '...',
// 			categories: '...',
// 			content: '...'
// 		}
// 	}
// }