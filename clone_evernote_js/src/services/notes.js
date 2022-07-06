import API from "../services/api.js";

const NotesAPI = {
  index: () => API.get("/notes", {
    headers: { "x-access-token": localStorage.getItem("token") }
  }),
  create: () => API.post("/notes/create", { "title": "Nova nota", "body": "Nova nota" },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  ),
  delete: (id) => API.delete(`/notes/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }
  }),
  update: (id, params) => API.put(`/notes/${id}`, params, {
    headers: { "x-access-token": localStorage.getItem("token") }
  }),
  search: (query) => API.get(`/notes/search?query=${query}`, {
    headers: { "x-access-token": localStorage.getItem("token") }
  })
}

export default NotesAPI;