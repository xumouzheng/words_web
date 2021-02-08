import { getTasks } from '@/services/task';
const Model = {
  namespace: 'task',
  state: {
    status: undefined,
    data:"",
  },
  effects: {
    *getTasks({ payload }, { call, put }) {
      const response = yield call(getTasks, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: response,
        }); 
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, data: payload.data,status:payload.status };
    },
  },
};
export default Model;
