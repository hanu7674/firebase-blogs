import React, { useState } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "./utility";
import {FaEdit, FaTrash} from 'react-icons/fa';
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Button } from "baseui/button";
import { deleteBlog } from "../../redux/ActionCreators";
const BlogSection = ({
  id,
  title,
  content,
  category,
  imgUrl,
  postedBy,
}) => {
  const user = useSelector((state) => state.authState.user);
  const blogContent = parse(content);
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBlog(id))
  }
  return (
    <div data-aos="fade-up">
      <Modal show={showDeleteModal} backdrop="static" keyboard="false" animation={true} autoFocus ={true}
              data-aos="fade-up" centered
              >
          <Modal.Header closeButton onHide={() => setShowDeleteModal(false)}>
            Are you sure want to delete this blog
          </Modal.Header>
          <Modal.Body>
            body
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button kind="secondary" className="mr-2" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button kind="secondary" onClick={handleDelete}>Confirm</Button>
          </div></Modal.Footer>
        </Modal>
      <div className="row p-3 m-3 blog-section" style={{borderBottom: "1px solid #777"}} key={id} >
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2  text-capitalize">
            {title ? <>{excerpt(title, 65)}</> : null}
            </span>
            <span className="meta-info">
              <p className="author">{postedBy?.firstName +" " +postedBy?.lastName}</p> -&nbsp;
              {postedBy?.timestamp?.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
          {content ? <>{excerpt(blogContent, 100)}</> : null}
          </div>
          <Link to={`/blog/view/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {((user?.id && postedBy?.uid === user?.id) || (user?.roles?.["ADMIN"])) && (
            <div style={{ float: "right" }}>
              
              <FaTrash
                name="trash"
                className="fa-trash"
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => setShowDeleteModal(true)}
              />
              <Link to={`/blogs/edit/${id}`}>
                <FaEdit
                className="fa-edit"
                name="edit"
                size={15}
                style={{ margin: "10px", cursor: "pointer" }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
