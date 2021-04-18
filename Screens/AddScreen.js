import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar, Icon} from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config'
import * as ImagePicker from 'expo-image-picker'
import {RFValue} from 'react-native-responsive-fontsize'

export default class AddScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      userId : firebase.auth().currentUser.email,
      image : '#',
      caption : '',
      description : '',
      identifier : '',
      docId : ''

    }
  }
/*
  getUserPicture(){
    db.collection('Users').where('emailId', '==', this.state.userId)
    .onSnapshot((snap)=>{
      snap.forEach((doc)=>{
        this.setState({
          name: doc.data().firstName + ' ' + doc.data().lastName
        })
      })
    })
  }
*/
  selectPicture = async() => {
    var {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing : true,
      aspect : [1,1],
      quality : 1
    })

    if(!cancelled){
      this.setState({
        image : uri
      })
      //this.uploadImage(uri, this.state.userId)
    }
  }

  getIdentifier(){
    db.collection('Users').where('userId', '==', this.state.userId)
    .onSnapshot((data)=>{
      data.forEach((doc)=>{
        this.setState({
          identifier : doc.data().identifier + 1,
          docId : doc.id
        })
        console.log('identifier in getIdentifier', this.state.identifier)
      })
    })
  }

  updateIdentifier(){
    db.collection('Users').doc(this.state.docId)
    .update({identifier : this.state.identifier})
    console.log('identifier in updateIdentifier', this.state.identifier)
  }

  updateInfo(){
    db.collection('AllPosts').add({
      userId : this.state.userId,
      caption : this.state.caption,
      description : this.state.description,
      date : firebase.firestore.FieldValue.serverTimestamp(),
      imageLink : 'allPosts/' + this.state.userId + '/' + this.state.identifier
    })
    console.log('identifier in updateInfo', this.state.identifier)
  }

  uploadImage = async(uri,imageName) => {
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child('allPosts/' + imageName + '/' + this.state.identifier )
    return(
      ref.put(blob).then(()=>{
        //this.fetchImage(imageName);
        console.log('up load image function, indentifier', this.state.identifier)
      })
    )
    
  }

  fetchImage(imageName){
    var ref = firebase.storage().ref().child('allPosts/' + imageName + '/' + this.state.identifier)
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
  }


  componentDidMount(){
    this.getIdentifier();
    //this.fetchImage(this.state.userId);
    //this.getUserPicture()
  }
  render(){
      
    return(
        <View>

          <Avatar
          source = {{uri : this.state.image}}
          size = 'xlarge'
          onPress = {()=>{
            this.selectPicture()
          }}
          showEditButton
          //containerStyle = {{}}
          />

          <TextInput
          placeholder = 'Enter the short caption here.'
          onChangeText = {(text)=>{
            this.setState({
              caption : text
            })
          }}
          maxLength = {10}
          />


          <TextInput
          placeholder = 'Enter the long description here.'
          onChangeText = {(text)=>{
            this.setState({
              description : text
            })
          }}
          />

          <TouchableOpacity style = {{backgroundColor : 'black'}}
          onPress = {()=>{
            this.updateIdentifier()
            this.updateInfo();
            this.uploadImage(this.state.image, this.state.userId);
          }}
          >
            <Text style = {{color : 'white'}}>
              Post!
            </Text>
          </TouchableOpacity>
          
        </View>
    )
}
}

var styles = StyleSheet.create({
container: {
flex: 1,
},
drawerItemsContainer: {
flex: 0.8,
},
logOutContainer: {
flex: 0.2,
justifyContent: "flex-end",
paddingBottom: 30,
},
logOutButton: {
height: 30,
width: "100%",
justifyContent: "center",
padding: 10,
},
imageContainer: {
flex: 0.75,
width: "40%",
height: "20%",
marginLeft: 20,
marginTop: 30,
borderRadius: 40,
},
logOutText: {
fontSize: 30,
fontWeight: "bold",
},
});

/*

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar, Icon} from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config'
import * as ImagePicker from 'expo-image-picker'
import {RFValue} from 'react-native-responsive-fontsize'


export default class CustomSidebar extends React.Component{
  constructor(){
    super();
    this.state = {
      userId : firebase.auth().currentUser.email,
      image : '#',
      name : ''
    }
  }

  getUserProfile(){
    db.collection('Users').where('emailId', '==', this.state.userId)
    .onSnapshot((snap)=>{
      snap.forEach((doc)=>{
        this.setState({
          name: doc.data().firstName + ' ' + doc.data().lastName
        })
      })
    })
  }

  selectPicture = async() => {
    var {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing : true,
      aspect : [3,4],
      quality : 1
    })

    if(!cancelled){
      this.setState({
        image : uri
      })
      this.uploadImage(uri, this.state.userId)
    }
  }

  uploadImage = async(uri,imageName) => {
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child('userProfiles/' + imageName)
    return(
      ref.put(blob).then(()=>{
        this.fetchImage(imageName);
      })
    )
  }

  fetchImage(imageName){
    var ref = firebase.storage().ref().child('userProfiles/' + imageName)
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
  }


  componentDidMount(){
    this.fetchImage(this.state.userId);
    this.getUserProfile()
  }
  render(){
      
    return(
        <View style = {{flex : 1}}>
          <View style = {{flex : 0.5, alignItems : 'center', backgroundColor : '#44a69c'}}>
            <Avatar
              rounded
              size = 'xlarge'
              containerStyle = {styles.imageContainer}
              showEditButton
              source = {{uri : this.state.image}}
              onPress = {()=>{
                this.selectPicture()
              }}

            />

            <Text style = {{fontSize : 20, fontWeight : '100', paddingTop : 10}}>
              {this.state.name}

            </Text>
          </View>
            <View style = {StyleSheet.drawerItemsContainer}>
                <DrawerItems
                {...this.props}
                />
            </View>
            <View style = {styles.logOutContainer}>
                <TouchableOpacity style = {styles.logOutButton}
                onPress = {()=>{
                    this.props.navigation.navigate('WelcomeScreen')
                    firebase.auth().signOut()
                }}>

                  <Icon
                  name = 'logout'
                  type = 'antdesign'
                  size = {RFValue(20)}
                  iconStyle = {{paddingLeft: RFValue(10)}}

                  />
                    <Text style = {{fontSize : RFValue(15), fontWeight : 'bold', marginLeft : RFValue(30)}}> Logout </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
}

var styles = StyleSheet.create({
container: {
flex: 1,
},
drawerItemsContainer: {
flex: 0.8,
},
logOutContainer: {
flex: 0.2,
justifyContent: "flex-end",
paddingBottom: 30,
},
logOutButton: {
height: 30,
width: "100%",
justifyContent: "center",
padding: 10,
},
imageContainer: {
flex: 0.75,
width: "40%",
height: "20%",
marginLeft: 20,
marginTop: 30,
borderRadius: 40,
},
logOutText: {
fontSize: 30,
fontWeight: "bold",
},
});
*/