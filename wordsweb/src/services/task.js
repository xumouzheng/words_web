import request from '@/utils/request';
export async function getTasks() {
  return request(`/api/getTasks`);
}

// 获取收藏的单词列表
export async function getSaveword() {
  return request('/api/saveword')
}

// 保存单词
export async function saveWord(params) {
  return request('/api/saveword', {
    method: 'POST',
    data: params,
  });
}

// 删除单词
export async function deleteWord(params) {
  return request('/api/saveword', {
    method: 'Delete',
    data: params,
  });
}