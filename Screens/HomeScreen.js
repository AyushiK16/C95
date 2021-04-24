import React from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import db from '../config';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import {Avatar, Icon} from 'react-native-elements'



//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';

export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      images : [],
      image : '#'
    }
  }

  getImages = async() => {
    console.log("getImages Start")

    await db.collection('AllPosts').onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
        var imageArray = []
        imageArray.push(doc.data().imageLink)
        //console.log('imagearray', imageArray)
        this.setState({
          images : imageArray
        })
        //console.log('state', this.state.images)
      })
    })
    console.log("getImages End")

  }

  fetchImage(imageName){
    console.log("fetchImage Start")

    var ref = firebase.storage().ref().child(imageName)
    ref.getDownloadURL().then((url)=>{
      this.setState({
        image : url
      })
      
    })
    .catch(()=>{
      this.setState({
        image : '#'
      })
    })
    console.log("fetchImage End")

  }

  componentDidMount = async() => {
    await this.getImages()
   // this.fetchImage('allPosts/test1@gmail.com/1.jpg')
    //console.log('comp', this.state.images)
    //this.state.images.forEach((imageLink)=>{
      //this.fetchImage(imageLink)
    //console.log('inside the function')
  //})
      //console.log("inside comp did mount")
  }


  render(){
    console.log('render', this.state.images)
/*
    this.state.images.map((imageLink)=>{
      this.fetchImage(imageLink)
      console.log("inside render")
      return(
        <View>
          <Avatar
          source = {{uri : imageLink}}
          size = 'xlarge'
          showEditButton
          containerStyle = {styles.pictureStyle}
          />
        </View>
      )
    })
    */
    return(
      <View>
        <Text> Hi </Text>
        <View> 
          {this.state.images.map((imageLink)=>{
            this.fetchImage(imageLink)
            return(
              <Avatar
          source = {{uri : this.state.image}}
          size = 'xlarge'
          showEditButton
          containerStyle = {styles.pictureStyle}
          />
            )
          })}
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    
  })

  /*
  <Avatar
          source = {{uri : this.state.image}}
          size = 'xlarge'
          onPress = {()=>{
            this.selectPicture()
          }}
          showEditButton
          containerStyle = {styles.pictureStyle}
          //containerStyle = {{}}
          />

          <TextInput
          placeholder = 'Enter the short caption here.'
          style = {styles.shortStyle}
          onChangeText = {(text)=>{
            this.setState({
              caption : text
            })
          }}
          maxLength = {20}
          />

  */