import './Post.css';
import timeHandler from '../../Utils/time';
import defaultOwnerIcon from '../../Assets/user.svg';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../Config/firebase';

import { BiLike, BiCommentDetail } from 'react-icons/bi';
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2';
import { BsFillSendFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ data, isOwner, rerenderPosts, ProfileId }) => {

    const Navigate = useNavigate();
    const postTextRef = useRef();
    const [loading, setLoading] = useState(false);
    const [owner, setOwner] = useState({});

    const deletePost = () => {
        const ref = doc(db, 'posts', `${data.id}`);
        deleteDoc(ref).then((res) => { });
        rerenderPosts();
    }

    const fetchOwner = () => {
        setLoading(true);
        const ref = doc(db, 'users', data.ownerId);
        getDoc(ref).then(res => {
            setOwner({ ...res.data() });
            setLoading(false);
        });
    }

    const navigateOnClick = () => {
        if (!ProfileId) {
            if (auth?.currentUser?.uid === data.ownerId) {
                Navigate(`/profile`);
            }
            else if (auth?.currentUser?.uid !== data.ownerId) {
                Navigate(`/users/${data.ownerId}`);
            }
        }
    }

    const textShowMore = (e)=>{
        const textArea = postTextRef.current;

        if(e.target.innerHTML === "show more"){
            textArea.innerHTML = data.text;
            e.target.innerHTML = "show less"
        }
        else{
            textArea.innerHTML = data.text.slice(0, 200) + '  ....';
            e.target.innerHTML = "show more"
        }
    };

    useEffect(() => {
        fetchOwner();
    }, []);

    return (
        <div className='Post'>
            {loading ?
                (<>

                    <div className="upper">
                        <div className='img skeleton' ></div>
                        <div className="ownerInfo">
                            <h4 className="name skeleton" ></h4>
                            <div className="discription skeleton"></div>
                            <div className="time skeleton"></div>
                        </div>
                    </div>
                    <div className="middle">
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                    </div>
                    <div className='img skeleton' ></div>
                    <div className="bottom">
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                    </div>

                </>)
                :
                (<>
                    <div className="upper">
                        <img className={ProfileId ? '' : "outsideProfile"} src={owner?.profile ? owner.profile : defaultOwnerIcon} alt="" onClick={(e) => navigateOnClick(e)} />
                        <div className="ownerInfo">
                            <h4 className={ProfileId ? "name" : "name outsideProfile"} onClick={(e) => navigateOnClick(e)}>{owner?.fullName ? owner.fullName : (<>Mr $</>)}</h4>
                            <h6 className="discription">{owner?.discription ? (owner.discription.length > 40 ? owner.discription.slice(0, 40) + '...' : owner.discription) : (<>Mr $'s Description</>)}</h6>
                            <span className="time">{timeHandler(data?.time)}</span>
                        </div>
                        {isOwner ? (<div className="deleteBtn" onClick={() => { deletePost() }}><MdDelete /></div>) : (<></>)}

                    </div>
                    {data?.text ? (<div className="middle">
                        <p ref={postTextRef}>
                            {data.text.length > 200 ? data.text.slice(0, 200) + '  ....' : data.text}
                        </p>
                        {data.text.length > 200 ? (<div className='textShowMore' onClick={(e)=>textShowMore(e)}>show more</div>):(<></>)}
                    </div>) : (<></>)}

                    {data?.imgId ? (<img src={data?.imgId} alt="" />) : (<></>)}

                    <div className="bottom">
                        <div className="item">
                            <BiLike />
                            <span>Like</span>
                        </div>
                        <div className="item">
                            <BiCommentDetail />
                            <span>Comment</span>
                        </div>
                        <div className="item">
                            <HiMiniArrowPathRoundedSquare />
                            <span>Repost</span>
                        </div>
                        <div className="item">
                            <BsFillSendFill />
                            <span>Send</span>
                        </div>
                    </div>
                </>)}
        </div>
    );
}

export default Post;