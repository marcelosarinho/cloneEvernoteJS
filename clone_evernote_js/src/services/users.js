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
  },
  updateNameAndEmail: async (params) => {
    const response = await API.put("/users", params, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
    localStorage.setItem("user", JSON.stringify(response.data))
  },
  updatePassword: async (params) => await API.put("/users/password", params, {
    headers: { "x-access-token": localStorage.getItem("token") }
  }),
  delete: async () => {
    await API.delete("/users", {
      headers: { "x-access-token": localStorage.getItem("token") }
    })
    localStorage.removeItem("user", null)
    localStorage.removeItem("token", null)
  }
}

export default UsersAPI;