import http from "../http-common";

class LandDataService {
  getAll() {
    return http.get("/lands");
  }

  get(id) {
    return http.get(`/land/${id}`);
  }

  create(data) {
    return http.post("/land", data);
  }

  update(id, data) {
    return http.put(`/land/${id}`, data);
}

delete(id) {
  return http.delete(`/land/${id}`);
}

deleteAll() {
  return http.delete(`/land`);
}

findByTitle(title) {
  return http.get(`/land?title=${title}`);
}
}

export default new LandDataService();
