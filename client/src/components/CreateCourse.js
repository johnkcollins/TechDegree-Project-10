import React, {Component} from 'react';
import {} from "react-router-dom";
import Form from "./Form";

export default class Courses extends Component {

  state = {
    errors: [],
    courseTitle: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    credentials: '',
  };

  render() {
    const {context} = this.props;
    const {authenticatedUser} = context;

    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    return (

        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
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

  submit = () => {
    const {context} = this.props;
    const {authenticatedUser} = context;
    const {emailAddress} = authenticatedUser;
    const password = context.userPassword;
    const userId = this.props.context.authenticatedUser.id;

    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,

    } = this.state;

    const course = {
      title: courseTitle,
      description: description,
      estimatedTime,
      materialsNeeded,
      errors
    };

    const response = context.data.createCourse(course, {emailAddress, password, userId});
    if (response)
      response.then(data =>
          this.setState({
            errors: data
          })
      );
  };

  cancel = () => {
    this.props.history.push('/');
  };

};