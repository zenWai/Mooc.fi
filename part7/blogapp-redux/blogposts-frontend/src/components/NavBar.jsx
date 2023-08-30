import {Link} from 'react-router-dom';
import UserIsLogged from "./UserIsLogged.jsx";

const styleMarginLeft = { marginLeft: '10px' }
const Navbar = () => {
  return (
    <div>
      <nav>
        <menu style={styleMarginLeft}>
          Menu:
          <Link to="/" style={styleMarginLeft}>Blogs</Link>
          <Link to="/users" style={styleMarginLeft}>Users</Link>
        </menu>
      </nav>
      <UserIsLogged/>
    </div>
  );
};

export default Navbar;