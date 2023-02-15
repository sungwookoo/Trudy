import "./FollowerModal.css";
import Follower from "./Follower";

function FollowerModal({ setModalOpen, senduserID }: any) {
  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(senduserID.id);

  return (
    <div className="follow-modal-container">
      <button className="close" onClick={closeModal}>
        X
      </button>
      <Follower userId={senduserID.id} />
    </div>
  );
}
export default FollowerModal;
