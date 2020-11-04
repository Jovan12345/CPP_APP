import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, StatusBar, View } from 'react-native';

import PostsScreen from './src/screens/PostsScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import PhotosScreen from './src/screens/PhotosScreen';
import MyPhotosScreen from './src/screens/MyPhotosScreen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/reducers';
import rootSaga from './src/sagas/saga'
import { composeWithDevTools } from 'redux-devtools-extension';

// initialize Bottom tab navigation
const Tab = createBottomTabNavigator();

const sagaMiddleware = createSagaMiddleware();

// create redux store with redux-saga middleware
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

// starting root saga
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>

      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Posts"
          tabBarOptions={
            {
              activeTintColor: '#e91e63',
              labelStyle: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                textAlignVertical: 'center',
                fontSize: 17
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
