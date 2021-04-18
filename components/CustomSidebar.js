import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar, Icon} from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config'

import { RFValue } from 'react-native-responsive-fontsize';


export default class CustomSidebar extends React.Component{
  constructor(){
    super();
    this.state = {
      userId : firebase.auth().currentUser.email,
      image : '#',
      name : ''
    }
  }

    render(){
      
        return(
            <View style = {{flex : 1}}>
              
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