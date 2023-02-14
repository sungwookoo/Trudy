import "./ForumDeleteModal.css";
import ForumDelete from "./ForumDelete";

type ForumDeleteModalProps = {
  postId: number;
  onDelete: (postId: number) => void;
  onClose: () => void;
};

function FollowerModal({ postId, onDelete, onClose }: ForumDeleteModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="forum-modal-container">
      {/* <button className="close" onClick={handleClose}>
        X
      </button> */}
      <ForumDelete postId={postId} onDelete={onDelete} onClose={onClose} />
    </div>
  );
}
export default FollowerModal;
