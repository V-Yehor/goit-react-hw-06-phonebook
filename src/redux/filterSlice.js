const filterInitialState = '';

export const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case 'filter/setFilter':
      return action.payload;

    default:
      return state;
  }
};

export const setStoreFilter = value => {
  return {
    type: 'filter/setFilter',
    payload: value,
  };
};
