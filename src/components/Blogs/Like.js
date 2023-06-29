import React, { useEffect } from "react";
import { Tooltip } from "bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Button, ButtonToolbar } from "rsuite";

const Like = ({ blogId, likes, userId, handleLikes }) => {
  useEffect(() => {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    let tootipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id.uid === userId) ? (
        <>
          <AiFillHeart size={24}/>
          &nbsp;{likes.length} 
        </>
      ) : (
        <>
        <AiOutlineHeart size={24}/>
          &nbsp;{likes.length}
        </>
      );
    }
    return (
      <>
      <AiOutlineHeart size={24}/>
      </>
    );
  };
  return (
    <>
      <span
        onClick={!userId ? null : handleLikes}
      >
        {!userId ? (
          <Button
          className="rounded-bottom"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Please Login to like post"
          >
            <LikeStatus />
          </Button>
        ) : (
          <Button  className="rounded-bottom">
            <LikeStatus />
          </Button>
        )}
      </span>
    </>
  );
};

export default Like;
