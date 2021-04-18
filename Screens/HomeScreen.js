import React from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import db from '../config';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'


//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';

export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state = {
        //add any states here.
    }
  }
  render(){
      return(
          <View>
            <Text>
              Home Screen
            </Text>

          </View>
      )
  }
}

const styles = StyleSheet.create({
    
  })