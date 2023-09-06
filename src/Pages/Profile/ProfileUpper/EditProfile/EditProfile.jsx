import './EditProfile.css';
import { ImCross } from 'react-icons/im';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../Config/firebase';
import { useReducer, useRef } from 'react';

const EditProfile = ({ existingUserData, ProfileReloder }) => {
    const componentRef = useRef();

    const nameError = useRef();
    const discriptionError = useRef();
    const locationError = useRef();
    const aboutError = useRef();

    const initialState = {
        isError: false,
        name: '',
        discription: '',
        location: '',
        about: ''
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ISERROR':
                return { ...state, isError: action.payload };
            case 'NAME':
                return { ...state, name: action.payload };
            case 'DISCRIPTION':
                return { ...state, discription: action.payload };
            case 'LOCATION':
                return { ...state, location: action.payload };
            case 'ABOUT':
                return { ...state, about: action.payload };
            case 'RESET':
                return { ...initialState };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const removeEditProfile = () => {
        componentRef.current.classList.remove('active');
    }

    const nameChanged = (e) => {
        dispatch({ type: 'NAME', payload: e.target.value.trim() });
        state.name.length > 60 ? nameError.current.innerHTML = 'Name Cann\'t be more than 60 letters' : nameError.current.innerHTML = '';
        state.name.length > 60 ? dispatch({ type: 'ISERROR', payload: true }) : dispatch({ type: 'ISERROR', payload: false });
    }

    const discriptionChanged = (e) => {
        dispatch({ type: 'DISCRIPTION', payload: e.target.value.trim() });
        state.discription.length > 200 ? discriptionError.current.innerHTML = 'discription Cann\'t be more than 200 letters' : discriptionError.current.innerHTML = '';
        state.discription.length > 200 ? dispatch({ type: 'ISERROR', payload: true }) : dispatch({ type: 'ISERROR', payload: false });
    }

    const locationChanged = (e) => {
        dispatch({ type: 'LOCATION', payload: e.target.value.trim() });
        state.location.length > 80 ? locationError.current.innerHTML = 'Location Cann\'t be more than 80 letters' : locationError.current.innerHTML = '';
        state.location.length > 80 ? dispatch({ type: 'ISERROR', payload: true }) : dispatch({ type: 'ISERROR', payload: false });
    }

    const aboutChanged = (e) => {
        dispatch({ type: 'ABOUT', payload: e.target.value.trim() });
        state.about.length > 500 ? dispatch({ type: 'ISERROR', payload: true }) : dispatch({ type: 'ISERROR', payload: false });
    }



    const updateBtnHandler = () => {

        if (!state.isError) {


            const fullName = componentRef.current.querySelector('#profileEditName');
            const discription = componentRef.current.querySelector('#profileEditDiscription');
            const location = componentRef.current.querySelector('#profileEditLocation');
            const about = componentRef.current.querySelector('#profileEditAbout');

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
            <div className="EditProfile" ref={componentRef}>
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
                        {state.isError ? <button className='disabled'>Update</button> : <button onClick={() => { updateBtnHandler() }}>Update</button>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default EditProfile; 