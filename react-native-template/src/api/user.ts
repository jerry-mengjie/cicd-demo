import Fetch from '@/utils/Fetch.ts';

// 获取cookie
export const getSysTime = (params = {}) => {
  return Fetch.get('/v1/sysConfig/getSysTime', params, true, true, true);
};

// 获取用户列表（参考 cicd-frontend-manage/src/views/User.vue 的 getUserList）
export const getUserList = (params: { keyWord?: string; page?: number; pageSize?: number } = {}) => {
  return Fetch.get('/api-news/user/axios', params, true, true, true);
};
