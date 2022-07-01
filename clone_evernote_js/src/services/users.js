import API from "../services/api.js";

const UsersAPI = {
  register: (params) => API.post("/users/register", params),
  login: async (params) => {
    const response = await API.post("/users/login", params)
    localStorage.setItem("user", JSON.stringify(response.data.user))
    localStorage.setItem("token", response.data.token)
  },
  logout: () => {
    localStorage.removeItem("user", null)
    localStorage.removeItem("token", null)
  }
}

export default UsersAPI;