import React, { useState } from 'react';
import {View,Modal,Alert,FlatList, SafeAreaView, ScrollView,Platform,PermissionsAndroid,TouchableOpacity, RefreshControl, AsyncStorage} from 'react-native';
import {Header,Text,Container,Content,Left,Right,Body,Footer,FooterTab,ListItem,Title,Button,Icon,Fab,Card,CardItem,Form,Label,Picker, Item, Input, CheckBox} from 'native-base';

import {NavigationEvents} from 'react-navigation';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Summary from './summary_status';
import {apiIP} from './api';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default class MainPage extends React.Component
{
 
    
    
    state={
        modalVisible:false,
        checked:false,
        customerlength:true,
        searchcustomer:false,
        filePath:'',
        customerList:[],
        khaatabook_list:[],
        total_given:0,
        total_receive:0,
        refreshing:false,
        filter:false,
        filterTitle:'',
        modal1_Visible:false,
        khaata_id:'',
        user_id:'',
        selected_khaata:'',
        khaatabook_header:'',
        // customerList:[{id:'1','customername':'Shailesh','amount':-3000},
        // {id:'2','customername':'Damu Gaurav','amount':3000},
        // {id:'3','customername':'Pradeep','amount':5000},
        // {id:'4','customername':'Shailesh','amount':-3000},
        // {id:'5','customername':'Damu Gaurav','amount':3000},
        // {id:'6','customername':'Pradeep','amount':5000},{id:'12','customername':'Shailesh','amount':-3000},
        // {id:'7','customername':'Damu Gaurav','amount':3000},
        // {id:'8','customername':'Pradeep','amount':5000},
        // {id:'9','customername':'Shailesh','amount':-3000},
        // {id:'10','customername':'Damu Gaurav','amount':3000},
        // {id:'11','customername':'Pradeep','amount':5000}],
        copy_customerlist:[],
        customername:null
    }

    show_search_box = () =>
    {
        // this.setState({searchcustomer:true,customerlength:true})

            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            
        this.customerRef._root.focus();
            
      
    }
    async createPDF()
      {
        let options = {
          //Content to print
          html:
            '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><table border="1"><tr><th>S.N</th><th>Date</th><th>Description</th><th>Debit amount</th><th>Credit amount</th></tr><tr><td>1</td><td>2020-03-50</td><td>Hello guys</td><td>2500</td><td></td></tr></table><p style="text-align: center;"><strong>Team About React</strong></p>',
          //File Name
          fileName: 'test',
          //File directory
          directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
        this.setState({filePath:file.filePath});
      }
      
    askPermission= () =>{
        var that = this;
        
        async function requestExternalWritePermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'CameraExample App External Storage Write Permission',
                message:
                  'CameraExample App needs access to Storage data in your SD Card ',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //If WRITE_EXTERNAL_STORAGE Permission is granted
              //changing the state to show Create PDF option

              that.createPDF();
            } else {
              alert('WRITE_EXTERNAL_STORAGE permission denied');
            }
          } catch (err) {
            alert('Write permission err', err);
            console.warn(err);
          }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
          requestExternalWritePermission();
        } else {
            
          this.createPDF();
        }
      }

      onRefresh = () =>
      {
          this.setState({refreshing:true},() => {this.refreshCustomerData});
      }

      onFilter = (filterTitle) =>
      {
        if(filterTitle === "receivable" || filterTitle === "payable" || filterTitle === "zero")
        {
           const new_data= this.state.copy_customerlist.filter((customer)=>
            {
                if(filterTitle==="receivable")
                {
                return customer.creditamount > customer.debitamount;
                }
                else if(filterTitle === "payable")
                {
                return customer.debitamount > customer.creditamount;
                }
                else if (filterTitle === "zero")
                {
                    return customer.creditamount - customer.debitamount ===0 
                }
            })
            this.setState({customerList:new_data,filter:true,filterTitle:filterTitle});
        }
        else
        {
            this.setState({customerList:this.state.copy_customerlist})
        }

            // console.log(new_data);
        
      }

      getKhaatabookList = () =>
      {
          fetch(`${apiIP}/khaatabook`,{
              method:'post',
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'        
              },
              body:JSON.stringify({user_id:this.state.user_id})
          }).then((response)=>response.json()).then((response)=>
          {
              console.log(response);
              this.setState({khaatabook_list:response.khaatabookList,modal1_Visible:true});
          })
      }
    
      _storeData = async (response) => {
        console.log(response);
        try {
            await AsyncStorage.setItem('khaata_id',response._id);
            await AsyncStorage.setItem('khaatabook_name',response.khaatabookname);


        } catch (error) {
         
            console.log(error);
        }
      };
      handleCheckBox = (result) =>
      {
        this._storeData(result).then((value)=>
        {
        

            this.setState({khaata_id:result._id,modal1_Visible:false,khaatabook_header:result.khaatabookname},()=>this.getCustomerData());
 

            // this.props.navigation.navigate('Home');

        })
        
      }
    //   componentDidUpdate()
    //   {
    //       this.refreshCustomerData();
    //   }
      refreshCustomerData = () =>
      {
        fetch(`${apiIP}/transaction_by_user`,
        {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({khaata_id:this.state.khaata_id})
        }).then((response)=> response.json()).then((response)=>
        {
            var will_get= 0;
            var will_give=0;

            if(response.transaction_summary.length>0)
            {

            response.transaction_summary.forEach((result,i)=>
            {
            console.log(result);

                
               
                if(result.creditamount > result.debitamount)
                {
                    will_give = will_give + Math.abs(result.creditamount - result.debitamount)
                }
                else
                {
                    will_get = will_get + Math.abs(result.creditamount - result.debitamount)
                }
                if(response.transaction_summary.length === i+1)
                {
                    this.setState({customerList:response.transaction_summary,copy_customerlist:response.transaction_summary,total_given:will_give.toFixed(2),total_receive:will_get.toFixed(2)});
                }
            
            })
            
        }
        else
        {
            this.setState({customerList:response.transaction_summary,copy_customerlist:response.transaction_summary,total_given:will_give.toFixed(2),total_receive:will_get.toFixed(2)});
        }
          
        })
      }

      getCustomerData = () =>
      {
        fetch(`${apiIP}/transaction_by_user`,
        {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({khaata_id:this.state.khaata_id})
        }).then((response)=> response.json()).then((response)=>
        {
            var will_get= 0;
            var will_give=0;
            if(response.transaction_summary.length>0)
            {

            response.transaction_summary.forEach((result,i)=>
            {
            console.log(result);

                
               
                if(result.creditamount > result.debitamount)
                {
                    will_give = will_give + Math.abs(result.creditamount - result.debitamount)
                }
                else
                {
                    will_get = will_get + Math.abs(result.creditamount - result.debitamount)
                }
                if(response.transaction_summary.length === i+1)
                {
                    this.setState({customerList:response.transaction_summary,copy_customerlist:response.transaction_summary,total_given:will_give.toFixed(2),total_receive:will_get.toFixed(2)});
                }
            
            })
            
        }
        else
        {
            this.setState({customerList:response.transaction_summary,copy_customerlist:response.transaction_summary,total_given:will_give.toFixed(2),total_receive:will_get.toFixed(2)});
        }
        })
    
      }
    //   UNSAFE_componentWillMount()
    //   {
    //       this.getCustomerData();
    //   }
      
        componentDidMount()
      {
        // this.getCustomerData;
        AsyncStorage.getItem('user_id').then(value=> this.setState({user_id:value}))
        AsyncStorage.getItem('khaatabook_name').then(value=> this.setState({khaatabook_header:value}))


      AsyncStorage.getItem('khaata_id').then(value=>
            {
                this.setState({khaata_id:value})
        this.getCustomerData;

            })

      }
    searching = (search_data) =>
    {
       const new_data= this.state.copy_customerlist.filter((customer)=>
        {
            var convert_search_data =   search_data.toUpperCase();
            var convert_customer_data = customer.customers.customername.toUpperCase();
            return convert_customer_data.indexOf(convert_search_data) > -1;


        })
        // console.log(new_data);
        this.setState({customerList:new_data,customername:search_data});
    }
    render_item= ({item})=>
    {
    //   console.log(item);
      
      if(item.creditamount>item.debitamount)
      {
        return  ( 
           <Content  padder>
    <Item onPress={() => this.props.navigation.navigate('Customer',{id:item.customers._id,customername:item.customers.customername})}>
    <View style={{width:200,height:50,flexDirection:'row'}}>
        <View style={{width:40,height:40,borderRadius:50,justifyContent:'center',backgroundColor:'#2250a0'}}>
        <Text style={{textAlign:'center',color:'white'}}>{item.customers.customername[0].toUpperCase()}</Text>
        </View>
        <View style={{justifyContent:'center',marginLeft:10,marginTop:-5}}>
        <Text style={{color:'black'}}>{item.customers.customername}</Text>
        </View>
      
        </View>
        <Right>
            <Text  style={{color:'red',fontSize:15,fontWeight:'bold',opacity:0.9,includeFontPadding:true}}>Rs. {Math.abs(item.creditamount-item.debitamount).toFixed(2)}</Text>
            <Text style={{opacity:0.5}}>You'll get</Text>
        </Right>
    </Item>
    </Content>
    )
      }
        else if(item.debitamount > item.creditamount)
        {
        return (
            <Content padder>          
             <Item  onPress={() => this.props.navigation.navigate('Customer',{id:item.customers._id,customername:item.customers.customername})}>
             <View style={{width:200,height:50,flexDirection:'row'}}>
        <View style={{width:40,height:40,borderRadius:50,justifyContent:'center',backgroundColor:'#2250a0'}}>
        <Text style={{textAlign:'center',color:'white'}}>{item.customers.customername[0].toUpperCase()}</Text>
        </View>
        <View style={{justifyContent:'center',marginLeft:10,marginTop:-5}}>
        <Text style={{color:'black'}}>{item.customers.customername}</Text>
        </View>
      
        </View>
            <Right>
            <Text  style={{color:'green',fontSize:15,fontWeight:'bold',opacity:0.9,includeFontPadding:true}}>Rs. {Math.abs(item.creditamount-item.debitamount).toFixed(2)}</Text>
            <Text style={{opacity:0.5}}>You'll give</Text>
            </Right>
        </Item>
        </Content>
      
        )
    }
    else
    {
        return (
            <Content padder>          
             <Item  onPress={() => this.props.navigation.navigate('Customer',{id:item.customers._id,customername:item.customers.customername})}>
             <View style={{width:200,height:50,flexDirection:'row'}}>
        <View style={{width:40,height:40,borderRadius:50,justifyContent:'center',backgroundColor:'#2250a0'}}>
        <Text style={{textAlign:'center',color:'white'}}>{item.customers.customername[0].toUpperCase()}</Text>
        </View>
        <View style={{justifyContent:'center',marginLeft:10,marginTop:-5}}>
        <Text style={{color:'black'}}>{item.customers.customername}</Text>
        </View>
      
        </View>
            <Right>
                <Text style={{color:'#000'}}>Rs.{Math.abs(item.creditamount-item.debitamount).toFixed(2)}</Text>
               
            </Right>
        </Item>
        </Content>
      
        )

    }
  }
  
    render()
    {
return(
<>
<NavigationEvents onDidFocus={this.getCustomerData} />
{/* <Container style={[this.state.modalVisible ? {backgroundColor: 'rgba(0,0,0,0.8)'} : '']}> */}
    <Container>

    <Header style={{backgroundColor:'#2250a0',height:60}}>
        <Left></Left>

{/* <Body> */}
<TouchableOpacity onPress={()=>this.getKhaatabookList()}>
    <View style={{flexDirection:'row',marginTop:20,alignContent:'center',justifyContent:'space-between',width:200}}>
        <View>
        {/* <Text style={{color:'white',fontWeight:'bold'}}>{this.props.screenProps}</Text>
         */}
         <Text style={{color:'white',fontWeight:'bold'}}>{this.state.khaatabook_header}</Text>

        </View>
        <View>
        <Icon style={{color:'white'}} name="ios-arrow-down"></Icon>

        </View>
    </View>
    </TouchableOpacity>

    <Modal
      transparent={true}

    
        visible={this.state.modal1_Visible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          this.setState({modal1_Visible:false})
        }}
      >   
      <View style={{height:"100%",backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor:'rgba(0,0,140,1)',padding:20}}>

              {this.state.khaatabook_list.map((result) => {
                 return(<ListItem>
                  <CheckBox onPress={()=> this.handleCheckBox(result)} checked={result._id === this.state.khaata_id ? true :false } style={{width:20,height:20,borderRadius:50}}></CheckBox>
                  <Body>
                  <Text style={{fontSize:20,color:"white"}}>{result.khaatabookname}</Text>
                  </Body>
              </ListItem>)
              })}
              
              <ListItem>
              <Button style={{padding:20}} rounded><Icon name="ios-add"></Icon><Text>Create new khaatabook</Text></Button>

              </ListItem>
          </View>
          <View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Text>He</Text></View>
          </View>
          </Modal>


{/* <Picker mode="dropdown" supportedOrientations={['portrait', 'landscape']}
        
                style={{ width: 200, color:'white'}}
                
                itemStyle={{fontSize:20,fontWeight:'bold'}}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "white" }}
                placeholderIconColor="white"
                // selectedValue={"key2"}
                
                // onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker> */}
            
{/* </Body> */}
<Right>
    <Button transparent>
<Icon name="settings"></Icon>
</Button>
</Right>
        </Header>
  
            {/* <Button onPress={this.askPermission}><Text>Create PDF</Text></Button> */}
        
   
        <Summary given= {this.state.total_given} receive = {this.state.total_receive}></Summary>
    <Item>
      <Item style={{width:"70%"}}>
      {this.state.customerlength && <Icon onPress={this.show_search_box} style={{color:'#4050B5',fontSize:30,fontWeight:'bold',marginLeft:4}} name="ios-search"></Icon>}
{this.state.customerlength && <Button transparent style={{width:90}} onPress={this.show_search_box}>
    <Text style={{marginLeft:-22,fontSize:10}}>{`${this.state.customerList.length} Customers`} </Text></Button> }
  {this.state.searchcustomer && <Input ref={(c) =>{this.customersRef = c}} value={this.state.customername} onChangeText={(val)=>this.searching(val)} placeholder="Search name" returnKeyType={"done"}></Input>}
  
  <Input style={{marginLeft:-20,width:100}} ref={(c) =>{this.customerRef = c}} value={this.state.customername} onChangeText={(val)=>this.searching(val)} placeholder="Search name" returnKeyType={"done"}></Input>
      </Item>
      <Item style={{width:"30%"}}>
      {this.state.searchcustomer && <Button onPress={()=>this.setState({customerlength:true,searchcustomer:false})} transparent><Text style={{color:'red',fontFamily:'Arial',fontWeight:'bold'}}>&#10006;</Text></Button>}

      {this.state.customerlength && <Button onPress={()=> this.setState({'modalVisible':true})} small transparent><Icon name="shuffle"/></Button>}

    
      {this.state.customerlength && <Button  transparent><Text>PDF</Text></Button>}
   
      </Item>
       </Item>

          {/* <Button onPress={()=> this.setState({modalVisible:true})} style={{width:180,marginTop:'66%',marginLeft:'50%',backgroundColor:'#F5678D'}} rounded >
          <Icon name="ios-person"></Icon>
          <Text style={{color:'white',fontWeight:'bold'}}>ADD CUSTOMER</Text>
      </Button> */}

{/* style={{height: 280,
  flexGrow: 0 }} */}
  {/* <Text>
      {this.state.khaata_id}
  </Text> */}

  <Content>
<FlatList refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=> this.onRefresh }/>}  style={{
  flexGrow: 0 }} keyExtractor={(item, index) => index.toString()} data={this.state.customerList} renderItem={this.render_item}
       />
      
      </Content>
          <Modal
      transparent={true}

    
        visible={this.state.modalVisible}
        onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
          this.setState({modalVisible:false})
        }}
      >
          <View style={{height:'65%',backgroundColor:'rgba(0,0,0,0.5)'}}></View>
          <View style={{position:'absolute',bottom:0,height:"35%",backgroundColor:'white'}}>
          <View style={{flexDirection:'row',backgroundColor:'white',alignContent:'center',alignItems:'center',justifyContent:'space-evenly',width:"100%",height:"75%"}}>
              <View><Button onPress={()=>this.onFilter('all')} style={{width:60,height:60,borderRadius:50,justifyContent:'center',backgroundColor:'#2250a0'}}><Text>ALL</Text></Button><Text style={{textAlign:'center',marginTop:3}}>ALL</Text></View>
              <View><Button onPress={()=>this.onFilter('receivable')} style={{width:60,marginLeft:5,height:60,borderRadius:50,justifyContent:'center',backgroundColor:'rgba(255,0,0,1)'}}><Text style={{fontSize:30,marginTop:12,color:'white'}}  >___</Text></Button><Text style={{textAlign:'center',marginTop:3}}>Receivables</Text></View>
              <View><Button onPress={()=>this.onFilter('payable')} style={{width:60,height:60,borderRadius:50,justifyContent:'center',backgroundColor:'green'}}><Text style={{fontSize:29,color:'white'}}>+</Text></Button><Text style={{textAlign:'center',marginTop:3}}>Payables</Text></View>
              <View><Button onPress={()=>this.onFilter('zero')} style={{width:60,height:60,borderRadius:50,justifyContent:'center',backgroundColor:'white'}}><Text style={{fontSize:29,color:'#2250a0'}}>0</Text></Button><Text style={{textAlign:'center',marginTop:3}}>Settled</Text></View>
              </View>
              <View style={{marginHorizontal:10}}>
              <Button onPress={()=> this.setState({modalVisible:false})} style={{justifyContent:'center',alignItems:'center'}} ><Text>Done</Text></Button>
          </View>
          
          </View>
          
              {/* <Card style={{marginTop:"70%",height:200}}>
                  <CardItem header bordered>
                            <Body>
                                <Button rounded><Text>ALL</Text></Button>
                                <Button rounded><Text>-</Text></Button>
                                <Button rounded><Text>+</Text></Button>
                                <Button rounded><Text>-</Text></Button>

                            </Body>
                  </CardItem>
              </Card>
           */}
          </Modal>
   {this.state.filter &&<View style={{
   position: 'absolute',
   bottom: 110,
   right: 10,
   width: 160, 
   height: 30,
   borderRadius: 50,
   
}}>
    <Button style= {{backgroundColor:'red'}} onPress={()=>this.setState({filter:false,customerList:this.state.copy_customerlist})} rounded small><Text>Remove Filter &#10006; </Text></Button>
</View> }
          <View style={{
   position: 'absolute',
   bottom: -15,
   right: 10,
   width: 200, 
   height: 120,
   borderRadius: 20,
   
}}>

    {/* #3dc */}
    <Button style={{backgroundColor:'#2250a0'}} onPress={()=> this.props.navigation.navigate('CustomerForm')} rounded>
    <Icon   style={{color:'white',marginTop:1}} name="ios-person-add">
           
           </Icon>
           <Text style={{color:'white',fontSize:17,marginLeft:-10}}>ADD CUSTOMER</Text>
    </Button>
         
