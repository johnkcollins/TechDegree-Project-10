import React, {Component} from 'react';
import {} from "react-router-dom";

export default class Courses extends Component {

  state = {
    courses: []
  };

  render() {
    return (
        <div className="bounds">
          {async () => {
            const url = '/courses';
            const response = await this.props.context.data.api(url);
            if (response.status === 200) {
              response.json().then(data => this.setState({courses: data}))
            } else if (response.status === 500) {
              this.props.history.push('/error');
            } else {
              throw new Error();
            }
          }
          }
        </div>
    );
  }


};