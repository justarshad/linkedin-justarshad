import './ProfileUpper.css';
import EditProfile from './EditProfile/EditProfile';
import background from '../../../Assets/card-bg.svg'
import profileIcon from '../../../Assets/user.svg'

import { BiEditAlt } from 'react-icons/bi';

import { db, auth, storage } from '../../../Config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

const ProfileUpper = ({ ProfileId }) => {

    const bgLoaderRef = useRef();
    const BgImgRef = useRef();
    const profileIconLoader = useRef();
    const profileIconRef = useRef();
    
    const [user, setUser] = useState({});
    const [userLoading, setUserLoading] = useState(true);

    const fetchUser = () => {

        setUserLoading(true);
        if (ProfileId) {
            const ref = doc(db, 'users', ProfileId);
            getDoc(ref).then(res => {
                setUser(res.data());
                setUserLoading(false);
            });
        }
        else if (auth?.currentUser?.uid) {
            const ref = doc(db, 'users', auth?.currentUser?.uid);
            getDoc(ref).then(res => {
                setUser(res.data());
                setUserLoading(false);
            });
        }
    }

    const bgImgchangeHandle = (e) => {

        if (e.target.files.length > 0) {

            bgLoaderRef.current.style.display = 'block';
            BgImgRef.current.style.display = 'none';

            const fileRef = ref(storage, `usersBackground/${auth?.currentUser?.uid + ''}`);
            uploadBytes(fileRef, e.target.files[0]).then(res => {

                getDownloadURL(res.ref).then(res => {

                    bgLoaderRef.current.style.display = 'none';
                    BgImgRef.current.style.display = 'block';
                    const bg = document.querySelector('.Profile .main .background');
                    bg.src = res;

                    const userDocRef = doc(db, 'users', `${auth?.currentUser?.uid + ''}`);
                    updateDoc(userDocRef, { background: res });
                });
            });
        }
    }

    const profileImgchangeHandle = (e) => {

        if (e.target.files.length > 0) {

            profileIconLoader.current.style.display = 'block';
            profileIconRef.current.style.display = 'none';

            const fileRef = ref(storage, `usersProfiles/${auth?.currentUser?.uid + ''}`);
            uploadBytes(fileRef, e.target.files[0]).then((res) => {

                getDownloadURL(res.ref).then((url) => {

                    profileIconLoader.current.style.display = 'none';
                    profileIconRef.current.style.display = 'block';
                    document.querySelector('.Profile .main .profileData label img').src = url;

                    const userDocRef = doc(db, 'users', `${auth?.currentUser?.uid + ''}`);
                    updateDoc(userDocRef, { profile: url });
                })
            })
        }
    }

    const addEditProfile = () => {
        const EditprofileElement = document.querySelector('.EditProfile');
        EditprofileElement.classList.add('active');
    }

    const ProfileReloder = () => {
        fetchUser();
    }
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <>
            {ProfileId ? (<></>) : (<EditProfile existingUserData={user} ProfileReloder={ProfileReloder} />)}

            {userLoading ?
                (<>
                    <div className="main loading">
                        <div className="background skeleton"></div>
                        <div className="profileData">

                            <div className="profileIcon skeleton">
                            </div>
                            <div className="name skeleton">
                            </div>
                            <h6 className='discription skeleton'></h6>
                            <span className='location skeleton'></span>
                            <span className='connections skeleton'></span>
                        </div>
                    </div>
                    <div className="about">
                        <div className="title">
                            <h2 className='skeleton'></h2>
                        </div>
                        <div className="text">
                            <span className='skeleton'></span>
                            <span className='skeleton'></span>
                            <span className='skeleton'></span>
                            <span className='skeleton'></span>
                            <span className='skeleton'></span>
                        </div>
                    </div>

                </>)
                :
                (<>
                    <div className="main">

                        {ProfileId ? (<></>) : (<>
                            <label htmlFor='bgEditBtn' className="bgEditBtn" >
                                <BiEditAlt />
                            </label>
                            <input type="file" accept="image/jpeg, image/png, image/jpg" id="bgEditBtn" onChange={(e) => bgImgchangeHandle(e)} />
                        </>)}
                        <img ref={BgImgRef} className="background" src={user?.background ? user?.background : background} alt="" />
                        <div ref={bgLoaderRef} className="backgroundLoader skeleton"></div>

                        <div className="profileData">

                            <div ref={profileIconRef} className="profileIcon">
                                <label htmlFor='profileChangIcon' ><img src={user?.profile ? user?.profile : profileIcon} alt="" /></label>
                                {ProfileId ? (<span id="profileChangIcon"></span>) : (<><input id="profileChangIcon" type="file" accept="image/jpeg, image/png, image/jpg" onChange={(e) => { profileImgchangeHandle(e) }} /></>)}
                            </div>
                            <div ref={profileIconLoader} className="profileIconLoader skeleton"></div>

                            <div className="name">
                                <h4 >{user?.fullName}</h4>

                                {ProfileId ? (<></>) : (<>
                                    <span onClick={() => addEditProfile()}>
                                        < BiEditAlt />
                                    </span>
                                </>)}

                            </div>
                            <h6 className='discription'>{user?.discription}</h6>
                            <span className='location'>{user?.location}</span>
                            <span className='connections'>{user?.connections} connections</span>
                        </div>
                    </div>
                    <div className="about">
                        <div className="title">
                            <h2 >About</h2>
                            {ProfileId ? (<></>) : (<>
                                <span onClick={() => addEditProfile()}>
                                    < BiEditAlt />
                                </span>
                            </>)}
                        </div>
                        <p>{user?.about}</p>
                    </div>
                </>)}
        </>
    );
}

export default ProfileUpper;



