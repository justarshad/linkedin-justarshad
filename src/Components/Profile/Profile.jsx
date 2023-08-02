import './Profile.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PostContainer from './PostContainer';
import ProfileUpper from './ProfileUpper';
import { auth } from '../../Config/firebase';;


const Profile = ({ ProfileId }) => {

    const Navigate = useNavigate();
    useEffect(() => {

        if (!auth?.currentUser?.uid) {
            Navigate('/');
        }
    }, []);

    return (
        <div className="Profile">
            <ProfileUpper ProfileId={ProfileId}/>
            <PostContainer ProfileId={ProfileId}/>
        </div>
    );
}
export default Profile;