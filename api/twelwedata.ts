import axios from "axios";

export default axios.create({
  baseURL: "https://api.twelvedata.com",
  params: {
    apikey: "ef4d768afd0a47358bdac4112b88754a",
  },
});