</View>

<Footer>
          <FooterTab style={{backgroundColor:'#2250a0'}}>
            <Button>
              <Text>Apps</Text>
            </Button>
            <Button>
              <Text>Camera</Text>
            </Button>
            <Button>
              <Text>Navigate</Text>
            </Button>
            <Button>
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>

{/* 
          <Fab containerStyle={{bottom:30,right:20}} style={{width:280,backgroundColor:'#4050B5'}}  active direction="up" position="bottomRight">

           <Icon  onPress={()=> this.props.navigation.navigate('CustomerForm')} style={{color:'white',marginTop:1,marginLeft:-100}} name="ios-person-add">
           <Text style={{color:'white',fontSize:17}}>  ADD CUSTOMER</Text>
           </Icon>
         
          <Button onPress={()=> this.setState({modalVisible:true})} style={{width:180,marginTop:-10,backgroundColor:'#F5678D'}} rounded >
          <Icon name="ios-person"></Icon>
          <Text style={{color:'white',fontWeight:'bold'}}>ADD CUSTOMER</Text>
          
      </Button>
          </Fab> */}
          {/* <Fab active direction="up" position="bottomRight">
          <Icon  onPress={()=> this.setState({modalVisible:true})} name="add"></Icon>
          <Button onPress={()=> this.setState({modalVisible:true})} style={{width:180,marginTop:-10,backgroundColor:'#F5678D'}} rounded >
          <Icon name="ios-person"></Icon>
          <Text style={{color:'white',fontWeight:'bold'}}>ADD CUSTOMER</Text>
          
      </Button>
          </Fab> */}
 
{/*         
        <Footer style={{backgroundColor:'white'}}>
           
       <Right>
          <Button onPress={()=> this.setState({modalVisible:true})} style={{width:180,marginTop:-10,backgroundColor:'#F5678D'}} rounded >
          <Icon name="ios-person"></Icon>
          <Text style={{color:'white',fontWeight:'bold'}}>ADD CUSTOMER</Text>
          
      </Button>
      </Right> */}
           {/* <Button full>
              <Text style={{color:'white'}}>Developer:Er.Shailesh Kandel</Text>
            </Button> */}
        
      {/* </Footer>  */}
      </Container>

    
 </>  )
   
    }

}