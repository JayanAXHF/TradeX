import axios from "axios";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
  },
});
