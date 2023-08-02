import './PostContainer.css';
import Post from '../Post/Post';
import { db, auth } from '../../Config/firebase';
import { getDocs, collection } from 'firebase/firestore';

import { BiEditAlt } from 'react-icons/bi';

import { useEffect, useState } from 'react';

const PostContainer = ({ ProfileId }) => {
    const [postLoading, setPostLoading] = useState(false);
    const [postList, setPostList] = useState([]);

    const fetchPost = () => {
        setPostLoading(true);
        const ref = collection(db, 'posts');

        if (ProfileId) {
            getDocs(ref).then(res => {
                const resData = res.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                });
                const filterdData = resData.filter(item => ProfileId === item.ownerId).sort((a, b) => b.time - a.time);
                setPostList(filterdData);
                setPostLoading(false);
            });
        }
        else if (auth?.currentUser?.uid) {
            getDocs(ref).then(res => {
                const resData = res.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                });
                const filterdData = resData.filter(item => auth?.currentUser?.uid === item.ownerId).sort((a, b) => b.time - a.time);
                setPostList(filterdData);
                setPostLoading(false);
            });
        }
    }

    const addEditProfile = () => {
        const EditprofileElement = document.querySelector('.EditProfile');
        EditprofileElement.classList.add('active');
    }

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div className="PostContainer">
            {postLoading ? (<>
                <div className="title">
                    <h2 className='skeleton'></h2>
                </div>
            </>)
                :
                (
                    <div className="title">
                        <h2>Posts</h2>
                        {ProfileId ? (<></>) : (<>
                            <span onClick={() => addEditProfile()}>
                                < BiEditAlt />
                            </span>
                        </>)}

                    </div>
                )}
            {postList.length ?
                (<div>
                    {ProfileId ?
                        postList.map((item) => (<Post data={item} isOwner={false} rerenderPosts={fetchPost} ProfileId={ProfileId} key={item?.id}/>))
                        :
                        postList.map((item) => (<Post data={item} isOwner={true} rerenderPosts={fetchPost} ProfileId={ProfileId} key={item?.id}/>))}
                </div>)
                :
                (<></>)
            }

        </div>
    );
}
export default PostContainer;