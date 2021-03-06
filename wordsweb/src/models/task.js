import { getTasks,getSaveword,saveWord,deleteWord} from '@/services/task';

const Model = {
  namespace: 'task',
  state: {
    status: undefined,
    data:false,
    favourites:false,
  },
  effects: {
    *getTasks({ payload }, { call, put }) {
      const response = yield call(getTasks, payload);
      console.log(response);
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: response,
        }); 
      }
    }, 
    *getSaveword({ payload }, { call, put }) {
      const response = yield call(getSaveword, payload);
      console.log(response);
      if (response.status === 'ok') {
        yield put({
          type: 'savefavourites',
          payload: response,
        }); 
      }
    }, 
    *saveWord({ payload }, { call, put }) {
      const response = yield call(saveWord, payload);
      console.log(response);
    }, 
    *deleteWord({ payload }, { call, put }) {
      const response = yield call(deleteWord, payload);
      console.log(response);
    }, 
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, data: payload.data,status:payload.status };
    },
    savefavourites(state, { payload }) {
      return { ...state, favourites: payload.data,status:payload.status };
    },
  },
};
export default Model;
