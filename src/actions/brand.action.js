import axiosInstance from "../helpers/axios";
import { brandConstants } from "./constants";

export const getAllBrand = () => {
    return async dispatch => {

        dispatch({ type: brandConstants.GET_ALL_BRANDS_REQUEST })
        const res = await axiosInstance.get('/brand/all');
        console.log(res)

        const { brandList } = res.data;
        if (res.status === 200) {
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_SUCCESS,
                payload: { categories: brandList }
            })
        } else {
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addBrand = (form) => {
    return async dispatch => {

        dispatch({ type: brandConstants.ADD_NEW_BRANDS_REQUEST });

        const res = await axiosInstance.post('/brand/create', form);
        console.log(res)
        if (res.status === 201) {
            dispatch({
                type: brandConstants.ADD_NEW_BRANDS_SUCCESS,
                payload: { brand: res.data.brand }
            });
        } else {
            dispatch({
                type: brandConstants.ADD_NEW_BRANDS_FAILURE,
                payload: res.data.error
            });
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: brandConstants.UPDATE_BRANDS_REQUEST });
        const res = await axiosInstance.post('/brand/update', form);
        if (res.status === 201) {
            dispatch({ type: brandConstants.UPDATE_BRANDS_SUCCESS });
            dispatch(getAllBrand());
        } else {
            const { error } = res.data;
            dispatch({
                type: brandConstants.UPDATE_BRANDS_FAILURE,
                payload: { error }
            });
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        dispatch({ type: brandConstants.DELETE_BRANDS_REQUEST })
        const res = await axiosInstance.post(`/brand/delete`, {
            payload: {
                ids
            }
        });
        if (res.status == 200) {
            dispatch({ type: brandConstants.DELETE_BRANDS_SUCCESS });
            dispatch(getAllBrand());
        } else {
            const { message } = res.data;
            dispatch({
                type: brandConstants.DELETE_BRANDS_FAILURE,
                payload: { message }
            })

        }
    }
}