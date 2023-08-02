import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';

// import thunkMiddleware from 'redux-thunk';

const store = configureStore({
    reducer:{
        user:userSlice
    }
});
export default store;