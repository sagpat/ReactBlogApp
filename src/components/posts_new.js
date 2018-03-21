import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

renderField(field){
  const { meta: {touched, error} } = field;

// Below is the Vanila Js code for the above "destructuring" in ES6
// var _field2 = field,
//     _field2$meta = _field2.meta,
//     touched = _field2$meta.touched,
//     error = _field2$meta.error;

const className = `form-group ${ touched && error ? ' has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          { ...field.input }
        />
        <div className="text-help">
          { touched ? error : ' ' }
        </div>
      </div>
    );
}

onSubmit(values){
  this.props.createPost(values, () => {
    this.props.history.push("/")
  });
}


render() {
  const { handleSubmit } = this.props;

  return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancle</Link>
      </form>
    );
  }
}


function validate(values) {
    const errors = {};

  // Validate the input from values.
  if(!values.title){
    errors.title = "Enter a Title";
  }
  if(!values.categories){
    errors.categories = "Enter a Category";
  }
  if(!values.content){
    errors.content = "Enter some Content.";
  }

    // If error object is empty the form is fine to submit.
    // If error has some properties, redux form assumes it contains some errors.
    return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
