import './HeaderSignedIn.css';
import LogoIcon from '../../Assets/home-logo.svg';
import userDefaultIcon from '../../Assets/user.svg';
import { auth, db } from '../../Config/firebase';

import { BsSearch } from 'react-icons/bs';
import { ImHome } from 'react-icons/im';
import { BsFillPeopleFill } from 'react-icons/bs';
import { PiBagSimpleFill } from 'react-icons/pi';
import { IoNotificationsSharp } from 'react-icons/io5';

import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const HeaderSignedIn = ({ setAuthStatus }) => {

    const Navigate = useNavigate();
    const [user, setUser] = useState({});

    const signOutHandle = (e) => {
        signOut(auth).then((res) => {
            setAuthStatus(false);
            Navigate('/');
        });
    }
    const fetchUser = () => {
        const ref = doc(db, 'users', `${auth?.currentUser?.uid}`);
        getDoc(ref).then((res) => {
            setUser(res.data());
        })
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (

        <div className="HeaderSignedIn">
            <div className="left">
                <img src={LogoIcon} alt="" onClick={() => {
                    Navigate('/feed');
                }} />
                <div className="searchArea">
                    <BsSearch /> <input type="text" placeholder='search' />
                </div>
            </div>
            <div className="right">
                <div className="topics">
                    <div className="topic active">
                        <ImHome />
                        <span>Home</span>
                    </div>
                    <div className="topic">
                        <BsFillPeopleFill />
                        <span>Network</span>
                    </div>
                    <div className="topic">
                        <PiBagSimpleFill />
                        <span>Jobs</span>
                    </div>
                    <div className="topic">
                        <IoNotificationsSharp />
                        <span>Notification</span>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="profile">
                    <img src={user?.profile ? user.profile : userDefaultIcon} alt="profile" />
                    <div className="profileHover">
                        <ul>
                            <li className='first'>
                                <img src={user?.profile ? user.profile : userDefaultIcon} alt="" />
                                <div className="ownerInfo">
                                    <h4 className='name'> {user?.fullName ? user.fullName : (<>Mr $</>)}</h4>
                                    <h6 className="discription">{user?.discription ? (user.discription.length > 40 ? user.discription.slice(0, 40) + '...' : user.discription) : (<>Mr $'s Description</>)}</h6>
                                </div>

                            </li>
                            <li className='second' onClick={() => Navigate('/profile')}>View profile</li>
                            <li className='divider'></li>
                            <li className='third' onClick={() => signOutHandle()}><button> Sign Out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeaderSignedIn;