import './FeedCart.css';
import defaultProfileIcon from '../../../Assets/user.svg';
import Post from '../../../Components/Post/Post';
import PostModle from './PostModle/PostModle';

import { db } from '../../../Config/firebase';
import { getDocs, collection } from 'firebase/firestore';

import { MdOutlineAddPhotoAlternate, MdVideoLibrary, MdEvent, MdArticle } from 'react-icons/md';
import { useEffect, useState } from 'react';

const FeedCart = ({ user, userLoading }) => {

    const [postLoading, setPostLoading] = useState(true);
    const [post, setPost] = useState([]);

    const fetchPosts = () => {
        setPostLoading(true)
        const usersRef = collection(db, 'posts');
        getDocs(usersRef).then((res) => {

            const data = res.docs.map((item) => { return { ...item.data(), id: item.id, } });
            setPost(data.sort((a, b) => b.time - a.time));
            setPostLoading(false);
        });
    }
    const showPostModle = () => {
        const postModle = document.querySelector('.PostModle');
        postModle.classList.add('active');
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <>
            < PostModle fetchPosts={fetchPosts} user={user} />
            <div className="FeedCart">
                {userLoading ?
                    (<div className="addPost userLoading" >
                        <div>
                            <div className="profileIcon skeleton"></div>
                            <div className="input skeleton" ></div>
                        </div>
                        <div>
                            <div className="type skeleton"></div>
                            <div className="type skeleton"></div>
                            <div className="type skeleton"></div>
                            <div className="type skeleton"></div>
                        </div>
                    </div >
                    )
                    :
                    (<div className="addPost" >
                        <div>
                            <img src={user?.profile ? user.profile : defaultProfileIcon} alt="" />
                            <div className="input" onClick={() => showPostModle()}></div>
                        </div>
                        <div>
                            <div className="type" onClick={() => showPostModle()}>
                                <MdOutlineAddPhotoAlternate />
                                <span>Photo</span>
                            </div>

                            <div className="type">
                                <MdVideoLibrary />
                                <span>Video</span>
                            </div>
                            <div className="type">
                                <MdEvent />
                                <span>Event</span>
                            </div>
                            <div className="type">
                                <MdArticle />
                                <span>Article</span>
                            </div>
                        </div>
                    </div >)
                }
                {postLoading ? (<></>) : post?.map((item) => (<Post data={item} key={item?.id} />))}
            </div >
        </>
    );
}

export default FeedCart;