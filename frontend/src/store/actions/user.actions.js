// Libraries
import axios from "axios";

// Redux actions
import { userActions } from "../slices/user.slice";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      const { user, token } = response.data.data;
      const userId = user.id;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);

      dispatch(userActions.login({ userId, token }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (userData) => {
  return async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkUserAuth = (token) => {
  return (dispatch) => {
    dispatch(userActions.checkAuth({ userAuth: !!token, token }));
  };
};

export const getUserById = (id) => {
  const token = sessionStorage.getItem("token");

  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      const { user } = response.data.data;

      dispatch(userActions.profileInfo(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (userName, userEmail) => {
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("userId");

  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          name: userName,
          email: userEmail,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch(userActions.profileUpdate({ userName, userEmail }));
    } catch (error) {
      console.log(error);
    }
  };
};
