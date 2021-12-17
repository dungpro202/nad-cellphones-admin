import { getInitialData } from ".";
import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.get("/order/all");
      if (res.status === 200) {
        const { listOrder } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { listOrder },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const updateOrder = (payload,id) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post(`/order/${id}`, payload);
      if (res.status === 200) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS })
          dispatch(getInitialData());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};