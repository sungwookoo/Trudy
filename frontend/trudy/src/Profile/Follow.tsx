import React, { useState } from "react";

interface Props {
  userId: string;
}

const FollowButton: React.FC<Props> = ({ userId }) => {
  const [following, setFollowing] = useState(false);

  const handleClick = () => {
    setFollowing(!following);
  };

  return <button onClick={handleClick}>{following ? "Unfollow" : "Follow"}</button>;
};

export default FollowButton;
