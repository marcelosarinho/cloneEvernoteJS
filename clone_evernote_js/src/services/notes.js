import API from "../services/api.js";

const NotesAPI = {
  index: () => API.get("/notes", {
    headers: { "x-access-token": localStorage.getItem("token") }
  })
}

export default NotesAPI;