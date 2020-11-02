import { put, takeEvery } from 'redux-saga/effects';

function* addPhotoAsync(action) {
    try {
      yield put({type: 'ADD_PHOTO_ASYNC', payload: action.payload});
    } catch (e) {
      console.log('Error', e);
    }
  }

export function* watchAddPhoto() {
    yield takeEvery('ADD_PHOTO', addPhotoAsync);
}

