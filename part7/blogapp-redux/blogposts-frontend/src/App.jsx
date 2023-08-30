import {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "./features/user/userSlice.js";
import authHelper from "./helpers/authHelpers.js";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import UsersView from "./components/Views/UsersView.jsx";
import BlogsView from "./components/Views/BlogsView.jsx";
import LoginFormView from "./components/Views/LoginFormView.jsx";
import UserDetailsView from "./components/Views/UserDetailsView.jsx";
import BlogDetailsView from "./components/Views/BlogDetailsView.jsx";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    authHelper.initializeUser(dispatch).finally(() => {setIsLoading(false)});
    const checkTokenExpiration = () => {
      if (authHelper.isTokenExpired()) {
        handleLogout();
      }
    };
    // Check the token's status every 5 minutes
    const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const onLoginSuccess = () => {
    authHelper.initializeUser(dispatch).finally(() => {setIsLoading(false)});
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const renderLoginForm = () => (
    <LoginFormView onLoginSuccess={onLoginSuccess}/>
  );

  const renderBlogsApp = () => (
    <>
      <Navbar/>
      <Routes>
        <Route path="/users/:userID" element={<UserDetailsView/>}/>
        <Route path="/blogs/:blogID" element={<BlogDetailsView/>}/>
        <Route path="/users" element={<UsersView/>}/>
        <Route path="/" element={<BlogsView/>}/>
      </Routes>
    </>
  );

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return user === null ? renderLoginForm() : renderBlogsApp();
};

export default App;
