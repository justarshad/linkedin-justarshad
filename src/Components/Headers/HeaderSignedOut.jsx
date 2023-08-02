import './HeaderSignedOut.css';
import { useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import logoIcon from '../../Assets/home-logo.svg';

import { GrArticle } from 'react-icons/gr';
import { MdPeople } from 'react-icons/md';
import { SiSololearn } from 'react-icons/si';
import { PiBagSimpleFill } from 'react-icons/pi';

import Login from '../AuthComponents/Login';
import Signin from '../AuthComponents/Signin';

const HeaderSignedOut = () => {
    const [needToSignIn, setNeedToSignIn] = useState(false);
    const logInSignUpContainerRef = useRef();

    const joinBtnHandler = () => {
        setNeedToSignIn(true);
        logInSignUpContainerRef.current.classList.add('active');
    }
    const loginBtnHandler = () => {
        setNeedToSignIn(false);
        logInSignUpContainerRef.current.classList.add('active');
    }
    const crossBtnHandle = () => {
        logInSignUpContainerRef.current.classList.remove('active');
    }
    return (
        <div className="navbar">
            <div className="left">
                Linked
                <img src={logoIcon} alt="" />
            </div>
            <div className="right">
                <div className="topics">
                    <div>
                        <GrArticle />
                        <span>Articles</span>
                    </div>
                    <div>
                        <MdPeople />
                        <span>People</span>
                    </div>
                    <div>
                        <SiSololearn />
                        <span>Learn</span>
                    </div>
                    <div>
                        <PiBagSimpleFill />
                        <span>Jobs</span>
                    </div>
                </div>
                <span className="divider">
                </span>
                <div className="logInSignUp">
                    <button className='joinBtn' onClick={() => { joinBtnHandler() }}>Jion Now</button>
                    <button className='signInBtn' onClick={() => { loginBtnHandler() }}>Sign In</button>
                </div>
                <div className="logInSignUpContainer" ref={logInSignUpContainerRef}>
                    <div>
                        <ImCross onClick={() => { crossBtnHandle() }} />
                        {!needToSignIn ? (<Login func={setNeedToSignIn} fromHeader={true} />) : (<Signin func={setNeedToSignIn} fromHeader={true} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeaderSignedOut;