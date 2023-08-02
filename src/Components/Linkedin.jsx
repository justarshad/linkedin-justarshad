import './Linkedin.css';
import Login from './AuthComponents/Login'
import Signin from './AuthComponents/Signin';

import mainBgImg from '../Assets/mainBgImg.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../Config/firebase';

const Linkedin = () => {
    const Navigate = useNavigate();
    const [needToSignIn, setNeedToSignIn] = useState(false);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            Navigate('/home');
        }
    }, []);

    return (
        <div className="Linkedin">
            <img src={mainBgImg} />
            <div className="mainContainer">
                <h1>Welcome to your professional community</h1>
                {!needToSignIn ? (<Login func={setNeedToSignIn} />) : (<Signin func={setNeedToSignIn} />)}
            </div>
        </div>
    );
}

export default Linkedin;