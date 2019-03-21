import React, {Component} from 'react';


const apiGetAllItem='http://localhost:4000/word';

async function getItem(){
    try{
        let response = await fetch(apiGetAllItem);
        let responseJson = await response.json();
        return responseJson.data;
    }catch(error){
        console.error(` Error is :${error}`)
    }
}
export {getItem}