import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CourseDetail extends Component {

  state = {
    courses: [],
    currentCourse: "",
  };

  componentDidMount() {
    this.getCourses();
  }

  render() {
    return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={this.props.match.url}>Update Course</Link>
                  <Link className="button" onClick={this.deleteCourse} to={''}>Delete Course</Link>
                </span>
                <Link className="button button-secondary" to="/courses">Return to List</Link>

              </div>
            </div>
          </div>

          {this.state.courses.map(course => {
            return (
                <div className="bounds course--detail" key={course.id}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <h3 className="course--title">{course.title}</h3>
                      <p>By {course.firstName} {course.lastName}</p>
                    </div>
                    <div className="course--description">
                      {(course.description)
                          ? course.description.split('\n')
                              .map(paragraph =>
                                  (paragraph.length > 0)
                                      ? <p key={paragraph}>{paragraph}</p>
                                      : '')
                          : ''
                      }
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list" key={course.estimatedTime}>
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <h3>{course ? course.estimatedTime || 'TBD' : ''}</h3>
                        </li>
                        <li className="course--stats--list--item" key={course.materialsNeeded}>
                          <h4>Materials Needed</h4>
                          <ul>
                            {(course.materialsNeeded)
                                ? course.materialsNeeded.split('*')
                                    .map(item =>
                                        (item.length > 0)
                                            ? <li key={item}>{item}</li>
                                            : '')
                                : <h3>TBD</h3>
                            }
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            )
          })
          }
        </div>
    );
  }

  getCourses = async () => {
    const id = (this.props.match.params.id);
    const url = `/courses/${id}`;
    const response = await this.props.context.data.api(url);
    if (response.status === 200) {
      response.json().then(data => this.setState({courses: data}))
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  };

  deleteCourse = async () => {
    //TODO: encrypt password before storing/sending
    const {id} = this.props.match.params;
    const {context} = this.props;
    const {emailAddress} = context.authenticatedUser;
    const {userPassword} = context;
    const {history} = this.props;

    let credentials = {
      emailAddress: emailAddress,
      password: userPassword,
    };
    console.log(credentials);

    const url = `/courses/${id}`;
    const response = await context.data.api(url, 'DELETE', null, true, {credentials});
    if (response.status === 204) {
      history.push('/courses');
    } else if (response.status === 403) {
      history.push('/forbidden');
    } else if (response.status === 500) {
      history.push('/error');
    } else {
      throw new Error();
    }
  }
}
