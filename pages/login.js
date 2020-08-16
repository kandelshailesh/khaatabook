import React, { Component } from 'react'
import { Text, View,TextInput,AsyncStorage} from 'react-native';

import { Button,Input,Item, Label, Form, Toast} from 'native-base';
import {apiIP} from './api';

// import WriteUserData from '../firebase/config';



class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            authtype:'login',
            username:'',
            password:''
        }
    }
    _storeData = async (response) => {
        console.log(response);
        try {
            await AsyncStorage.setItem('jwt',response.token);
            await AsyncStorage.setItem('user_id',response.result[0]._id);
        } catch (error) {
         
            console.log(error);
        }
      };
    

    loginHandler = async () =>
    {
    fetch(`${apiIP}/login`,{
      method:'post',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username:this.state.username,password:this.state.password})}).then((response)=> response.json()).then((response)=>{
        console.log(response)
        if(response.success)
        {
        
            this._storeData(response).then(()=>
            {
                if(AsyncStorage.getItem('khaata_id'))
                {
                this.props.navigation.navigate('Home');
                }
                else
                {
                    this.props.navigation.navigate('Khaata');
                }

            })
        
        }
        else
        {
            // console.log(response.message);
            Toast.show({
                text: response.message,
                buttonText: "Okay",
                position: "top",
                duration: 1000,
                type:'warning'
                
                // buttonTextStyle: { color: "#008000" },
                // buttonStyle: { backgroundColor: "#5cb85c" }
              })
             
        
        }
      })
      
    }

   async UNSAFE_componentWillMount() 
    {
      // this.logoutHandler();
      // AsyncStorage.setItem('username','shailesh');
      // try
      // { 
      //   const value = await AsyncStorage.getItem('username')
      //   console.log(value);
      //   this.setState({'user':value});
      //   }
      //   catch(err)
      //   {
      //     console.log(err);
      //   }
    }
  render() {
    
    return (
     
<>
<View style={{width:"100%",height:"100%",backgroundColor:'rgba(0,0,180,1)',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
  <View style={{width:"80%"}}>
<Text style={{color:'white',textAlign:'center',fontSize:30,marginBottom:10}}>खाता बुक </Text>
<Item>
<Input onSubmitEditing={()=>this.passwordField._root.focus()} value={this.state.username} onChangeText={(val)=>this.setState({username:val})} placeholderTextColor={"white"} style={{borderColor:'#eee',textAlign:'center',color:"white",borderWidth:2,padding:10,height:50}} placeholder="Username"></Input>

</Item>
<Item style={{marginTop:20}}>
<Input onSubmitEditing={()=>this.loginHandler} ref={(c)=>{this.passwordField =c}} secureTextEntry={true} value={this.state.password} onChangeText={(val)=>this.setState({password:val})}  placeholderTextColor={"white"} style={{borderColor:'#eee',textAlign:'center',color:'white',borderWidth:2,padding:10,height:50}} placeholder="Password"></Input>

</Item>

<Button  ref={(c)=>{this.loginButton =c}} onPress={this.loginHandler} style={{marginTop:20,justifyContent:'center',alignContent:'center',backgroundColor:'#0095dc'}}>
  <Text style={{color:'white',fontSize:20}}>Login</Text>
</Button>

    
  
  
    </View>
</View>
</>

    )
  }
}

export default Login
