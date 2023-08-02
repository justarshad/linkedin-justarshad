import './PostModle.css';
import defaultProfileIcon from '../../Assets/user.svg'
import { MdOutlineAddPhotoAlternate, MdVideoLibrary, MdEvent, MdArticle } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../../Config/firebase';

const PostModle = ({ fetchPosts, user }) => {

    const [isimgloading, setImgloading] = useState(false);
    const textareaRef = useRef('');
    const imgViewRef = useRef('');

    const [text, setText] = useState('');
    const [isFileToUpload, setIsFileToUpload] = useState(false);

    const removePostModel = () => {
        document.querySelector('.PostModle').classList.remove('active');
        setIsFileToUpload(false);
        setPostImgUrl('');
        textareaRef.current.value = '';
        imgViewRef.current.src = '';
    }

    const textErrRef = useRef();
    const textareaChanged = (e) => {
        setText(e.target.value.trim());
        text.length >=2000 ? textErrRef.current.innerHTML = " Post can\'t be more then 2000 characters" : textErrRef.current.innerHTML= "";
    }

    const [postImgUrl, setPostImgUrl] = useState('');

    const imgChangeHandler = (e) => {
        setIsFileToUpload(true);

        if (e.target.files.length > 0) {

            setImgloading(true);

            const imageView = document.querySelector('.PostModle .imageView');
            const textarea = document.querySelector('.inputRow');

            imageView.src = "";

            const fileRef = ref(storage, `projectFils/${(Math.random() * 100000000) + ''}`);
            uploadBytes(fileRef, e.target.files[0]).then(res => {

                getDownloadURL(res.ref).then(res => {
                    setImgloading(false);

                    textarea.style.height = '6rem';
                    imageView.src = res;
                    setPostImgUrl(res);
                });
            });
        }
    }

    const [postUploading, setPostUploading] = useState(false);

    const postBtnClicked = () => {

        if ((text !== '' || postImgUrl !== "") && !isimgloading) {

            setPostUploading(true);

            const postRef = collection(db, 'posts');
            addDoc(postRef, {
                ownerId: user.id,
                text: text,
                imgId: postImgUrl,
                time: new Date().getTime(),
            }).then(res => {
                setText('');
                removePostModel();
                setPostUploading(false);
                fetchPosts();
            });
        }
    }

    return (
        <div className='PostModle'>
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

                {isimgloading ? (<div className='loader'><span></span><span></span><span></span><span></span></div>) : (<></>)}

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
                    {(text.length < 1  || text.length > 2000 )&& !isFileToUpload ? (<button className='disabled'>Post</button>)
                    
                    :

                        postUploading ?
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