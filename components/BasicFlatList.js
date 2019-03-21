import React, { Component } from 'react';
import { AppRegistry , FlatList , StyleSheet, Text, TextInput, View, Image, Alert, Platform, TouchableHighlight, } from 'react-native';
import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
import AddItem from './AddItem';
import EditItem from './EditItem';
import Button from 'react-native-button';
import FlatListItem from './FlatListItem'



export default class BasicFlatList extends Component {
    constructor(props){
        super(props);
        this.state = {deletedRowKey: null}
        this.refreshFlatList= this.refreshFlatList.bind(this)
        this.AddNewItem=this.AddNewItem.bind(this)     
    }

    crollToEndFlatList(){
        this.refs.flatList.scrollToEnd(); 
    }

    refreshFlatList(activekey){// de thay doi state deleteRowKey voi muc dich la thay doi lai giao dien khi xoa
        // vif chir khi state thay doi thi` moi render lai giao dien    
        this.setState((x)=>{ 
            return {deletedRowKey: activekey}
        })
                
    }

    AddNewItem(){
        this.refs.AddItem.showAddItem()       
    }
  
    render() {
        return (
            <View style={{flex:1, marginTop: Platform.OS === 'ios' ? 34:0, backgroundColor:'#e1e1e1' }}>
                <View style={{
                    backgroundColor:'#4267b2',
                    height:70,
                    flexDirection:'row', justifyContent:'flex-end', alignItems:'center'          
                }}>
                <Text style={{
                    fontSize:23,
                    fontWeight:'bold',
                    textAlign:'center',
                    marginRight: 85,
                    color: '#f1f1f1',
                    shadowOpacity: 0.8,
                    
                }}>Từ vựng TOEIC</Text>
                    <TouchableHighlight 
                    style={{ marginRight: 10,}}
                    underlayColor='blue'
                    onPress={this.AddNewItem}
                   >
                        <Image 
                        style={{width:30, height:30}} 
                        source={require('../icons/add-button-white-md.svg')}
                        />
                    </TouchableHighlight>
                </View>
                
                <TextInput style={{
                    backgroundColor:'white',
                    height: 50, 
                    marginLeft: 10, 
                    marginRight:10,
                    marginTop:10,
                    marginBottom:10,
                    
                    fontSize: 20,
                    paddingLeft: 10,
                    borderRadius:6
                  }}placeholder='Tìm từ'>

                </TextInput>
                <FlatList ref={'flatList'}                    
                        data={FlatListData}
                        renderItem={({item, index})=>{
                       // console.log(`Item= ${JSON.stringify(item)},index=${index}`);
                       return(
                           <FlatListItem item={item} index={index} 
                            parentFlatList={this}
                            //refreshFlatList={this.refreshFlatList}
                           > 
                           </FlatListItem>);
                }}               
                >
                </FlatList>
                <AddItem ref={"AddItem"} 
                    //refreshFlatList={this.refreshFlatList} 
                    parentFlatList={this}
                    />
                <EditItem   ref={"EditItem"} 
                            parentFlatList={this}                          
                           />            
            </View>
        );
    }
}