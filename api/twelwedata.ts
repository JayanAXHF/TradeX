import axios from "axios";

export default axios.create({
  baseURL: "https://api.twelvedata.com",
  params: {
    apikey: process.env.NEXT_PUBLIC_TWELWEDATA_API_KEY,
  },
});
