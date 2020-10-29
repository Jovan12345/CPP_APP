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

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Posts"
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
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
