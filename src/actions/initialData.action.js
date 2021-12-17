import axiosInstance from "../helpers/axios";
import { accountConstants, brandConstants, categoryConstants, orderConstants, productConstants, receiptConstants, supplierConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        //dispatch({ type:initialDataConstants.GET_INITIAL_DATA_REQUEST})
        // const res = await axiosInstance.post('/initialData');
        // if (res.status === 200) {
        //     const { categories, products, orders, accounts,suppliers,receipts } = res.data;
        //     dispatch({
        //         type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        //         payload: { categories }
        //     })
        //     dispatch({
        //         type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        //         payload: { products }
        //     })
        //     dispatch({
        //         type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        //         payload: { orders },
        //     });
        //     dispatch({
        //         type: accountConstants.GET_ALL_ACCOUNT_SUCCESS,
        //         payload: { accounts },
        //     });
        //     dispatch({
        //         type: supplierConstants.GET_ALL_SUPPLIER_SUCCESS,
        //         payload: { suppliers },
        //     });
        //     dispatch({
        //         type: receiptConstants.GET_ALL_RECEIPT_SUCCESS,
        //         payload: { receipts },
        //     });
        // }
        // console.log(res)

        const res = await axiosInstance.get('/product/all');
        if (res.status === 200) {
            const { products } = res.data;
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
        const res1 = await axiosInstance.get('/category/all');
        if (res1.status === 200) {
            const { categories } = res1.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            })
        }
        const res2 = await axiosInstance.get('/brand/all');
        if (res2.status === 200) {
            const { brands } = res2.data;
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_SUCCESS,
                payload: { brands }
            })
        }
        const res3 = await axiosInstance.get('/order/all');
        if (res3.status === 200) {
            const { listOrder } = res3.data;
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { listOrder }
            })
        }
        const res4 = await axiosInstance.get('/receipt/all');
        if (res4.status === 200) {
            const { listReceipt } = res4.data;
            dispatch({
                type: receiptConstants.GET_ALL_RECEIPT_SUCCESS,
                payload: { listReceipt },
            });
        }
    }
}