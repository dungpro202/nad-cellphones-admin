import { getInitialData } from ".";
import axiosInstance from "../helpers/axios";
import { receiptConstants } from "./constants";

export const getAllReceipt = () => {
    return async dispatch => {
        dispatch({ type: receiptConstants.GET_ALL_RECEIPT_REQUEST });
        const res = await axiosInstance.get('/receipt/getAllReceipt');
        if (res.status === 200) {
            const { listReceipt } = res.data;
            dispatch({
                type: receiptConstants.GET_ALL_RECEIPT_SUCCESS,
                payload: { listReceipt }
            })
        }
        console.log(res)
    }
}

export const createReceipt =(receipt)=>{
    return async dispatch => {
        dispatch({ type: receiptConstants.CREATE_RECEIPT_REQUEST });
        const res = await axiosInstance.post('/receipt',receipt);
        if (res.status === 201) {
            dispatch({
                type: receiptConstants.CREATE_RECEIPT_SUCCESS,
            })
            dispatch(getInitialData());
        }else{
            const { error } = res.data;
            dispatch({
                type: receiptConstants.CREATE_RECEIPT_FAILURE,
                payload: { error}
            })
            dispatch(getInitialData());

        }
        console.log(res)
    }
}
