import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Common/axiosInterceptor";
type ForumDeleteProps = {
  postId: number;
  onDelete: (postId: number) => void;
  onClose: () => void;
};

function ForumDelete(props: ForumDeleteProps) {
  const { postId, onDelete, onClose } = props;

  const navigate = useNavigate();
  const returnToForum = () => {
    navigate('/Forum');
  }

  const handleDelete = () => {
    axiosInstance
      .delete(`/api/post/${postId}`)
      .then(() => {
        onDelete(postId);
        returnToForum();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="forum-modal">
      <div className="forum-modal-content">
        <div className="flex flex-col my-6 mx-6 ">
          <div className="forum-delete-ask">
            Are you sure you want to delete this post?
          </div>
          <button
            className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 my-4 hover:bg-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="rounded-md bg-gray-300 border-black border-2 px-2 py-1 hover:bg-green-500"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForumDelete;
