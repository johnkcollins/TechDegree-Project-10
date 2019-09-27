import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.credentials.emailAddress}:${credentials.credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {credentials: {emailAddress, password}});
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const {emailAddress} = user;
    const {password} = user;
    const {firstName} = user;
    const {lastName} = user;
    const response = await this.api('/users', 'POST', {
      emailAddress,
      password,
      firstName,
      lastName
    }, true, {credentials: {emailAddress, password}});
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async createCourse(course, {emailAddress, password, userId}) {
    const {title} = course;
    const {description} = course;
    const {estimatedTime} = course;
    const {materialsNeeded} = course;
    const response = await this.api('/courses', 'POST', {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    }, true, {credentials: {emailAddress, password}});
    if (response.status === 201) {
      return console.log('Course created');
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(course, {emailAddress, password, userId}) {
    const {title} = course;
    const {description} = course;
    const {estimatedTime} = course;
    const {materialsNeeded} = course;
    const {id} = course;
    const response = await this.api(`/courses/${id}`, 'PUT', {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      id
    }, true, {credentials: {emailAddress, password}});
    if (response.status === 204) {
      console.log(this);
      return console.log('Course updated');
    } else if (response.status === 404) {
      console.log(response);
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id, emailAddress, password, context, data) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {credentials: {emailAddress, password}});
    if (response.status === 204) {
      return console.log('Course deleted') && response;
    } else if (response.status === 403) {
      console.log(response);
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

}
