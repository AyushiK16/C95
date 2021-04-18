import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
import db from '../config';
//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize'

//second screen - actually works

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId :'',
            password:'',
            isModalVisible: false,
            firstName: '',
            lastName : '',
            schoolCode : '',
            contact : '',
            confirmPassword : ''
        }
    }

    userSignup = (emailId, password, confirmPassword) =>{
      if(password !== confirmPassword){
          alert("Passwords don't match.")
      }

      else{
          firebase.auth().createUserWithEmailAndPassword(emailId,password)
      .then((response)=>{
          db.collection('Users').add({
              firstName : this.state.firstName,
              lastName : this.state.lastName,
              contact : this.state.contact,
              address : this.state.address,
              emailId : this.state.emailId.toLowerCase(),
              isBookRequestActive : false
          })
          return Alert.alert(
              "User Added", 
              "The User ID was created successfully.",
              [
              {
                  text : 'OK',
                  onPress : ()=>{
                      this.setState({
                          isModalVisible : false
                      })
                  }
              }
          ]);
      })
      .catch(function(error){
          var errorCode = error.code;
          var errorMsg = error.message;
          return Alert.alert(errorMsg);
      })
      }
      

  }

  userLogin = (emailId, password) =>{
      firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(()=>{
        console.log("logging in")
          this.props.navigation.navigate('HomeScreen');
      }
      )
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorMessage);
          // ...
        });
  }


    showModal = () => {
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <ScrollView style={styles.scrollview}>
              <View style={styles.signupView}>
                <Text style={styles.signupText}> Sign Up </Text>
              </View>
              <View style={{ flex: 0.95 }}>
                <Text style={styles.label}>First Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"First Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      firstName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Last Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Last Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      lastName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Contact </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Contact"}
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={text => {
                    this.setState({
                      contact: text
                    });
                  }}
                />
    
                <Text style={styles.label}> School Code </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"School Code"}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({
                      schoolCode: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Email </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  onChangeText={text => {
                    this.setState({
                      emailId: text
                    });
                  }}
                />
    
                <Text style={styles.label}> Password </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Confrim Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      confirmPassword: text
                    });
                  }}
                />
              </View>
    
              <View style={{ flex: 0.2, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignup(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <Text
                  style={styles.cancelButtonText}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  Cancel
                </Text>
              </View>
            </ScrollView>
          </Modal>
        );
      };
  
      render() {
        return (
          <View style={styles.container}>
            {this.showModal()}
            <View style={{ flex: 0.25 }}>
              <View style={{ flex: 0.15 }} />

              <View style={styles.santaView}>
                <Image
                  source={require("../assets/title.png")}
                  style={styles.santaImage}
                />
              </View>
        
            </View>
            <View style={{ flex: 0.45 }}>
              <View style={styles.TextInput}>
                <TextInput
                  style={styles.loginBox}
                  placeholder="abc@example.com"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  onChangeText={text => {
                    this.setState({
                      emailId: text
                    });
                  }}
                />
                <TextInput
                  style={[styles.loginBox, { marginTop: RFValue(15) }]}
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  placeholderTextColor="gray"
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
              </View>
              <View style={{ flex: 0.5, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.userLogin(this.state.emailId, this.state.password);
                  }}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setState({ isModalVisible: true })}
                >
                  <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
    
            <View style={{ flex: 0.3 }}>
              <Image
                source={require("../assets/book.jpg")}
                style={styles.bookImage}
                //resizeMode={"stretch"}
              />
            </View>
          </View>
        );
      }
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#6fc0b8"
    },
    loginBox: {
      width: "80%",
      height: RFValue(50),
      borderWidth: 1.5,
      borderColor: "#ffffff",
      fontSize: RFValue(20),
      paddingLeft: RFValue(10)
    },
    button: {
      width: "80%",
      height: RFValue(50),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(25),
      backgroundColor: "#ffff",
      shadowColor: "#000",
      marginBottom: RFValue(10),
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.3,
      shadowRadius: 10.32,
      elevation: 16
    },
    buttonText: {
      color: "#32867d",
      fontWeight: "200",
      fontSize: RFValue(20)
    },
    label: {
      fontSize: RFValue(13),
      color: "#717D7E",
      fontWeight: "bold",
      paddingLeft: RFValue(10),
      marginLeft: RFValue(20)
    },
    formInput: {
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth: 1,
      borderRadius: 2,
      borderColor: "grey",
      paddingBottom: RFValue(10),
      marginLeft: RFValue(20),
      marginBottom: RFValue(14)
    },
    registerButton: {
      width: "75%",
      height: RFValue(50),
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(3),
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(10)
    },
    registerButtonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#32867d",
      marginTop: RFValue(10)
    },
    scrollview: {
      flex: 1,
      backgroundColor: "#fff"
    },
    signupView: {
      flex: 0.05,
      justifyContent: "center",
      alignItems: "center"
    },
    signupText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#32867d"
    },
    santaView: {
      flex: 0.85,
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10)
    },
    santaImage: {
      width: "100%",
      height: "100%",
      //resizeMode: "stretch"
    },
    TextInput: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "center"
    },
    bookImage: {
      width: "100%",
      height: "100%",

    }
  });