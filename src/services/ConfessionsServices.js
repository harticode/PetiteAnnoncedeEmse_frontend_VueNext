import http from "../http_api";

class ConfessionsServices{
  getAll() {
    return http.get("/confessions");
  }

  create(data) {
    return http.post("/confessions", data);
  }

}

export default new ConfessionsServices();