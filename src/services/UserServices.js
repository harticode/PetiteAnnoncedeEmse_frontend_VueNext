import http from "../http_api";

class UserServices {
  get(email) {
    return http.get(`/users/${email}`);
  }

  create(data) {
    return http.post("/users", data);
  }
}

export default new UserServices();