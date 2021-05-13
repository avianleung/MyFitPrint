import http from "../http-common";

class DataService {
  findAll() {
    return http.get("/");
  }

  createNew(data) {
    return http.post("/", data);
  }

  addExercise(workoutId, data) {
    return http.post(`/${workoutId}`, data);
  }

  editExercise(workoutId, exerciseId, data) {
    return http.put(`/${workoutId}/${exerciseId}`, data);
  }

  editWorkout(workoutId, data) {
    return http.put(`/${workoutId}`, data);
  }

  deleteExercise(workoutId, exerciseId) {
    return http.delete(`/${workoutId}/${exerciseId}`);
  }

  deleteWorkout(workoutId) {
    return http.delete(`/${workoutId}`);
  }
}

export default new DataService();
