import React, { useState } from 'react';
import {View,Text} from 'react-native';
import {Header,Container,Content,Left,Right,Body,Button,Icon,Card,CardItem} from 'native-base';

export default class Summary extends React.Component
{
    render()
    {
        return(
            <View  style={{height:140,borderTopColor:'#eee',borderTopWidth:1,backgroundColor:'#2250a0'}}>
            <Content padder>
            <Card style={{height:110}}>
                <CardItem style={{height:65}} bordered>
                    <Body>
                  <View style={{width:"100%",height:30,flexDirection:'row',flexWrap:'wrap'}}>
                      <View style={{width:"50%",alignItems:'center',borderRightWidth:1,borderRightColor:'#eee'}}>
                          <Text style={{color:"green",fontWeight:"bold",fontSize:20}}>Rs.{this.props.receive}</Text>
                          <Text style={{fontSize:10}}>You will give</Text>
                      </View>
                      
                      <View style={{width:"50%",alignItems:'center'}}>
                          <Text style={{color:"red",fontWeight:"bold",fontSize:20}}>Rs.{this.props.given}</Text>
                          <Text style={{fontSize:10}}>You will get</Text>
                      </View>
                  </View>
                    </Body>
                </CardItem>
                
                <CardItem button bordered footer>
                   <View style={{width:'98%',height:20,justifyContent:'center',alignItems:'center'}}>
                    <Button transparent>
                    <Text style={{color:'blue'}}>VIEW REPORT</Text>
                    <Icon name="arrow-forward" style={{color:'blue'}}></Icon>
</Button>  
</View>
                
                       
                    
                </CardItem>
            </Card>
            </Content>
        </View>
        )
    }
}