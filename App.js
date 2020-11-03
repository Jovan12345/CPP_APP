import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';

import PostsScreen from './src/screens/PostsScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import PhotosScreen from './src/screens/PhotosScreen';
import MyPhotosScreen from './src/screens/MyPhotosScreen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/reducers';
import rootSaga from './src/sagas/saga'
import { composeWithDevTools } from 'redux-devtools-extension';

const Tab = createBottomTabNavigator();

const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="My photos"
          tabBarOptions={{
            activeTintColor: 'black',
            activeBackgroundColor: '#e91e63',
            labelStyle: {
              fontSize: 17,
            },
          }}
        >
          <Tab.Screen name="Posts" component={PostsScreen} />
          <Tab.Screen name="Comments" component={CommentsScreen} />
          <Tab.Screen name="Photos" component={PhotosScreen} />
          <Tab.Screen name="My photos" component={MyPhotosScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
