import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input} from 'native-base';

import {apiIP} from './api';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class EntryDetails extends React.Component 
{

render()
{
    const navigation= this.props.navigation;
    return(
    <><Container>
    <Header>
        <Left>
            <Icon name="arrow-back" style={{color:'white'}}></Icon>
        </Left>
        <Body>
           <Title>Entry Details</Title>
        </Body>
        <Right>
            <Button onPress={()=> this.props.navigation.navigate('EditGet',{customername:this.props.navigation.getParam('customername'),transaction_id:this.props.navigation.getParam('transaction_id'),credit:true,customer_id:this.props.navigation.getParam('customer_id'),amount:this.props.navigation.getParam('amount'),createdAt:this.props.navigation.getParam('createdAt'),description:this.props.navigation.getParam('description')})} style={{backgroundColor:'white'}} small>
                <Text style={{color:'black'}}>EDIT</Text>
            </Button>
        </Right>
        </Header>
        <View style={{flex:1,width:"100%",padding:20,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>
          <Card style={{width:"100%",height:100}}>
                            <CardItem style={{justifyContent:'center'}}>
                            <Text>{this.props.navigation.getParam('customername')} gave</Text>
                             <Text style={{fontWeight:'bold',padding:20,fontSize:20,color:'green'}}>Rs.{this.props.navigation.getParam('amount')}</Text>
                    
                            </CardItem>
                        </Card>

                    </View>
           
       
        <Footer>
            <FooterTab>
                <Button style={{backgroundColor:'red'}}>
                    <Icon name="trash" active  style={{color:'white'}}><Text style={{color:'white',marginTop:-10,fontSize:19,fontWeight:'bold'}}> DELETE TRANSACTION</Text></Icon>
                    
                </Button>
            </FooterTab>
        </Footer>
                        
    </Container></>
    )

}
}
