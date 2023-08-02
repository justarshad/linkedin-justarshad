import { useParams } from "react-router-dom";
import './User.css';
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";

const User = () => {

    const [user, setUser] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const ref = doc(db, 'users', id);
        getDoc(ref).then((res) => {

            if (res.data()) {
                setUser(true);
            } else {
                setUser(false);
            }
        });
    })
    return (<>

        {!user ? (<div className="unknown skeleton"></div>) : (<Profile ProfileId={id} />)}

    </>);
}

export default User;