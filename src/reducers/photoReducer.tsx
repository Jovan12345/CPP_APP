const ADD_PHOTO_ASYNC = 'ADD_PHOTO_ASYNC';

interface Message {
    photoData: string
}

interface AddPhoto {
    type: typeof ADD_PHOTO_ASYNC
    payload: Message
}

type AddPhotoAsync = AddPhoto

export default (state = [], action: AddPhotoAsync) => {
    switch (action.type) {
        case 'ADD_PHOTO_ASYNC':

            return [...state, { photoData: action.payload }];
        default:
            return state;
    }
};