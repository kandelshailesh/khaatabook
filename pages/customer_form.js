import React, { useState } from 'react';
import {View,Modal,Alert,FlatList,Button as RNB, SafeAreaView, ScrollView,Platform,PermissionsAndroid,TouchableOpacity, AsyncStorage} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, Toast} from 'native-base';
import {apiIP} from './api';

export default class Customer_Form extends React.Component
{
    state ={
        customer_name:'',
        contact_no:'',
        khaata_id:''
    }
    submitCustomer = () =>
    {
        // Alert.alert('adfadfd');
        const customername=this.state.customer_name;
        const mobileno=this.state.contact_no;
      
   
        // Alert.alert(customername);
        if(customername.length >0)
        {
            fetch(`${apiIP}/register_customer`,{  method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'}
              ,body:JSON.stringify({customername,mobileno,'khaataid':this.state.khaata_id})
            }).then((response)=> response.json()).then((response)=>
            {
                console.log(response)
                if(response.success)
                {
                    this.setState({
                        customer_name:'',
                        contact_no:''
                    })
                    
                   
                    Toast.show({
                        text: response.message,
                        buttonText: "Okay",
                        position: "top",
                        duration: 1000,
                        type:'success'
                        
                        // buttonTextStyle: { color: "#008000" },
                        // buttonStyle: { backgroundColor: "#5cb85c" }
                      })
                     
                      setTimeout(()=>
                      {
                        this.props.navigation.navigate('Home')
                      },1000)
                     
                    
                } 
                    
                
                else
                {
                    Toast.show({
                        text: response.message,
                        buttonText: "Try again",
                        duration: 3000,
                        position: "top",
                        type:"danger"
                      
                      })
                 
                }
            })
       
              
        }
        else
        {
            Toast.show({
                text: "Please input customername",
                buttonText: "Try again",
                duration: 3000,
                position: "top",
                type:'danger'
              
              })
        }
    }

    componentDidMount()
    {
        AsyncStorage.getItem('khaata_id').then(value =>
            {
               this.setState({khaata_id:value});
            } )
    }

    render()
    {
        
        return(<Container style={{backgroundColor:'#eee'}}>
            <Header style={{backgroundColor:'#2250a0'}}>
                <Left>
                    <Icon style={{color:'white'}} onPress={()=>this.props.navigation.goBack()} name="ios-arrow-back"></Icon>
                </Left>
                <Body>
                    <Title>Customer Form</Title>
                </Body>
            </Header>
            <Content>
            <Card style={{marginTop:"10%",width:"90%",marginLeft:20,marginRight:20,height:250}}>
              <CardItem header bordered style={{backgroundColor:'#2250a0'}}>
                  <Text style={{fontSize:20,color:'white'}}>Customer Details</Text>
              </CardItem>
              <CardItem>
                 <Body style={{marginTop:-10}} >
              <Form>

              
        <Item style={{width:"90%",marginBottom:20}} floatingLabel>
          <Label>Customer name</Label>
          <Input autoFocus value={this.state.customer_name} onChangeText= {(val)=> this.setState({customer_name:val})} getRef={(c) =>{this.customer_name = c}} onSubmitEditing={()=>this.contact_no._root.focus()}/>
        </Item>
        <Item  style={{width:"90%"}} floatingLabel >
          <Label>Contact no</Label>
          <Input  keyboardType="phone-pad" value={this.state.contact_no} onChangeText= {(val)=> this.setState({contact_no:val})} getRef={(c) => {this.contact_no=c}}/>
        </Item>
        
 

   
     
        </Form>

        
        </Body>
    
        
     
              </CardItem>
              
          </Card>
          </Content>
        <Footer>
            <FooterTab style={{backgroundColor:'#2250a0'}}>
            <Button onPress={this.submitCustomer}><Text style={{fontSize:16,color:'white'}}>CREATE</Text></Button>

            </FooterTab>
        </Footer>
       
        
          </Container>)
    }
}