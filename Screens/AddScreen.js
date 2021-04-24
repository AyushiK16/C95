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
      docId : '',
      type : ' '

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
      var index = uri.lastIndexOf('.')
      var str1 = uri.slice(index, uri.length)

      console.log('selectPicture()', index)
      console.log('selectPicture 222', str1)

      this.setState({
        image : uri,
        type : str1
      })

      
      //this.uploadImage(uri, this.state.userId)
    }

    
  }

  getIdentifier = async() => {
    await db.collection('Users').where('userId', '==', this.state.userId)
    .onSnapshot((data)=>{
      data.forEach((doc)=>{
        this.setState({
          identifier : doc.data().identifier,
          docId : doc.id
        })
        console.log('identifier in getIdentifier', this.state.identifier)
      })
    })
  }
/*
  updateIdentifier = async() => {
    await this.setState({identifier : this.state.identifier + 1})
    await db.collection('Users').doc(this.state.docId)
    .update({identifier : this.state.identifier})
    console.log('identifier in updateIdentifier', this.state.identifier)
  }
*/
  updateInfo = async() => {
    await this.setState({identifier : this.state.identifier + 1})
    await db.collection('Users').doc(this.state.docId)
    .update({identifier : this.state.identifier})
    console.log('identifier in updateIdentifier', this.state.identifier)


   await db.collection('AllPosts').add({
      userId : this.state.userId,
      caption : this.state.caption,
      description : this.state.description,
      date : firebase.firestore.FieldValue.serverTimestamp(),
      
      imageLink : 'allPosts/' + this.state.userId + '/' + this.state.identifier + this.state.type
    })
    console.log('identifier in updateInfo', this.state.identifier)
  }

  uploadImage = async(uri,imageName) => {
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child('allPosts/' + imageName + '/' + this.state.identifier + this.state.type )
    return(
      ref.put(blob).then(()=>{
        //this.fetchImage(imageName);
        console.log('up load image function, indentifier', this.state.identifier)
      })
    )
    
  }

  


  componentDidMount(){
    this.getIdentifier();
    //this.fetchImage(this.state.userId);
    //this.getUserPicture()
  }
  render(){
      
    return(
        <View style = {{backgroundColor : '#81B7B1'}}>
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


          <TextInput
          placeholder = 'Enter the long description here.'
          multiline
          style = {styles.longStyle}
          onChangeText = {(text)=>{
            this.setState({
              description : text
            })
          }}
          />

          <TouchableOpacity style = {styles.postButton}
          onPress = {()=>{
           // this.updateIdentifier()
            this.updateInfo();
            this.uploadImage(this.state.image, this.state.userId);
            this.props.navigation.navigate('HomeScreen')
          }}
          >
            <Text style = {{color : 'white', fontSize : 20}}>
              Post!
            </Text>
          </TouchableOpacity>

          <Text style = {{marginTop:400}}/>
          
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
pictureStyle : {
  backgroundColor : 'black', 
  alignSelf :'center', 
  marginTop : 100,
  width : 220,
  height : 220,
},
shortStyle : {
  width:"75%",
  height:35,
  width : 250,
  alignSelf:'center',
  borderColor:'#32867d',
  borderRadius:10,
  borderWidth:1,
  marginTop:40,
  padding:10,
  color : 'white'

},

longStyle : {
  width:"75%",
  height:65,
  width : 400,
  alignSelf:'center',
  borderColor:'#32867d',
  borderRadius:10,
  borderWidth:1,
  marginTop:30,
  padding:10,
  color : 'white'

},
postButton : {
  width:100,
  height:50,
  justifyContent:'center',
  alignItems:'center',
  alignSelf : 'center',
  borderRadius:10,
  backgroundColor:"#32867d",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,
elevation: 16,
marginTop:30
}
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