import {Link} from "react-router-dom";
import LikeBlogButton from "./Buttons/LikeBlogButton.jsx";
import DeleteBlogButton from "./Buttons/DeleteBlogButton.jsx";

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '45vw'
  };

  const listStyle = {
    listStyleType: 'none',
    display: 'inline-block',
    alignItems: 'center',
  };

  return (
    <div className="blog-parent-div" style={blogStyle}>
        <h3 id="blog-titleauthor">
          <DeleteBlogButton style={{ display: 'inline-block' }} blog={blog}/>
          <Link
            to={`/blogs/${blog.id}`}
            style={{ display: 'inline-block', marginLeft: 20 }}>
            {blog.title} <b><u>BY</u></b> {blog.author}
          </Link>
        </h3>
          <ul style={listStyle}>
            <li style={{marginRight: 20}} id="blog-likes" className="blog-likes">
              Likes: {blog.likes}
              <LikeBlogButton blog={blog}/>
            </li>
          </ul>
    </div>
  );
};

export default Blog;