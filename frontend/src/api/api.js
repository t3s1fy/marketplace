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

// API запрос для подтверждения почты пользователя
export const passwordReset = async (email) => {
  console.log({ email });
  const response = await $host.post("api/user/password-reset/", {
    email,
  });

  return response;
};

export const resendConfirmationCode = async (email, action_type) => {
  console.log({ email, action_type });
  const response = await $host.post("api/user/resend-confirmation-code/", {
    email,
    action_type,
  });
  return response;
};

export const verifyCode = async (email, code) => {
  console.log({ email, code });
  const response = await $host.post("api/user/password-reset/verify-code/", {
    email,
    code,
  });
  return response;
};

export const confirmNewPassword = async (email, new_password) => {
  console.log({ email, new_password });
  const response = await $host.post("api/user/password-confirm/", {
    email,
    new_password,
  });
  const { data } = response; // Получаем data из ответа
  const { access, refresh } = data; // Деструктурируем токены

  // Сохраняем их в localStorage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};
