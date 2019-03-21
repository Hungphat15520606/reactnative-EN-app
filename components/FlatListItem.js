import React, { Component } from 'react';
import { AppRegistry , FlatList , StyleSheet, Text, TextInput, View, Image, Alert, Platform, TouchableHighlight, } from 'react-native';
import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
import AddItem from './AddItem';
import EditItem from './EditItem';
import Button from 'react-native-button';

export default class FlatListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeRowKey:null,
            isMemorized: false,
            numOfrefreshEditItem: 0,
        };
        this.toggleWord=this.toggleWord.bind(this)
        this.refreshEditItem=this.refreshEditItem.bind(this)      
    }
    
    toggleWord()
    {
        this.setState({
            isMemorized:!this.state.isMemorized
        })
    }

    refreshEditItem(){
        this.setState((previous)=>{
            return{
            numOfrefreshEditItem: previous.numOfrefreshEditItem+1
            }
        }
        );}
    
    render(){
        const swipeSettings = {
            autoClose : true,
            onClose: (secId, rowId, direction)=>{
                if(this.state.activeRowKey != null) {
                    this.setState ({activeRowKey: null});
                }
            },
            onOpen: (secId, rowId, direction)=>{
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () =>{
                        this.props.parentFlatList.refs.EditItem.showEditItem(FlatListData[this.props.index], this)
                    },
                    text :'Edit', type: 'primary'
                },
                {
                    onPress: () =>{
                        const deletingRow= this.state.activeRowKey
                        Alert.alert(
                            'Alert',
                            'Are you sure want to delete?',
                            [
                                {text: 'No', onPress: () => console.log('cancle pressed'), style:'cancle'},
                                {text: 'Yes', onPress:()=> {
                                        FlatListData.splice(this.props.index, 1);
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                            {canclelable: true}
                        );

                    },
                    text :'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
           
        };
        return(
        <Swipeout {...swipeSettings}>
        <View style={{
            flex:1,
            flexDirection:"column",
            borderRadius:10
        }}>
            <View style={{
                flex:1,
                flexDirection:"row",
               // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen':'tomato'
                backgroundColor: '#fff',
                marginRight: 10,
                marginLeft: 10,
                
            }}>
                    <Image source={{uri: this.props.item.imageUrl}}
                        style={{width:100, height:100, margin:5}}> 
                    </Image>
                    <View style={{
                        flex:1,
                        flexDirection:"row",
                        }}> 
                        
                            <View style={{width:200}}>
                                <Text style={style.FlatListItem}>{this.props.item.en}</Text>
                                <Text style={{
                                       color: '#767676',
                                       padding: 5,
                                       fontSize: 20,
                                       marginTop: 10,
                                }}>{this.props.item.vn}</Text>
                            </View>
                            <Button
                                    onPress={this.toggleWord}>
                            {
                                this.state.isMemorized? 
                                
                                    <Image 
                                    style={{width:30, height:30, marginTop: 40, marginRight: 15}} 
                                    source={require('../icons/startGold.png')}/>
                                :                          
                                    <Image 
                                    style={{width:30, height:30, marginTop: 40, marginRight: 15}} 
                                    source={require('../icons/startSiver.png')}
                                    />
                               
                            }
                            </Button>                         
                        
                    </View>
            </View>
            <View style={{
                height:1,
                backgroundColor:'#767676',
                marginRight: 30,
                marginLeft: 30,
            }}>

        </View>
    </View>
    
            </Swipeout>
        );
        
    }
}

const style = StyleSheet.create({
    FlatListItem: {
        color: '#365899',
        padding: 5,
        fontSize: 20,
        marginTop: 10
    }
})