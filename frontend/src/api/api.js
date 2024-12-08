import axios from "axios";

// Используйте ваш ngrok URL, который предоставляется при запуске ngrok
const api = axios.create({
  baseURL: "https://6fdc-94-140-149-103.ngrok-free.app", // URL вашего Django API через ngrok
});

export default api;
