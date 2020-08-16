import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from './login';
import {db} from '../firebase1/config';
import "firebase/auth";

class Logout extends Component {
  render() {
      
      this.componentWillMount = () =>
      {
         db.auth().signOut().then(()=>
          {
            console.log("Signed out");
          }).catch((error)=>
          {
            console.log(error);
          })
      }
    return (
      <Login navigation={this.props.navigation}></Login>
    )
  }
}

export default Logout