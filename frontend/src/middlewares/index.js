const logger = store => next => (action) => {
  console.group(action.type)
  console.info('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const middlewares = import.meta.env.MODE !== 'production' ? [logger] : []

export default middlewares
