import axios from "axios";

axios.defaults.baseURL = "/";

export const addUser = (data: any) =>
  axios.post("api-user/user", data).then((res) => res.data);

export const getUserList = (data: any) =>
  axios.get("api-news/user/axios", { params: data }).then((res) => res.data);

export const delUser = (data: any) =>
  axios.delete(`api-user/user/${data.id}`).then((res) => res.data);

export const updateUser = (data: any) =>
  axios.patch(`api-user/user/${data.id}`, data).then((res) => res.data);

export const addNews = (data: any) =>
  axios.post("api-news/news", data).then((res) => res.data);

export const getNewsList = (data: any) =>
  axios.get("api-news/news", { params: data }).then((res) => res.data);

export const delNews = (data: any) =>
  axios.delete(`api-news/news/${data.id}`).then((res) => res.data);

export const updateNews = (data: any) =>
  axios.patch(`api-news/news/${data.id}`, data).then((res) => res.data);
