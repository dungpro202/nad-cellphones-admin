import { getInitialData } from ".";
import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axiosInstance.post(`product/all`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  console.log(form)
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axiosInstance.post(`product`, form);
      if (res.status === 200) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getInitialData());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (form) => {
  console.log(form)
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
      const res = await axiosInstance.put(`product/${form.id}`, form);
      if (res.status === 200) {
        dispatch({ type: productConstants.UPDATE_PRODUCT_SUCCESS });
        dispatch(getInitialData());

      } else {
        dispatch({ type: productConstants.UPDATE_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

