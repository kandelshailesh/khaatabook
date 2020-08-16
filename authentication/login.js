import React, { Component } from 'react'
import { Text, View,TextInput,AsyncStorage} from 'react-native';

import { Button,Input,Item, Label, Form, Toast} from 'native-base';
// import WriteUserData from '../firebase/config';




class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            authtype:'login',
            username:'',
            password:'',
            cpassword:'',
            error:'',
            errorColor:'red',
            user:''
        }
    }
    
    handleChange = (e) =>
    {

   
      this.setState({
       username:e.nativeEvent.text
      })
    }

    handleChange1 = (e) =>
    {

    
      this.setState({
       password:e.nativeEvent.text
      })
    }
    handleChange2 = (e) =>
    {

     
      this.setState({
       cpassword:e.nativeEvent.text
      })
    }

    loginHandler = () =>
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
          AsyncStorage.setItem('jwt',response.token);
          this.props.navigation.navigate('Home');
        }
        else
        {
          Toast.show({
            text: response.message,
            position: "bottom",
            duration: 1000,
            type:'warning'
            
            // buttonTextStyle: { color: "#008000" },
            // buttonStyle: { backgroundColor: "#5cb85c" }
          })
        
        }
      })
      
    }

    // logoutHandler = () =>
    // {
    //   db.auth().signOut().then(()=>
    //   {
    //     console.log("Signed out");
    //   }).catch((error)=>
    //   {
    //     console.log(error);
    //   })
    // }
    // createUser = () =>
    // {
     
    // if(this.state.password.length===0 && this.state.cpassword.length===0 && this.state.username.length===0)
    // {
    //   this.setState({
    //     error:"Please enter all the field",
    //     errorColor:'red'
    //   })
    //   return ;
    // }
    // if(this.state.cpassword !== this.state.password)
    // {
    //   this.setState({
    //     error:"Password didnot match",
    //     errorColor:'red'

    //   })
    //   return ;
    // }


    //   if((this.state.cpassword === this.state.password) && this.state.password.length>0 && this.state.cpassword.length>0 && this.state.username.length>0)
    // {
    //   // writeUserData(this.state.username,this.state.password);
    //   db.auth().createUserWithEmailAndPassword(this.state.username,this.state.password).then((data)=>
    //   {
    //     data.user.updateProfile({displayName:"Shailesh"});
    //     this.setState({
    //       username:'',
    //       password:'',
    //       cpassword:'',
    //       error:'Registered Successfully',
    //       errorColor:'green'
  
    //     })
    //   }).catch((error)=>
    //   {
    //     console.log(error.code);
        
    //    this.setState({
    //     error:"Username already exist",
    //    errorColor:'red'

    //   })
  
    //   })
    //   // checkUser("Hello"); 
    // }
  
    // }
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
<Input placeholderTextColor={"white"} style={{borderColor:'#eee',textAlign:'center',borderWidth:2,padding:10,height:50}} placeholder="Username"></Input>

</Item>
<Item style={{marginTop:20}}>
<Input placeholderTextColor={"white"} style={{borderColor:'#eee',textAlign:'center',borderWidth:2,padding:10,height:50}} placeholder="Password"></Input>

</Item>

<Button onPress={this.loginHandler} style={{marginTop:20,justifyContent:'center',alignContent:'center',backgroundColor:'#0095dc'}}>
  <Text style={{color:'white',fontSize:20}}>Login</Text>
</Button>

    
  
  
    </View>
</View>
</>

    )
  }
}

export default Login
