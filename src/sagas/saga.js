import { all, put, takeEvery, fork } from 'redux-saga/effects';
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
    let photoCity = '';
    if (action.payload.latitude && action.payload.longitude) {
      photoCity = yield geoLocation.get('', {
        params: {
          key: '410e214de44847cd83f6caca388b8ec8',
          q: `${action.payload.latitude},${action.payload.longitude}`
        }
      }).then(res => res.data.results[0].components.city)
    } else {
      photoCity = 'Location for this picture is not available'
    }

    yield put({ type: 'ADD_CITY_ASYNC', payload: photoCity })
  } catch (e) {
    console.log('Error', e);
  }
}

function* watchAddPhoto() {
  yield takeEvery('ADD_PHOTO', addPhotoAsync);
}

function* watchPhotoLocation() {
  yield takeEvery('ADD_ADDRESS', takeAddressAPI)
}


export default function* rootSaga() {
  yield all([
    fork(watchAddPhoto),
    fork(watchPhotoLocation)
  ])
}
