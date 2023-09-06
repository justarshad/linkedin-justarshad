import HeaderSignedIn from "./HeaderSignedIn";
import HeaderSignedOut from "./HeaderSignedOut";

import { auth } from "../../Config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {

    const Navigate = useNavigate();
    const location = useLocation();
    const [authStatus, setAuthStatus] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            if (data) {
                setAuthStatus(true);
                Navigate('/feed');
            }
        });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            {authStatus ? (<HeaderSignedIn setAuthStatus={setAuthStatus} />) : (<HeaderSignedOut />)}
        </>
    );
}
export default Header;