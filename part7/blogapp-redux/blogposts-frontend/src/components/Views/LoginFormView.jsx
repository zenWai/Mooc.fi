import NotificationMessage from "../NotificationMessage.jsx";
import {useEffect, useState} from "react";
import loginService from "../../services/login.js";
import {showNotificationMessage} from "../../features/notifications/notificationMessageSlice.js";
import {useDispatch} from "react-redux";

const LoginFormView = ({onLoginSuccess}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      dispatch(showNotificationMessage({ message: 'Welcome, please login!', type: 'success' }));
  }, [dispatch]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      if(onLoginSuccess) onLoginSuccess();
    } catch (exception) {
      dispatch(showNotificationMessage({ message: 'Wrong Username or Password', type: 'error' }));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default LoginFormView;