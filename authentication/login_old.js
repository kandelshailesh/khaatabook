import React, { Component } from 'react'
import { Text, View,TextInput,Button} from 'react-native'
// import { Button } from 'native-base';
// import WriteUserData from '../firebase/config';
import {db} from '../firebase1/config';
import "firebase/auth";


const  writeUserData = (username,password) =>
{
  console.log("Hello");
  db.ref('users').push().set({
     username:username,
     password:password,   
   });
}
  
const loginHandler = (username,password) =>
{
  return new Promise((resolve,reject)=>
  {
    db.ref('users').orderByChild('username').equalTo(username).on('value',(snapshot)=>
    {

      if(!snapshot.exists())
      {
        resolve("false");
      }
      
      snapshot.forEach(function(userSnapshot) {
        console.log(userSnapshot.val().password);
       
          if(userSnapshot.val().password===password)
          {
          console.log("User found");
          resolve("true");
          }
          else
          {
          console.log("User not found");
  
            resolve("false");
          }
        }
       
        // var daBlog = blogs['efg'];
    
      // console.log(snapshot.val());
)
  })
  })
}
const checkUser = (username)=>
{
  return new Promise((resolve,reject)=>
  {
    db.ref('users').orderByChild('username').equalTo(username).on('value',(snapshot)=>
  {
    console.log(snapshot.val());
    if(snapshot.val())
    {
      console.log("Username already exist");
      resolve("true");
    }
    else
    {
      console.log("OK");
      resolve("false")
    }
    
    // console.log(snapshot.val());
  },(error)=>{
    console.log("Error"+error);
    reject(new Error("Error"));
  })

})
}
  // db.ref('users').on('value',(snapshot)=>
  // {
  //   console.log(snapshot.val());
  // },(error)=>{
  //   console.log("Error"+error);
  // })

  

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            authtype:'register',
            username:'',
            password:'',
            cpassword:'',
            error:'',
            errorColor:'red'
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

    LoginHandler = () =>
    {
    loginHandler(this.state.username,this.state.password).then((data)=>
    {
      console.log(data);
      if(data==="true")
      {
        this.setState({
          error:'Login Successfully',
          errorColor:'green'
        })
        this.props.authChanger();
      }
      else
      {
        this.setState({
          error:'Username or Password didnot match',
          errorColor:'red'
        })

      }
    })
    }
    validateData = () =>
    {
     
    if(this.state.password.length===0 && this.state.cpassword.length===0 && this.state.username.length===0)
    {
      this.setState({
        error:"Please enter all the field",
        errorColor:'red'
      })
      return ;
    }
    if(this.state.cpassword !== this.state.password)
    {
      this.setState({
        error:"Password didnot match",
        errorColor:'red'

      })
      return ;
    }

   checkUser(this.state.username).then((data)=>
   {
     if(data==="false")
     {

      if((this.state.cpassword === this.state.password) && this.state.password.length>0 && this.state.cpassword.length>0 && this.state.username.length>0)
    {
      writeUserData(this.state.username,this.state.password);
      // checkUser("Hello");
      this.setState({
        username:'',
        password:'',
        cpassword:'',
        error:'Registered Successfully',
        errorColor:'green'

      })
    }
 
     }
     else
     {
       this.setState({
         error:"Username already exist",
        errorColor:'red'

       })
     }
   })


   
    }
  render() {
    

   
    return (
      <View style={{width:'90%',justifyContent:'center',alignItems:'center'}} >
<View style={{margin:10}}>
         
         <Text style={{color:this.state.errorColor}}>{this.state.error}</Text>
         </View>
{this.state.authtype==='register'?<View style={{justifyContent:'center',alignItems:'center'}}>
  
  <View style={{margin:10}}>
         
        <TextInput style={{padding:10,borderWidth:1,borderColor:'#eee',width:300,textAlign:'center'}} placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}></TextInput>
        </View>
        <View style={{margin:10}}>
        <TextInput secureTextEntry={true}  style={{padding:10,borderWidth:1,borderColor:'#eee',width:300,textAlign:'center'}} placeholder="Enter password" name="password" onChange={this.handleChange1} value={this.state.password} ></TextInput>

        </View>
        <View style={{margin:10}}>
        <TextInput secureTextEntry={true}  style={{padding:10,borderWidth:1,borderColor:'#eee',width:300,textAlign:'center'}} placeholder="Confirm password" name="cpassword" onChange={this.handleChange2} value={this.state.cpassword}></TextInput>
        
        </View>
        <View style={{marginTop:10,width:250}}>
        <Button onPress={this.validateData} title="Create Account"></Button>       
    </View>
    <View style={{width:250,marginTop:10}}>
<Button title="Login" onPress={()=>{this.setState({authtype:'login'})}}></Button></View></View>:
<View style={{justifyContent:'center',alignItems:'center'}}>
<View style={{margin:10}}>
         
        <TextInput style={{padding:10,borderWidth:1,borderColor:'#eee',width:300,textAlign:'center'}} placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}></TextInput>
        </View>
        <View style={{margin:10}}>
        <TextInput secureTextEntry={true}  style={{padding:10,borderWidth:1,borderColor:'#eee',width:300,textAlign:'center'}} placeholder="Enter password" name="password" onChange={this.handleChange1} value={this.state.password} ></TextInput>

        </View>
         <View style={{marginTop:10,width:250}}>
<Button title="Login" onPress={this.LoginHandler}></Button>
</View>
<View style={{marginTop:10,width:250}}>
<Button title="Sign Up" onPress={()=>{this.setState({authtype:'register'})}}></Button>
</View>
</View>  }


      
      </View>

    )
  }
}

export default Login
