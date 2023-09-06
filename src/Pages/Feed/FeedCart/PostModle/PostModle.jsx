import './PostModle.css';
import defaultProfileIcon from '../../../../Assets/user.svg'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../../../../Config/firebase';

import { MdOutlineAddPhotoAlternate, MdVideoLibrary, MdEvent, MdArticle } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { useReducer, useRef, useState } from 'react';

const PostModle = ({ fetchPosts, user }) => {

    const textareaRef = useRef();
    const imgViewRef = useRef();
    const textErrRef = useRef();
    const PostModelRef = useRef();

    const initialState = {
        text: '',
        postImgUrl: '',
        isImgLoading: false,
        isFileToUpload: false,
        postUploading: false
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "TEXT":
                return { ...state, text: action.payload };
            case "IMGLOADING":
                return { ...state, isImgLoading: action.payload };
            case "ISFILETOUPLOAD":
                return { ...state, isFileToUpload: action.payload };
            case "POSTIMGURL":
                return { ...state, postImgUrl: action.payload };
            case "POSTUPLOADING":
                return { ...state, postUploading: action.payload };
            case "RESET":
                return { ...initialState };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);


    const removePostModel = () => {
        PostModelRef.current.classList.remove('active');
        dispatch({ type: 'RESET'});
        textareaRef.current.value = '';
        imgViewRef.current.src = '';
    }

    const textareaChanged = (e) => {
        dispatch({ type: 'TEXT', payload: e.target.value.trim() });
        state.text.length >= 2000 ? textErrRef.current.innerHTML = " Post can\'t be more then 2000 characters" : textErrRef.current.innerHTML = "";
    }


    const imgChangeHandler = (e) => {
        dispatch({ type: 'ISFILETOUPLOAD', payload: true });

        if (e.target.files.length > 0) {

            dispatch({ type: 'IMGLOADING', payload: true });

            const imageView = PostModelRef.current.querySelector(' .imageView');
            const textarea = PostModelRef.current.querySelector('.inputRow');

            imageView.src = "";

            const fileRef = ref(storage, `projectFils/${(Math.random() * 100000000) + ''}`);
            uploadBytes(fileRef, e.target.files[0]).then(res => {

                getDownloadURL(res.ref).then(res => {
                    dispatch({ type: 'IMGLOADING', payload: false });

                    textarea.style.height = '6rem';
                    imageView.src = res;
                    dispatch({ type: 'POSTIMGURL', payload: res });
                });
            });
        }
    }


    const postBtnClicked = () => {

        if ((state.text !== '' || state.postImgUrl !== "") && !state.isimgloading) {

            dispatch({ type: 'POSTUPLOADING', payload: true });

            const postRef = collection(db, 'posts');
            addDoc(postRef, {
                ownerId: user.id,
                text: state.text,
                imgId: state.postImgUrl,
                time: new Date().getTime(),
            }).then(res => {
                removePostModel();
                fetchPosts();
            });
        }
    }

    return (
        <div className='PostModle' ref={PostModelRef}>
            <div className="container">
                <div className='profileRow'>
                    <div>
                        <img src={user?.profile ? user.profile : defaultProfileIcon} />
                        <div>
                            <h4>{user?.fullName ? user?.fullName : 'Your Name'}</h4>
                            <span>Post to Everone</span>
                        </div>
                    </div>
                    <ImCross onClick={() => removePostModel()} />
                </div>

                <textarea ref={textareaRef} className='inputRow' placeholder='Write your thouts' onChange={(e) => textareaChanged(e)}></textarea>

                {state.isimgloading ? (<div className='loader'><span></span><span></span><span></span><span></span></div>) : (<></>)}

                <img ref={imgViewRef} src="" className='imageView' />
                <div className='typesRow'>
                    <label className='type' htmlFor="PostModleImageInput"><MdOutlineAddPhotoAlternate /><span>Photo</span></label>
                    <input type="file" accept="image/jpeg, image/png, image/jpg" id='PostModleImageInput' onChange={(e) => imgChangeHandler(e)} />

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
                <div className="divider"></div>
                <div className="lastRow">
                    <span ref={textErrRef}></span>
                    {/* {(state.text.length === 0 || state.text.length > 2000) && !state.isFileToUpload ? (<button className='disabled'>Post</button>) */}

                    {/* : */}

                    {state.postUploading ?
                        (
                            <button className='disabled'>Posting</button>
                        )
                        :
                        (
                            <button onClick={() => postBtnClicked()}>Post</button>
                        )

                    }
                </div>
            </div>
        </div>
    );
}

export default PostModle;