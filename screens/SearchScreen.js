import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import db from '../config';

export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state = {
      allStories:[]
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }
  retrieveStories=()=>{
    try{
      var allStories = []
      var Stories = db.collection("stories").get().then((snap)=>{
        snap.forEach((doc)=>{
          allStories.push(doc.data())
        })
        this.setState({allStories})
      })
    }
    catch(error){
    console.log(error)
    }
  }
    render() {
      return (
        <View>
          <FlatList data = {this.state.allStories} renderItem = {({item})=>{
            <View>
              <Text>
              title: {item.title}
              </Text>
              <Text>
                Author: {item.author}
              </Text>
            </View>
          }} keyExtractor = {(item,index)=>{
            index.toString()
          }}>

          </FlatList>
        </View>
      );
    }
  }