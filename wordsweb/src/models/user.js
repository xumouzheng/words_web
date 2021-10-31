import { queryCurrent, query as queryUsers ,getStatus,getInfo} from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status:0,
    info:[],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *getStatus(_, { call, put }) {
      const response = yield call(getStatus);
      yield put({
        type: 'saveState',
        payload: response.data,
      });
    },
    *getInfo(_, { call, put }) {
      const response = yield call(getInfo);
      yield put({
        type: 'saveInfo',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveState(state, action) {
      return { ...state, status: action.payload[0][0] || {} };
    },
    saveInfo(state, action) {
      return { ...state, info: action.payload};
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
