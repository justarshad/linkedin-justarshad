import './Style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config/firebase';
import { useReducer, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';

const Signin = ({ func }) => {
    // const [fullName, setFullName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [userCreating, setUserCreating] = useState(false);

    const initialState = {
        fullName: "",
        email: "",
        password: "",
        userCreating: false
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "FULLNAME":
                return { ...state, fullName: action.payload };

            case "EMAIL":
                return { ...state, email: action.payload };

            case "PASSWORD":
                return { ...state, password: action.payload };

            case "USERCREATING":
                return { ...state, userCreating: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const errlineRef = useRef();
    const passwordInputRef = useRef();
    const showHideRef = useRef();

    const fullNameChanged = (e) => {
        dispatch({ type: "FULLNAME", payload: e.target.value });
        errlineRef.current.innerHTML = '';
    }
    const emailChanged = (e) => {
        dispatch({ type: "EMAIL", payload: e.target.value });
        errlineRef.current.innerHTML = '';
    }
    const passwordChanged = (e) => {
        dispatch({ type: "PASSWORD", payload: e.target.value });
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
    const createUser = () => {
        const EmailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;
        if (state.fullName.length === 0) {
            errlineRef.current.innerHTML = '!Name Can\'t be empty';
        }
        else if (!EmailRegx.test(state.email)) {
            errlineRef.current.innerHTML = '!Please Enter Valid Email first';
        }
        else if (state.password.length < 6) {
            errlineRef.current.innerHTML = '!Please Enter Password of Six or More Length';

        }
        else {
            dispatch({ type: "USERCREATING", payload: true });
            createUserWithEmailAndPassword(auth, state.email, state.password).then((res, err) => {
                const ref = doc(db, 'users', res.user.uid);
                setDoc(ref, { fullName: state.fullName, connections: 0 }).then(res => {
                    dispatch({ type: "USERCREATING", payload: false });
                });
            }).catch(err => {
                errlineRef.current.innerHTML = '!Please change the email User already Exist';
                dispatch({ type: "USERCREATING", payload: false });
            });
        }
    }

    return (
        <div className="Signin">
            <div className="inputRow fullNameRow">
                <label htmlFor="email">Full Name</label>
                <div>
                    <input type="text" name="fullName" onChange={e => fullNameChanged(e)} />
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
                    <span ref={showHideRef} className="showHide" onClick={(e) => handleShowHide()}>Show</span>
                </div>
            </div>
            <span ref={errlineRef} className='errline'></span>
            {state.userCreating ? (<div className='creatingUser'><span></span><span></span><span></span><span></span></div>) : (<div className="btn" onClick={() => createUser()}>
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