import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignIn from './Components/SignIn/SignIn';
import Home from './Components/Home/Home'
import ParentDashboard from './Components/Dashboard/ParentDashboard';
import TeacherDashboard from './Components/Dashboard/TeacherDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import Role from './Components/Role/Role';
import SignUp from './Components/SignUp/SignUp';
import TeacherSignUp from './Components/SignUp/TeacherSignUp';
import ParentComponent from './Components/AdminCRUD/ParentComponent';
import TeacherCrud from './Components/AdminCRUD/TeacherComponent';
import StudentCrud from './Components/AdminCRUD/StudentCrud';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import TeacherQuery from './Components/Query/TeacherQuery';
import AnnouncementCrudOld from './Components/Dashboard/AnnouncementOld';
import RecycleTeacherCrud from './Components/AdminCRUD/RecycleTeacher';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={App}>

        
        <Route path='/' Component={Home}></Route>
        <Route path="/signin" Component={SignIn}></Route>
        <Route path="/dashboardParent" Component={ParentDashboard}></Route>
        <Route path="/dashboardTeacher" Component={TeacherDashboard}></Route>
        <Route path="/dashboardAdmin" Component={AdminDashboard}></Route>
        <Route path="/role" Component={Role}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/teacherSignUp" Component={TeacherSignUp}></Route>
        {/* <Route path="/announcementCrud" Component={AnnouncementCrud}></Route> */}

        <Route path="/parent" Component={ParentComponent}></Route>
        <Route path="/teacher" Component={TeacherCrud}></Route>
        <Route path="/student" Component={StudentCrud}></Route>
        <Route path="/announcement" Component={AnnouncementCrudOld}></Route>

        <Route path="/teacherQuery" Component={TeacherQuery}></Route>

        <Route path='/recycleTeacher' Component={RecycleTeacherCrud}></Route>

        <Route path='*' Component={ErrorPage}></Route>

        <Route path='/error' Component={ErrorPage}></Route>


        </Route>
      </Routes>
    </BrowserRouter>  
    <ToastContainer theme="colored"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
