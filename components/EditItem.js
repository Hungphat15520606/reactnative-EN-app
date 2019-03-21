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
            txtEn:'',
            txtVn:'',
        }
        this.showEditItem=this.showEditItem.bind(this);
       // this.RandomKey=this.RandomKey.bind(this);
    }

    
    showEditItem(editingWord, FlatListItem){
        this.setState({
            key: editingWord.key,
            txtEn: editingWord.en,
            txtVn: editingWord.vn,
            FlatListItem:FlatListItem,
        })
    this.refs.Modal.open();
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
        onChangeText={(text)=> this.setState({txtEn:text})}
        value={this.state.txtEn}   
        placeholder="Enter food's name">
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
        onChangeText={(text)=> this.setState({txtVn:text})}
        value={this.state.txtVn}   
        placeholder="Enter Food Decription">
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
            if (this.state.txtEn.length==0 || this.state.txtVn.length==0)
            {
                alert(" Một trong hai trường bạn đã bỏ trống! ")
                return;
            }
            var foundIndex= FlatListData.findIndex(item=>this.state.key==item.key);
            FlatListData[foundIndex].en=this.state.txtEn;
            FlatListData[foundIndex].vn=this.state.txtVn;
            this.refs.Modal.close();
            //this.props.refreshFlatList(this.props.activeRowKey);
            this.state.FlatListItem.refreshEditItem();
        }}
        >Save</Button>
        </View> 
    </Modal>
    )
  }
}

