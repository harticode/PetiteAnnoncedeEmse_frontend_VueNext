import http from "../http_api";

class NotesServices{
  getAll() {
    return http.get("/notes");
  }

  findByType(type) {
    return http.get(`/notes/${type}`);
  }

  create(data) {
    return http.post("/notes", data);
  }

  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/notes/delete/${id}`);
  }
}

export default new NotesServices();