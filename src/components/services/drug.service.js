import http from "../http-common";

class DrugDataService {
  getAll() {
    return http.get("/drugs");
  }

  get(id) {
    return http.get(`/drug/${id}`);
  }

  create(data) {
    return http.post("/drug", data);
  }

  update(id, data) {
    return http.put(`/drug/${id}`, data);
}

delete(id) {
  return http.delete(`/drug/${id}`);
}

deleteAll() {
  return http.delete(`/drug`);
}

findByTitle(title) {
  return http.get(`/drug?title=${title}`);
}
}

export default new DrugDataService();