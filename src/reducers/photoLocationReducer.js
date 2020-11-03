export default (state = [], action) => {
    switch (action.type) {
      case 'ADD_CITY_ASYNC':
        return [...state, {photoCity: action.payload}];
    }
    return state;
  };