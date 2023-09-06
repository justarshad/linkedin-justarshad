import './Feed.css';
import ProfileCart from './ProfileCart/ProfileCart';
import FeedCart from './FeedCart/FeedCart';
import News from './News/News';

import { auth, db } from '../../Config/firebase';
import { getDoc, doc } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const fetchUser = () => {
        setLoading(true);
        const ref = doc(db, 'users', `${auth?.currentUser?.uid}`);
        getDoc(ref).then((res) => {
            setUser({ ...res.data(), id: res.id });
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!auth?.currentUser?.uid) {
            Navigate('/');
        }
        fetchUser();
    }, []);

    return (
        <>
            <div className="Feed">
                <ProfileCart user={user} loading={loading} />
                <FeedCart user={user} userLoading={loading} />
                <News loading={loading} />
            </div>
        </>
    );
}
export default Home;