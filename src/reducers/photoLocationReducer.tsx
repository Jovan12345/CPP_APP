const ADD_CITY_ASYNC = 'ADD_CITY_ASYNC';

interface Message {
  photoCity: string
}

interface AddCityToPhoto {
  type: typeof ADD_CITY_ASYNC
  payload: Message
}

type AddCityToPhotoAsync = AddCityToPhoto

export default (state = [], action: AddCityToPhotoAsync) => {
  switch (action.type) {
    case 'ADD_CITY_ASYNC':
      return [...state, { photoCity: action.payload }];
    default:
      return state;
  }
};