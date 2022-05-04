import "../CSS/Blog.css";
import { BiRefresh, BiSearchAlt2 } from "react-icons/bi";
import React, { useState, useEffect, useRef } from "react";

const Blogs = ({ changeDisplay }) => {
  const [blogList, setBlogList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const searchInputRef = useRef();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8080/blogs");
      const data = await response.json();
      setBlogList(data);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(false);
      setFailed(true);
    }
  };

  const fetchBlogsByTitle = async (e, title) => {
    e.preventDefault();

    if (title === "") {
      return 0;
    } else {
      try {
        const response = await fetch(`http://localhost:8080/blogs/${title}`);
        const data = await response.json();
        setBlogList(data);
        setIsLoaded(true);
        searchInputRef.current.value = "";
      } catch (err) {
        setIsLoaded(false);
        searchInputRef.current.value = "";
      }
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchBlogs();
    } catch (err) {
      alert("Unable to delete your blog. Something went wrong!");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogs = blogList.map((blog, idx) => {
    if (idx == blogList.length - 1) {
      return (
        <>
          <div className="post" key={blog._id}>
            <div className="tr">
              <button
                className="del-button"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this post?")
                  ) {
                    deleteBlog(blog._id);
                  }
                }}
              >
                X
              </button>
            </div>
            <div className="post-title">{blog.title}</div>
            <div className="post-author">{blog.author}</div>
            <div className="post-date">{blog.date}</div>
            <div className="post-content">{blog.content}</div>
            <div className="seperator"></div>
          </div>
          <div className="end-cont">
            <h1 className="end">End of Posts</h1>
          </div>
        </>
      );
    } else {
      return (
        <div className="post" key={blog._id}>
          <div className="tr">
            <button
              className="del-button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this post?")
                ) {
                  deleteBlog(blog._id);
                }
              }}
            >
              X
            </button>
          </div>
          <div className="post-title">{blog.title}</div>
          <div className="post-author">{blog.author}</div>
          <div className="post-date">{blog.date}</div>
          <div className="post-content">{blog.content}</div>
          <div className="seperator"></div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="switch">
        <div className="cont">
          <button
            className="bb"
            onClick={() => {
              changeDisplay("landing");
            }}
          >
            Home
          </button>
          <button
            className="bb"
            onClick={() => {
              changeDisplay("add");
            }}
          >
            Write A Post
          </button>
        </div>
      </div>
      <div className="all">
        <div className="blog-title">Showing All Posts</div>
        <div className="search-box">
          <input
            className="search-field"
            placeholder="Search by Title"
            ref={searchInputRef}
          />
          <button
            className="mag"
            onClick={(e) => {
              fetchBlogsByTitle(e, searchInputRef.current.value.trim());
            }}
          >
            <BiSearchAlt2 className="ico" />
          </button>
          <button
            className="mag"
            onClick={() => {
              fetchBlogs();
            }}
          >
            <BiRefresh className="ico" />
          </button>
        </div>

        {blogs.length && isLoaded ? (
          blogs
        ) : !blogs.length && isLoaded ? (
          <div className="no-blogs">
            <h2>There are currently no blog posts to show!</h2>
            <h4>Check back later or add a post of your own!</h4>
          </div>
        ) : failed ? (
          <div className="loading-blogs">
            <h2>Error Loading Blogs</h2>
            <h4>Our servers must be down. Plase check back later!</h4>
          </div>
        ) : (
          <div className="loading-blogs">
            <h2>Loading Blogs...</h2>
            <h4>Just one moment!</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
