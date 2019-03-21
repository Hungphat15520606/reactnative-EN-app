import React, { Component } from 'react';
import { AppRegistry , FlatList , StyleSheet, Text, TextInput,Dimensions, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import FlatListData from '../data/FlatListData';
import Modal from 'react-native-modalbox'
import Button from 'react-native-button'


var screen = Dimensions.get('window')
export default class AddItem extends Component {
    constructor(props){
        super(props);
        this.state={
            newtxtEn:'',
            newtxtVn:'',
        }
        this.showAddItem=this.showAddItem.bind(this);    
    }
      
    showAddItem(){
    this.refs.Modal.open();
    }

    RandomKey=(num)=>{
      return require('random-string')({length:num});
    }

  render() {
    return (
      <Modal ref={"Modal"}
        style={{
            justifyContent:"center",
            borderRadius: 30,
            shadowRadius: 10,
            width: screen.width-80,
            height: 280
        }}
        position='center'
        backdrop={true}
        >
    <View style={{
        flex:1,
        flexDirection:"column",
        justifyContent: 'center',
        alignItems:'center'}}
    >
        <Text style={{
            fontSize:16,
            fontWeight:'bold',
            textAlign:'center',
            marginTop:10,
        }}
        >NEW FOOD'S INFOMATION</Text>
        <TextInput 
        style={{
            width: 200, 
            height:40,
            borderBottomColor:'gray',
            marginLeft:30,
            marginRight:30,
            marginTop:20,
            marginBottom:10,
            borderBottomWidth:1,
            textAlign:'center'
        }}
        onChangeText={(text)=> this.setState({newtxtEn:text})}
        value={this.state.newtxtEn}   
        placeholder="Nhập từ tiếng Anh">
        </TextInput>
        <TextInput 
        style={{
            width: 200, 
            height:40,
            borderBottomColor:'gray',
            marginLeft:30,
            marginRight:30,
            marginTop:20,
            marginBottom:10,
            borderBottomWidth:1,
            textAlign:'center'
        }}
        onChangeText={(text)=> this.setState({newtxtVn:text})}
        value={this.state.newtxtVn}   
        placeholder="Nhập nghĩa Tiếng Việt của từ">
        </TextInput>
        <Button
        style={{
            color:'white',
            backgroundColor: 'mediumseagreen',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft:25,
            paddingRight:25,
            height:36,
            borderRadius:6
        }}
        onPress={()=>{
            if(this.state.newtxtEn.length ==0|| this.state.newtxtVn.length==0)
            {
                alert(" Một trong hai trường bạn đã bỏ trống! ")
                return;
            }
            const newkey=this.RandomKey(24)
            const newFood={
                key:   newkey,
                en: this.state.newtxtEn,
                imageUrl: "http://www.freedigitalphotos.net/images/category-images/183.jpg",
                vn: this.state.newtxtVn,
            };
            FlatListData.push(newFood);
            this.props.parentFlatList.refreshFlatList(newkey);
            this.props.parentFlatList.crollToEndFlatList();
            this.refs.Modal.close();           
        }}
        >Save</Button>
        </View> 
    </Modal>
    )
  }
}

