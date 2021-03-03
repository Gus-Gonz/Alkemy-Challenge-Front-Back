import axios from "axios";

const getFullResume = () => {
  return axios.get("http://localhost:5000/api/operation/");
};

const postNewResume = (data) => {
  return axios.post("http://localhost:5000/api/operation/", data);
};

const editResume = (data, id) => {
  return axios.put("http://localhost:5000/api/operation/" + id, data);
};

export { getFullResume, postNewResume, editResume };
