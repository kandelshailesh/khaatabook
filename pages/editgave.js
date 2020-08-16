import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView,TextInput} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, DatePicker,Toast} from 'native-base';
import {apiIP} from './api';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { isDate } from 'moment';

export default class EditGave extends React.Component
{
    state={
        amount:0,
        chosenDate: new Date(),
        disabled:false,
        description:''
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
        if(Number(this.state.amount)>0 && isDate(this.state.chosenDate))
        {
        fetch(`${apiIP}/update_transaction`,
        {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({creditamount:this.state.amount,description:this.state.description,transaction_id:this.props.navigation.getParam('transaction_id'),createdAt:this.getLocalDateTime()})
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
                {this.props.navigation.pop(2)},1000);
            }
            else
            {
                Alert.alert("Error");
            }
        })
    }
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

    // UNSAFE_componentWillMount()
    // {
    //     this.setState({amount:this.props.navigation.getParam('amount'),chosenDate:new Date(this.props.navigation.getParam('createdAt'))})
      
    // }
    componentDidMount()
    {
        this.setState({amount:this.props.navigation.getParam('amount'),chosenDate:new Date(this.props.navigation.getParam('createdAt')),description:this.props.navigation.getParam('description')})
        // this.amount._root.focus();
    }
  
    render()
    {
        return(
            <Container>
              <Header style={{backgroundColor:'red'}}>
                  <Left>
                      <Icon  onPress={()=>{this.props.navigation.goBack()}} style={{color:'white'}}  name="arrow-back"></Icon>
                  </Left>
                  <Body>
                      <Title style={{color:'white'}}>Edit Entry Details</Title>
                  </Body>
              </Header>
              <Content>
                  <Form>
                      <Item>
                      <TouchableHighlight>
                          <Input autoFocus ref={(c)=>{this.amount=c}} keyboardType="numeric" defaultValue={this.state.amount.toString()} onChangeText={(val)=>this.setAmount(val)} placeholder="Amount"></Input>
                          </TouchableHighlight>
                      </Item>
                      <Item>
                        
                          <Input value={this.state.description}  onChangeText={(val)=>this.setState({description:val})}  placeholder="Enter Details(Item name,Bill No.,Quantity"></Input>
                      </Item>
                      <Item>
                      {/* <Text>{this.state.chosenDate}</Text> */}

                      <DatePicker
                    
            defaultDate={Date.now()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2022, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={this.formatDate(this.state.chosenDate)}
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "green" }}
            onDateChange={(date)=>this.setDate(date)}
            disabled={false}
            
            />
                      </Item>
                  </Form>
                  </Content>
                  <Footer >
                      <FooterTab style={{backgroundColor:'red'}}>
                  <Button  onPress={this.submitData} style={{marginTop:5}} disabled={this.state.disabled}>
                      <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>SAVE</Text>
                  </Button>
                  </FooterTab>
                  </Footer>
               
               
              
            </Container>
        )
    }
}