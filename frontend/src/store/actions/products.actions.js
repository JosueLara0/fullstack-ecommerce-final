import axios from "axios";

import { productsActions } from "../slices/products.slice";

export const fetchProducts = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      const { products } = response.data.data;

      dispatch(productsActions.getProducts({ products }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (productFormData) => {
  const token = sessionStorage.getItem("token");

  return async () => {
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/products`,
        data: productFormData,
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
