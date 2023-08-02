import './EditProfile.css';
import { ImCross } from 'react-icons/im';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../Config/firebase';
import { useRef, useState } from 'react';

const EditProfile = ({ existingUserData, ProfileReloder }) => {

    const [isError, setIsError] = useState(false);

    const removeEditProfile = () => {
        const EditprofileElement = document.querySelector('.EditProfile');
        EditprofileElement.classList.remove('active');
    }

    const [name, setName] = useState('');
    const nameError = useRef();
    const nameChanged = (e) => {
        setName(e.target.value.trim());
        name.length > 60 ? nameError.current.innerHTML = 'Name Cann\'t be more than 60 letters' : nameError.current.innerHTML = '';
        name.length > 60 ? setIsError(true) : setIsError(false);
    }

    const [discription, setDiscription] = useState('');
    const discriptionError = useRef();
    const discriptionChanged = (e) => {
        setDiscription(e.target.value.trim());
        discription.length > 200 ? discriptionError.current.innerHTML = 'discription Cann\'t be more than 200 letters' : discriptionError.current.innerHTML = '';
        discription.length > 200 ? setIsError(true) : setIsError(false);
    }

    const [location, setLocation] = useState('');
    const locationError = useRef();
    const locationChanged = (e) => {
        setLocation(e.target.value.trim());
        location.length > 80 ? locationError.current.innerHTML = 'Location Cann\'t be more than 80 letters' : locationError.current.innerHTML = '';
        location.length > 80 ? setIsError(true) : setIsError(false);
    }

    const [about, setAbout] = useState('');
    const aboutError = useRef();
    const aboutChanged = (e) => {
        setAbout(e.target.value.trim());
        about.length > 500 ? setIsError(true) : setIsError(false);
    }





    const updateBtnHandler = () => {

        if (!isError) {


            const fullName = document.querySelector('#profileEditName');
            const discription = document.querySelector('#profileEditDiscription');
            const location = document.querySelector('#profileEditLocation');
            const about = document.querySelector('#profileEditAbout');

            if (fullName.value.trim() <= 0) {
                nameError.current.innerHTML = 'Name can\'t be Empty!';
            }
            else {
                const data = {
                    ...existingUserData,
                    fullName: fullName.value ? fullName.value : "",
                    discription: discription.value ? discription.value : "",
                    location: location.value ? location.value : "",
                    about: about.value ? about.value : "",
                }

                const ref = doc(db, 'users', `${auth?.currentUser?.uid + ''}`);
                setDoc(ref, data).then((res) => {
                    ProfileReloder();
                    removeEditProfile();
                });
            }
        }
    }

    return (
        <>
            <div className="EditProfile">
                <div className="container">
                    <ImCross onClick={() => removeEditProfile()} />
                    <div className="row">
                        <label htmlFor="profileEditName">Full Name</label>
                        <input id="profileEditName" type="text" defaultValue={existingUserData?.fullName ? existingUserData?.fullName : ""} onChange={(e) => (nameChanged(e))} />
                        <span ref={nameError}></span>
                    </div>
                    <div className="row">
                        <label htmlFor="profileEditDiscription">Discription</label>
                        <textarea id="profileEditDiscription" rows='3' defaultValue={existingUserData?.discription ? existingUserData?.discription : ""} onChange={(e) => (discriptionChanged(e))}></textarea>
                        <span ref={discriptionError}></span>
                    </div>
                    <div className="row">
                        <label htmlFor="profileEditLocation">Location</label>
                        <input id="profileEditLocation" type="text" defaultValue={existingUserData?.location ? existingUserData?.location : ""} onChange={(e) => (locationChanged(e))} />
                        <span ref={locationError}></span>
                    </div>
                    <div className="row">
                        <label htmlFor="profileEditAbout">About</label>
                        <textarea id="profileEditAbout" rows='8' defaultValue={existingUserData?.about ? existingUserData?.about : ""} onChange={(e) => (aboutChanged(e))}></textarea>
                        <span ref={aboutError}></span>
                    </div>
                    <div className="row btnRow">
                        {isError ? <button className='disabled'>Update</button> : <button onClick={() => { updateBtnHandler() }}>Update</button>}
                        
                    </div>
                </div>
            </div>
        </>
    );
}
export default EditProfile; 