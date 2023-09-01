import {Link} from "react-router-dom";

const navBar = () => {
  return (
    <div>
      <nav style={{ padding: 24 }}>
        <Link to="/" style={{ marginRight: 20 }}>Authors</Link>
        <Link to="/books" style={{ marginRight: 20 }}>Books</Link>
        <Link to="/newbook" style={{ marginRight: 20 }}>Add Book</Link>
      </nav>
    </div>
  )
}

export default navBar;