import request from '@/utils/request';
export async function getTasks(mobile) {
  return request(`/api/getTasks`);
}
