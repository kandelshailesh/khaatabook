import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView,AsyncStorage} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, DatePicker, Toast} from 'native-base';
import {apiIP} from './api';

export default class Get extends React.Component
{
    state={
        amount:0,
        chosenDate: new Date(),
        disabled:true,
        khaata_id:'',
        user_id:''
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

      getLocalDateTime = () =>
    {
        const t = new Date(this.state.chosenDate);
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
        body:JSON.stringify({customer_id:this.props.navigation.getParam('customer_id'),user_id:this.state.user_id,debit:true,debitamount:this.state.amount,createdAt:this.getLocalDateTime(),khaatabookid:this.state.khaata_id})
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
                      <Icon  onPress={()=>{this.props.navigation.goBack()}} style={{color:'green'}} name="arrow-back"></Icon>
                  </Left>
                  <Body>
                      <Title style={{color:'green',fontSize:15}}>{this.props.navigation.getParam('customername')} gave you Rs.{this.state.amount==='' ? 0 : this.state.amount}</Title>
                  </Body>
              </Header>
              <Content>
                  <Form>
                      <Item>
                          
                          <Input keyboardType="number-pad"  value={this.state.amount}  onChangeText={(val)=>this.setAmount(val)} placeholder="Amount"></Input>
                      </Item>
                      <Item>
                        
                          <Input placeholder="Enter Details(Item name,Bill No.,Quantity"></Input>
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
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "green" }}
            
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