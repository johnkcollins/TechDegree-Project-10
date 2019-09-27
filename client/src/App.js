import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


//Components
import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import CourseDetail from './components/CourseDetail';
import DeleteCourse from './components/DeleteCourse';
import CreateCourse from './components/CreateCourse';
import Forbidden from "./components/Forbidden";
import UpdateCourse from "./components/UpdateCourse";


//Higher order components
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

//Routes with Context added
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const ForbiddenWithContext = withContext(Forbidden);


//Route Handling
export default () => (
    <Router>
      <div>
        <HeaderWithContext/>

        <Switch>
          <Route exact path="/" component={CoursesWithContext}/>
          <Route exact path="/courses" component={CoursesWithContext}/>
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
          <PrivateRoute path="/courses/delete" component={DeleteCourseWithContext}/>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route path="/courses/:id" component={CourseDetailWithContext}/>
          <Route path="/signin" component={UserSignInWithContext}/>
          <Route path="/signup" component={UserSignUpWithContext}/>
          <Route path="/signout" component={UserSignOutWithContext}/>
          <PrivateRoute path="/authenticated" component={AuthWithContext}/>
          <Route path="/forbidden" component={ForbiddenWithContext}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
);
