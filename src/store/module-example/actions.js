import axios from "axios";

export function fetchImageAction(context) {
  return axios.get("http://localhost:4000/api").then((response) => {
    context.commit("setImages", response.data.images);
    // console.log(response.data.images);
  });
}
