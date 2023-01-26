import '../Profile/Profile.css'

function Profile() {
    if (testStr.length > 0) {
      return testStr.map((userdata) => (
        <div key={userdata.id}>{userdata.}</div>
      ));
  }
};

export default Profile;