const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const middlewares = process.env.NODE_ENV !== 'production' ? [logger] : [];

export default middlewares;
