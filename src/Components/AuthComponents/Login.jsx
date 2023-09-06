import './Style.css';
import googleIcon from '../../Assets/google.svg';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider, db } from '../../Config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';

const Login = ({ func }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logingBtn, setLogingBtn] = useState(false);

    const errlineRef = useRef();
    const passwordInputRef = useRef();
    const showHideRef = useRef();

    const emailChanged = (e) => {
        setEmail(e.target.value);
        errlineRef.current.innerHTML = '';
    }
    const passwordChanged = (e) => {
        setPassword(e.target.value);
        errlineRef.current.innerHTML = '';
    }

    const handleShowHide = () => {
        if (passwordInputRef.current.type === 'text') {
            passwordInputRef.current.type = 'password';
            showHideRef.current.innerHTML = 'show';

        } else {
            passwordInputRef.current.type = 'text';
            showHideRef.current.innerHTML = 'hide';
        }
    }
    
    const signInWithGoogle = () => {

        signInWithPopup(auth, googleAuthProvider).then((googlePopUpRes) => {

            const ref = doc(db, 'users', googlePopUpRes.user.uid);
            getDoc(ref).then(res => {
                const usersOldData = { ...res.data() };

                setDoc(ref, {
                    fullName: googlePopUpRes.user.displayName,
                    email: googlePopUpRes.user.email,
                    connections: 0,
                    ...usersOldData,
                });
            });

        }).catch(err => {
            errlineRef.current.innerHTML = 'Somthing went wrong when signing with google!';
         });
    }

    const signInWithEmailPassword = () => {

        const EmailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;

        if (!EmailRegx.test(email)) {
            errlineRef.current.innerHTML = '!Please Enter Valid Email first';
        }
        else if (password.length < 6) {
            errlineRef.current.innerHTML = '!Please Enter Password of Six or More Length';

        }
        else {
            setLogingBtn(true);
            signInWithEmailAndPassword(auth, email, password).then(res => {
                setLogingBtn(false);
            }).catch(err => {
                errlineRef.current.innerHTML = '!Please take a look You may entered wrong E-mail or Password. if you sure you are right then check your Internet connection';
                setLogingBtn(false);
            });
        }
    }

    return (
        <div className="Login">
            <div className="inputRow emailRow">
                <label htmlFor="email">E-mail</label>
                <div>
                    <input type="text" name="email" onChange={(e) => emailChanged(e)} />
                </div>
            </div>
            <div className="inputRow passwordRow">
                <label htmlFor="password">Password</label>
                <div>
                    <input ref={passwordInputRef} type="password" name="password" onChange={(e) => passwordChanged(e)} />
                    <span ref={showHideRef} className="showHide" onClick={() => handleShowHide()}>Show</span>
                </div>
            </div>
            <span ref={errlineRef} className='errline'></span>
            <div className="signIn">
                {logingBtn ? (<div className='logingWithEmailPassword'><span></span><span></span><span></span><span></span></div>) : (<button onClick={() => signInWithEmailPassword()}>Sign in</button>)}
            </div>
            <div className="or">
                <span className="first"></span>
                <span className='middle'>or</span>
                <span className="last"></span>
            </div>
            <div className="btn" onClick={() => signInWithGoogle()}>
                <img src={googleIcon} alt="" />
                <span >Sign in with Google</span>
            </div>
            <div className="btn" onClick={() => func(true)}>
                New to Linkdin? join now
            </div>
        </div>
    );
}
export default Login;