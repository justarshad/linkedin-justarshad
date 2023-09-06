import './Home.css';
import mainBgImg from '../../Assets/mainBgImg.svg'

import Login from '../../Components/AuthComponents/Login'
import Signin from '../../Components/AuthComponents/Signin';

import { auth } from '../../Config/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const Navigate = useNavigate();
    const [needToSignIn, setNeedToSignIn] = useState(false);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            Navigate('/feed');
        }
    }, []);

    return (
        <div className="Home">
            <img src={mainBgImg} />
            <div className="mainContainer">
                <h1>Welcome to your professional community</h1>
                {!needToSignIn ? (<Login func={setNeedToSignIn} />) : (<Signin func={setNeedToSignIn} />)}
            </div>
        </div>
    );
}

export default Home;