import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
    console.log('action login', user)
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axiosInstance.post('auth/signin', {
            ...user
        });

        if (res.status === 200) {
            const { accessToken, userId,role,name  } = res.data;
            const user ={userId,role,name}
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    accessToken, user
                }
            });
        } else {
            if (res.status === 203) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }

    }
}


//ktra da login chua 
export const isUSerLoggedIn = () => {
    return async dispatch => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    accessToken, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Faild to login'
                }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await axiosInstance.post('/admin/signout')
        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { erorr: res.data.error }
            });
        }

    }
}