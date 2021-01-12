import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service.delete("/auth/logout").catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/users/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos() {
    return service
      .get("/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeItem(itemId) {
    return service
      .delete(`/items/${itemId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateItem(itemId, data) {
    return service
      .patch(`/items/${itemId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserItems() {
    return service
      .get("/users/me/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addItem(data) {
    return service
      .post("/items", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
