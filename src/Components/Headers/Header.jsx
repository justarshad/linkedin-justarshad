import HeaderSignedIn from "./HeaderSignedIn";
import HeaderSignedOut from "./HeaderSignedOut";

import { auth } from "../../Config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const Navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            if (data) {
                setAuthStatus(true);
                Navigate('/home');
            }
        });
    }, []);

    return (
        <>
            {authStatus ? (<HeaderSignedIn setAuthStatus={setAuthStatus} />) : (<HeaderSignedOut />)}
        </>
    );
}
export default Header;