import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView,AsyncStorage} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, DatePicker,Toast} from 'native-base';
import moment from 'moment';
import {apiIP} from './api';

export default class Gave extends React.Component
{
    state={
        amount:0,
        chosenDate: new Date(),
        disabled:true,
        description:'',
        khaata_id:'',
        user_id:''
    }
    
    getLocalDateTime = () =>
    {
        const t = new Date(this.state.chosenDate);
        // const a = new Date().toISOString();

const z= t.getTimezoneOffset()*60000;
var tlocal = t-z;
tlocal= new Date(tlocal);
const iso=tlocal.toISOString();
return iso;
    }

    submitData = () =>
    {
        fetch(`${apiIP}/transaction`,
        {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({customer_id:this.props.navigation.getParam('customer_id'),user_id:this.state.user_id,credit:true,description:this.state.description,creditamount:this.state.amount,createdAt:this.getLocalDateTime(),khaatabookid:this.state.khaata_id})
        }).then((response)=> response.json()).then((response)=>
        {
            console.log(response);
            if(response.success)
            {
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
                {this.props.navigation.goBack()},1000);
            }
            else
            {
                Alert.alert("Error");
            }
        })
    }
    formatDate = date => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      };

    setAmount(val)
    {
        console.log("Value is",val);
        if(val > 0)
        {
        this.setState({amount:Number(val),disabled:false})
        }
        else
        {
            this.setState({amount:Number(0),disabled:true})
        }
            
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    componentDidMount()
    {
        AsyncStorage.getItem('khaata_id').then(value =>
            {
               this.setState({khaata_id:value});
            } )
            AsyncStorage.getItem('user_id').then(value =>
                {
                   this.setState({user_id:value});
                } )
    }
    render()
    {
        return(
            <Container>
              <Header transparent>
                  <Left>
                      <Icon  onPress={()=>{this.props.navigation.goBack()}} style={{color:'red'}}  name="arrow-back"></Icon>
                  </Left>
                  <Body>
                      <Title style={{color:'red',fontSize:15}}>You gave Rs.{this.state.amount} to {this.props.navigation.getParam('customername')}</Title>
                  </Body>
              </Header>
              <Content>
                  <Form>
                      <Item>
                      
                          <Input keyboardType="numeric" value={this.state.amount} onChangeText={(val)=>this.setAmount(val)} placeholder="Amount"></Input>
                      </Item>
                      <Item>
                        
                          <Input value={this.state.description} onChangeText={(val)=>this.setState({description:val})} placeholder="Enter Details(Item name,Bill No.,Quantity"></Input>
                      </Item>
                      <Item>
                      <DatePicker
                    
            defaultDate={Date.now()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2022, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={this.formatDate(new Date())}
            textStyle={{ color: "red" }}
            placeHolderTextStyle={{ color: "red" }}
            onDateChange={(date)=>this.setDate(date)}
            disabled={false}
            
            />
                      </Item>
                  </Form>
                  <Body>
                  <Button onPress={this.submitData} style={{marginTop:15}} disabled={this.state.disabled}>
                      <Text>SAVE</Text>
                  </Button>
                  </Body>
              </Content>
            </Container>
        )
    }
}