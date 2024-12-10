import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

// API запрос для регистрации пользователя
export const registration = async (email, password) => {
  console.log("Registration request data:", { email, password });
  const response = await $host.post("api/user/registration", {
    email,
    password,
    role: "user",
  });
  const { data } = response; // Получаем data из ответа
  const { access, refresh } = data; // Деструктурируем токены

  // Сохраняем их в localStorage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};

// API запрос для авторизации пользователя
export const login = async (email, password) => {
  const response = await $host.post("api/user/login", {
    email,
    password,
  });
  const { data } = response; // Получаем data из ответа
  const { access, refresh } = data; // Деструктурируем токены

  // Сохраняем их в localStorage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};

// API запрос для подтверждения почты пользователя
export const registrationConfirm = async (email, confirmation_code) => {
  console.log("Registration request data:", { email, confirmation_code });
  const response = await $host.post("api/user/registration-confirm", {
    email,
    confirmation_code,
  });
  const { data } = response; // Получаем data из ответа
  const { access, refresh } = data; // Деструктурируем токены

  // Сохраняем их в localStorage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};
