import "../CSS/AddBlog.css";
import Post from "../Classes/post";
import React, { useRef } from "react";

const AddBlog = ({ changeDisplay }) => {
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const contentInputRef = useRef();

  const postBlog = async (e) => {
    e.preventDefault();
    const post = new Post(
      titleInputRef.current.value.trim(),
      authorInputRef.current.value.trim(),
      contentInputRef.current.value.trim()
    );
    if (post.title === "" || post.author === "" || post.content === "") {
      alert(
        "You have missing fields in your form! Please fill out all fields."
      );
      return 0;
    } else {
      const data = {
        title: post.title,
        author: post.author,
        content: post.content,
      };

      try {
        const response = await fetch("http://localhost:8080/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        alert("Your blog has been added!");
      } catch (err) {
        alert("Unable to add your blog. Something went wrong!");
      }

      titleInputRef.current.value = "";
      authorInputRef.current.value = "";
      contentInputRef.current.value = "";
    }
  };

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
              changeDisplay("blogs");
            }}
          >
            View Blog Posts
          </button>
        </div>
      </div>
      <div className="all-input">
        <div className="blog-title">Write A Blog Post</div>

        <div className="post-input">
          <h3 className="inst">Input the contents of your blog below</h3>
          <form
            onSubmit={(e) => {
              postBlog(e);
            }}
          >
            <input type="text" placeholder="Blog Title" ref={titleInputRef} />
            <input type="text" placeholder="Your Name" ref={authorInputRef} />
            <textarea
              type="text"
              placeholder="Write your blog here"
              ref={contentInputRef}
            />
            <input type="submit" value="Post Blog" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
