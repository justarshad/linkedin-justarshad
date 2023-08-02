import './Login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config/firebase';
import { useRef, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

const Signin = ({ func }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const errlineRef = useRef();


    const emailChanged = (e) => {
        setEmail(e.target.value);
        errlineRef.current.innerHTML = '';
    }
    const passwordChanged = (e) => {
        setPassword(e.target.value);
        errlineRef.current.innerHTML = '';
    }
    const passwordInputRef = useRef();
    const showHideRef = useRef();

    const handleShowHide = () => {
        if (passwordInputRef.current.type === 'text') {
            passwordInputRef.current.type = 'password';
            showHideRef.current.innerHTML = 'show';

        } else {
            passwordInputRef.current.type = 'text';
            showHideRef.current.innerHTML = 'hide';
        }
    }
    const [userCreating, setUserCreating] = useState(false);
    const createUser = () => {
        const EmailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;

        if (!EmailRegx.test(email)) {
            errlineRef.current.innerHTML = '!Please Enter Valid Email first';
        }
        else if (password.length < 6) {
            errlineRef.current.innerHTML = '!Please Enter Password of Six or More Length';

        }
        else {
            setUserCreating(true);
            createUserWithEmailAndPassword(auth, email, password).then((res, err) => {
                const ref = doc(db, 'users', res.user.uid);
                setDoc(ref, { fullName: fullName, connections: 0 }).then(res => {
                    setUserCreating(false);
                 });
            }).catch(err => { 
                errlineRef.current.innerHTML = '!Please change the email User already Exist';
                setUserCreating(false);
            });
        }
    }

    return (
        <div className="Signin">
            <div className="inputRow fullNameRow">
                <label htmlFor="email">Full Name</label>
                <div>
                    <input type="text" name="fullName" onChange={e => setFullName(e.target.value)} />
                </div>
            </div>
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
                    <span ref={showHideRef} className="showHide" onClick={(e)=>handleShowHide()}>Show</span>
                </div>
            </div>
            <span ref={errlineRef} className='errline'></span>
            {userCreating ? (<div className='creatingUser'><span></span><span></span><span></span><span></span></div>):(<div className="btn" onClick={() => createUser()}>
                Create Account
            </div>)}
            
            <div className="or">
                <span className="first"></span>
                <span className='middle'>or</span>
                <span className="last"></span>
            </div>
            <div className="btn" onClick={() => { func(false) }}>
                Alerady have an Acount! LogIn
            </div>
        </div>
    );
}
export default Signin;