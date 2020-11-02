import { call, put, takeEvery } from 'redux-saga/effects';
import geoLocation from '../apis/geoLocationAddress';

function* addPhotoAsync(action) {
  try {
    yield put({ type: 'ADD_PHOTO_ASYNC', payload: action.payload });
  } catch (e) {
    console.log('Error', e);
  }
}

function* takeAddressAPI(action) {
  try {
    yield call(geoLocation)
  } catch (e) {
    console.log('Error', e);
  }
}

export function* watchAddPhoto() {
  yield takeEvery('ADD_PHOTO', addPhotoAsync);
}

export function* watchPhotoLocation() {
  yield takeEvery('ADD_ADDRESS', takeAddressAPI)
}

