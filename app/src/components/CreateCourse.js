import React, {Component} from 'react';
import {} from "react-router-dom";
import Form from "./Form";

export default class Courses extends Component {

  state = {
    errors: [],
    courseTitle: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  };

  render() {
    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const {authenticatedUser} = this.props.context;

    return (

        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div>
              {errors.length > 0
                  ? <h2 className="validation--errors--label">Validation Errors</h2> : ''}
              <p>
                {errors.length > 0
                    ? errors.map(error => <ul key={error}>error</ul>) : ''}
              </p>
            </div>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                    <div>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <React.Fragment>
                            <input id="courseTitle"
                                   name="courseTitle"
                                   type="text"
                                   className="input-title course--title--input"
                                   placeholder="Course title..."
                                   value={courseTitle}
                                   onChange={this.change}/>
                          </React.Fragment>
                          <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                          <div className="course--description">
                            <React.Fragment>
                          <textarea id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.change}/>
                            </React.Fragment>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="grid-25 grid-right">
                          <div className="course--stats">
                            <ul className="course--stats--list">
                              <li key="Estimated Time">
                                <h4>Estimated Time</h4>
                                <div>
                                  <React.Fragment>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        placeholder="Hours"
                                        value={estimatedTime}
                                        onChange={this.change}/>
                                  </React.Fragment>
                                </div>
                              </li>
                              <li key="Materials">
                                <h4>Materials Needed</h4>
                                <div>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        placeholder="List materials..."
                                        value={materialsNeeded}
                                        onChange={this.change}
                                    />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="grid-100 pad-bottom">
                        <button className="button" type="button" onSubmit={this.submit}></button>
                        <button className="button button-secondary" type="button"
                                onClick='event.preventDefault(); location.href="/"'>Cancel
                        </button>
                      </div>
                    </div>
                )}/>

          </div>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = (e) => {
    const {context} = this.props;

    const {
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    const course = {
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    };

    if (errors.length < 1) {
      context.data.createCourse(course)
          .then(errors => {
            if (errors.length) {
              this.setState({errors})
            } else {
              context.actions.createCourse(course)
                  .then(this.props.history.push('/courses'));
            }
          })
          .catch(err => {
            console.log(err);
            this.props.history.push('/error');
          });
    } else {
      e.preventDefault();
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };

};