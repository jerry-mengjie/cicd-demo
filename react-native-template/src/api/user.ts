import Fetch from '@/utils/Fetch.ts';

// 获取cookie
export const getSysTime = (params = {}) => {
  return Fetch.get('/v1/sysConfig/getSysTime', params, true, true, true);
};
