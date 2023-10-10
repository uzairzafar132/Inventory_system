import React from 'react';
import UserProfileCard from '../components/Profile/ProfileCard';
import ImageUpload from '../components/Profile/UploadImage';
import LeaveForm from '../components/Profile/LeaveForm';



function Profile() {


  return (
    <div>
      
        {/* <ImageUpload/> */}
      <UserProfileCard />
      <LeaveForm/>
    </div>
  );
}

export default Profile;
