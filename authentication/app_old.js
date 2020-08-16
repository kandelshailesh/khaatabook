import React,{useState} from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity,Input,Dimensions,Image,SafeAreaView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';

import Page1 from './pages/component1';
import Page2 from './pages/component2';
import Page3 from './pages/component3';
import Page4 from './pages/component4';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import Login from './authentication/login';
import {db} from './firebase1/config';
import "firebase/auth";

// const AppNavigator = createStackNavigator({
//   Page1: {
//     screen: Page1,
//   },
//   Page2: {
//     screen: Page2,
//   },
//   Page3: {
//     screen: Page3,
//   },
//   Page4: {
//     screen: Page4,
//   },
// },
//   {
//     initialRouteName: 'Page2',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4511e',
      
//       },
//       headerTintColor: '#fff',
    
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//       headerLayoutPreset: 'center'
//     },
//   }
// );

const customdrawer= ({navigation})=>
{
  const items = [
    {
      navIcon: 'home',
      navOptionName: 'Page1',
      screenToNavigate: 'Page1',
    },
    {
      navIcon: 'image',
      navOptionName: 'Page2',
      screenToNavigate: 'Page2',
    },
    {
      navIcon: 'build',
      navOptionName: 'Page3',
      screenToNavigate: 'Page3',
    },
    {
      navIcon: 'build',
      navOptionName: 'Logout',
      screenToNavigate: 'Login',
    },
  ];
  return(
  <SafeAreaView style={{flex:1}}>
    <ScrollView>
      <View style={{height:140,justifyContent:'center',alignItems:'center'}}>
      <Image style={{maxHeight:100,maxWidth:100,borderRadius:100/2}} source={require('./assets/shailesh.png')}></Image>
      <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>Shailesh</Text>
      </View>
      <View style={{
        width:"100%",height:1,backgroundColor:'#eee'}}>
    </View>
      {/* <DrawerItems {...props}> */}
      {items.map((item, key) => (
      <TouchableOpacity onPress={()=>{
        navigation.navigate(item.screenToNavigate)
      }}>
        <View style={{height:40,flexDirection:'row',justifyContent:'flex-start',padding:25,alignItems:'center'}}>
          <Icon style={{color:'orange'}} name={item.navIcon}></Icon>
          <Text style={{padding:10,color:'orange'}}>{item.navOptionName}</Text>
          </View>
          </TouchableOpacity>
      ))}
      {/* </DrawerItems> */}
    </ScrollView>
  </SafeAreaView>
  )
}

const drawerContainer = createDrawerNavigator({Page1,Page2,Page3,Page4},{  initialRouteName: 'Page1',
contentComponent:customdrawer,
contentOptions:
{
  activeTintColor:'orange',
},
drawerType:"slide",
drawerBackgroundColor:"white",
drawerPosition: 'left'})
const AppContainer = createAppContainer(drawerContainer);


export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      auth:false
    }
  }
 changeAuth = () =>
  {
    this.setState({
      auth:true
    })
  }
  
  render()
  {
    
    return(      
     
    <SafeAreaView style={{flex:1,backgroundColor:'white',justifyContent:'center'}} >
      {this.state.auth===false ? <Login authChanger={this.changeAuth}></Login>:<AppContainer/>}

    </SafeAreaView>

      // <AppContainer/>
      

    )
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
