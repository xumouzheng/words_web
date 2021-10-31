import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function getStatus() {
  return request('/api/status');
}

export async function getInfo() {
  return request('/info/readinfo');
}