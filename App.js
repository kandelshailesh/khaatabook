/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Root } from "native-base";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainPage from './pages/mainpage';
import Customer from './pages/customer';
import Got from './pages/get';
import Gave from './pages/gave';
import CustomerForm from './pages/customer_form';

import KhaataForm from './pages/khaata';

import Login from './pages/login';
import EntryDetailsGave from './pages/entrydetails_gave';
import EntryDetailsGet from './pages/entrydetails_get';

import EditGave from './pages/editgave';
import EditGet from './pages/editget';

const AppNavigator = createStackNavigator({
    Home:
    {
      screen:MainPage, 
      navigationOptions: {
        headerShown: false,
      }
    },
  Customer:
  {
    screen:Customer,
    navigationOptions: {
      headerShown: false,
    }
},
Got:
{
  screen:Got,
  navigationOptions: {
    headerShown: false,
  }
},
Gave:
{
  screen:Gave,
  navigationOptions: {
    headerShown:false,
  }
},
EntryDetailsGave:
{
  screen:EntryDetailsGave,
  navigationOptions:{
    headerShown:false
  }
},
Khaata:
{
screen:KhaataForm,
navigationOptions:{
  headerShown:false
}
},
EntryDetailsGet:
{
  screen:EntryDetailsGet,
  navigationOptions:{
    headerShown:false
  }
},
EditGet:
{
screen:EditGet,
navigationOptions:{
  headerShown:false
}

},
EditGave:
{
  screen:EditGave,
  navigationOptions:{
    headerShown:false
  }
},
CustomerForm:
{
  screen:CustomerForm,
  navigationOptions:{
    headerShown:false
  }
 
}},
  {
    navigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Home',
  }
  );

  var AppContainer;
 
  if(!AsyncStorage.getItem('user_id'))
    {
AppContainer = createAppContainer(createSwitchNavigator({Login,AppNavigator},{initialRouteName:'Login'}));
    }
    else
    {
AppContainer = createAppContainer(createSwitchNavigator({Login,AppNavigator},{initialRouteName:'AppNavigator'}));
    }

export default class App extends React.Component
{
  state = { loading: true };

  UNSAFE_componentWillMount()
  {
  
  }
  render()
  {

  return (
         <Root>
           <AppContainer screenProps="Hell"></AppContainer>
           </Root>
  );
  }
};


// export default App;
