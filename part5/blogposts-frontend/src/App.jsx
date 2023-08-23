import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Notification from "./components/NotificationMessage.jsx";
import CreatePostForm from './components/CreatePostForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const createNewFormRef = useRef();
  const notificationRef = useRef();

  useEffect(() => {
    initializeUser();

    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        handleLogout();
      }
    }
    // Check the token's status every 5 minutes
    const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const initializeUser = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (!loggedInUserJSON) return;
    if (isTokenExpired()) {
      handleLogout();
      return;
    }
    const user = JSON.parse(loggedInUserJSON);
    setUser(user);
    blogService.setToken(user.token);
    fetchBlogs();
  }
  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    } catch (error) {
      notificationRef.current.toggleVisibility('Error showing Blogs', 'error');
      console.error('Error fetching blogs:', error);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
      fetchBlogs();
    } catch (exception) {
      notificationRef.current.toggleVisibility('Wrong Username or Password', 'error');
    }
  };
  const isTokenExpired = () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (!loggedInUserJSON) return true;
    const { expiration } = JSON.parse(loggedInUserJSON);
    return Date.now() >= expiration;
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    blogService.setToken(null);
    setUser(null);
  };

  const renderLoginForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification ref={notificationRef} message="Welcome" type="success"/>
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
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );

  const renderBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <Notification ref={notificationRef} message="Loaded" type="success"/>
      <p>{user.name} logged in - <button id="logout-button" onClick={handleLogout}>logout</button></p>
      <CreatePostForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        blogs={blogs}
        setBlogs={setBlogs}
        notificationRef={notificationRef}
        createNewFormRef={createNewFormRef}
      />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} notificationRef={notificationRef}/>)
      }
    </div>
  );

  return (
    user === null
      ? renderLoginForm()
      : renderBlogs()
  );
}

export default App;