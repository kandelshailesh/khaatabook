import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input} from 'native-base';

import {apiIP} from './api';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Customer extends React.Component
{
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       title: navigation.getParam('customername'),
    //     };
    //   };

    state ={
        total_given:0,
        total_receive:0,
        transaction_list_length:-1,
        transaction_list:[]
    }
   
    getCustomerTransaction = () =>
    {
        fetch(`${apiIP}/transaction_of_customer`,
        {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({customer_id:this.props.navigation.getParam('id')})
        }).then((response)=> response.json()).then((response)=>
        {
            console.log(response.transaction_list.length);
            if(response.transaction_list.length>0)
            {
            this.setState({total_given:response.transaction_summary[0].creditamount,total_receive:response.transaction_summary[0].debitamount,transaction_list:response.transaction_list,transaction_list_length:response.transaction_list.length});
            }
            else
            {
                this.setState({transaction_list_length:0})
            }
        })
    }
    componentDidMount()
    {
     this.getCustomerTransaction();
    }
    handlePress = () =>
    {
        this.props.navigation.navigate("Gave");
        // Alert.alert('hEllo');
    }

    renderitem  = ({item})=>
    {
   console.log(item.description)
       
   if(item.creditamount > item.debitamount )
    {
        return(<TouchableOpacity onPress={()=>this.props.navigation.navigate("EntryDetailsGave",{description:item.description,customername:this.props.navigation.getParam('customername'),transaction_id:item._id,credit:true,customer_id:this.props.navigation.getParam('id'),amount:item.creditamount,createdAt:new Date(item.createdAt).toISOString().split('T')[0]})}><View><View style={{width:"100%",marginTop:5,padding:10,backgroundColor:'white',height:45,flexDirection:'row',flexWrap:'wrap'}}>
              <View style={{width:"50%",marginTop:2}}>
                  <Text  style={{fontSize:14}}>{new Date(item.createdAt).toISOString().split('T')[0]} {new Date(item.createdAt).toISOString().split('T')[1].split('.')[0] }</Text>
              </View>
              <View style={{width:"25%"}}>
                  <Text style={{color:'red',fontWeight:'bold'}}>Rs.{item.creditamount}</Text>
              </View>
              <View style={{width:"25%"}}>
                  <Text></Text>
              </View>
              </View></View></TouchableOpacity>)
    }
    else
    {
              return(<TouchableOpacity onPress={()=>this.props.navigation.navigate("EntryDetailsGet",{description:item.description,customername:this.props.navigation.getParam('customername'),debit:true,customer_id:this.props.navigation.getParam('id'),amount:item.debitamount,transaction_id:item._id,createdAt:item.createdAt})}><View>
              <View style={{width:"100%",marginTop:5,padding:10,backgroundColor:'white',height:45,flexDirection:'row',flexWrap:'wrap'}}>
              <View style={{width:"50%",marginTop:2}}>
                  <Text  style={{fontSize:14}}>{new Date(item.createdAt).toISOString().split('T')[0]} {new Date(item.createdAt).toISOString().split('T')[1].split('.')[0] }</Text>
              </View>
              <View style={{width:"25%"}}>
              <Text></Text>
              </View>
              <View style={{width:"25%"}}>
                  <Text style={{color:'green',fontWeight:'bold'}}>Rs.{item.debitamount}</Text>
              </View>
              </View>
              </View>
              </TouchableOpacity>)
    }
              
    }
render()
{
    return(
        <>
            <NavigationEvents onDidFocus= {this.getCustomerTransaction}></NavigationEvents>

        <Container>
            <Header style={{borderBottomColor:'#eee',backgroundColor:'#2250a0',borderBottomWidth:1}}>
        <Left>
            <Icon onPress={()=>{this.props.navigation.goBack()}} style={{color:'white'}} name="arrow-back"></Icon>
        </Left>

<Body style={{marginLeft:-80}}>
<View style={{width:200,flexDirection:'row'}}>
        <View style={{width:35,height:35,marginTop:5,borderRadius:50,justifyContent:'center',borderWidth:1,borderColor:'white',backgroundColor:'#2250a0'}}>
        <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>{this.props.navigation.getParam('customername')[0].toUpperCase()}</Text>
        </View>
        <View>
        <Button style={{backgroundColor:'#2250a0'}} transparent>
        <Text style={{color:'white',fontWeight:'bold'}}>{this.props.navigation.getParam('customername')}</Text>
        </Button>
        </View>
      
        </View>
{/* {/* <Title>{this.props.navigation.getParam('customername')}</Title> */}
</Body> 
        </Header>
            <Content style={{backgroundColor:'#eee'}}>

           { this.state.transaction_list_length < 0 ? <><ActivityIndicator color="#4050b5"></ActivityIndicator></> : <></>}
    {this.state.total_given === 0 && this.state.total_receive ===0 && this.state.transaction_list_length ===  0 ? <><Text style={{marginLeft:"30%",marginTop:"155%"}}>Add First Transaction of {this.props.navigation.getParam('customername')}</Text><Icon style={{marginLeft:"50%",color:'blue'}} name="arrow-down"></Icon></> :<></>}
     {this.state.transaction_list_length > 0? <><View style={{height:120,backgroundColor:'#2250a0'}}>
            <Content padder>
            <Card style={{height:80}}>
                <CardItem bordered>
                    <Body>
                  <View style={{width:"100%",height:30,justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
    { this.state.total_given - this.state.total_receive > 0 ? <Text style={{color:"red",fontWeight:"bold"}}>You will get Rs.{Math.abs(this.state.total_given - this.state.total_receive).toFixed(2)} </Text>  : <Text style={{color:"green",fontWeight:"bold"}}>You will give Rs.{Math.abs(this.state.total_given - this.state.total_receive).toFixed(2)}</Text>} 
                      </View>
          
                    </Body>
                </CardItem>
                
            </Card>
            </Content>
    </View>       
 <Content padder>
        <View style={{width:"100%",height:30,flexDirection:'row',flexWrap:'wrap'}}>
                  <View style={{width:"50%"}}>
                      <Text style={{fontSize:12}}>ENTRIES</Text>
                  </View>
                  <View style={{width:"25%"}}>
                      <Text style={{fontSize:12}}>YOU GAVE</Text>
                  </View>
                  <View style={{width:"25%"}}>
                      <Text style={{fontSize:12}}>YOU GOT</Text>
                  </View>
                  </View>
                  
        <FlatList inverted style={{
  flexGrow: 0 }} keyExtractor={(item, index) => index.toString()} data={this.state.transaction_list} renderItem ={this.renderitem
    }/>
                  </Content>
                  </>:<></>
}
            </Content>

        
            <Footer style={{backgroundColor:'white'}}>
          
                    <Button onPress={()=>this.props.navigation.navigate('Gave',
                    {customername:this.props.navigation.getParam('customername'),customer_id:this.props.navigation.getParam('id')})} style={{backgroundColor:'red',marginBottom:5,marginTop:5}}>
                        <Text style={{color:'white'}}>You gave Rs.</Text>
                    </Button>
                    <Button onPress={()=>this.props.navigation.navigate('Got',{customername:this.props.navigation.getParam('customername'),customer_id:this.props.navigation.getParam('id')})} style={{marginLeft:20,backgroundColor:'green',marginTop:5}}>
                        <Text style={{color:'white'}}>You got Rs.</Text>
                    </Button>
                
            </Footer>
      
        </Container>
        </>
    )
}
}