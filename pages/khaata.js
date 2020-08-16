import React, { useState } from 'react';
import {View,Modal,Alert,FlatList,Button as RNB, SafeAreaView, ScrollView,Platform,PermissionsAndroid,TouchableOpacity, AsyncStorage} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, Toast} from 'native-base';
import { apiIP } from './api';

export default class Khaata_Form extends React.Component
{
state={khaataname:'',
user_id:''}

// _storeData = async (response) => {
//     console.log(response);
//     try {
//         await AsyncStorage.setItem('jwt',response.token);
//         await AsyncStorage.setItem('user_id',response.result[0]._id);
//     } catch (error) {
     
//         console.log(error);
//     }
//   };

_storeData = async (response) => {
    console.log(response);
    try {
        await AsyncStorage.setItem('khaata_id',response.result[3]._id);
        await AsyncStorage.setItem('khaatabook_name',response.result[3].khaatabookname);

       
    } catch (error) {
     
        console.log(error);
    }
  };

submitKhaataData= async () =>
{
    if(this.state.khaataname.length>0)
    {
        fetch(`${apiIP}/register_khaata`,{method:'post',headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({user_id:this.state.user_id,khaataname:this.state.khaataname})
    }).then((response)=>response.json()).then((response)=>{
        console.log(response);
        if(response.success)
        {
    
           this._storeData(response);
           this.props.navigation.navigate('Home');
        }
        else
        {
            Toast.show({
                text:'Some error occured',
                buttonText: "Okay",
                position: "top",
                duration: 1000,
                type:'warning'
            })
        }
    })
    }
    else
    {
        Toast.show({
            text:'Enter business name',
            buttonText: "Okay",
            position: "top",
            duration: 1000,
            type:'danger'
        })
    }
}



// _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('user_id');
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
//         this.setState({token:value})
//       }
//       else
//       {
//           console.log(value);
//       }
//     } catch (error) {
//       // Error retrieving data
//       console.log(error)
//     }
//   };
async componentDidMount()
{

AsyncStorage.getItem('user_id').then((value)=>this.setState({user_id:value}))
// console.log("Value");

// this._retrieveData();

}

render()
{
    return(
        <Container style={{backgroundColor:'#2050a0'}}>
            <Header style={{backgroundColor:'#2050a0',borderBottomColor:'white',borderBottomWidth:1}}>
                <Left>

                </Left>
                <Body>
                  <Title>Create khaatabook</Title>  
                </Body>
            </Header>
            <Content>
            <View style={{width:"100%",marginTop:10}}>
            <Text style={{color:'white',textAlign:'center'}}>Your credentials are verified 
           </Text>
            
            <View style={{width:"90%",marginTop:20,marginHorizontal:20}}>
           <Text style={{color:'white'}}>Create your first khaatabook</Text>

                <Item  regular style={{border:2,borderColor:'white',marginTop:10,height:70,borderRadius:10}} stackedLabel>
                    <Label  style={{color:'white',paddingLeft:10}}>Enter Business name</Label>
                <Input autoCorrect={false} autoFocus style={{color:'white',fontWeight:'bold',fontSize:20}} value={this.state.khaataname} onChangeText={(val)=>this.setState({khaataname:val})}></Input>
                </Item>
                
                </View>
                </View>
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor:'#2050a0',borderWidth:2,borderColor:'white'}}>
                <Button onPress={this.submitKhaataData} style={{justifyContent:'center',borderWidth:0,alignContent:'center'}} ><Text style={{color:'white',fontSize:14}}>Create</Text></Button>

                    </FooterTab>

                </Footer>
           
        </Container>

    )
}

}

