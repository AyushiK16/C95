import React from 'react';
import {Image, TouchableOpacity} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Header, Icon, Badge} from 'react-native-elements'
import {StackNavigator} from './StackNavigator'
import AddScreen from '../Screens/AddScreen'
import HomeScreen from '../Screens/HomeScreen'
import MyPosts from '../Screens/MyPosts'

export const TabNavigator = createBottomTabNavigator({
    HomeScreen : {
        screen : StackNavigator,
        navigationOptions : {
            tabBarIcon : <Icon
            type = 'font-awesome'
            name = 'home'
            color = 'black'
            size = {40}
            iconStyle = {{marginBottom : 10}}
            containerStyle = {{position : "absolute"}}
            />,

            tabBarLabel : "Home"
        }
    },

    Add : {
        screen : AddScreen,
        navigationOptions : {
            tabBarIcon : <Icon
            type = 'font-awesome'
            name = 'plus-circle'
            color = 'teal'
            size = {60}
            iconStyle = {{marginBottom : 40}}
            containerStyle = {{position : "absolute"}}
            
        />,
           

            tabBarLabel : " "
        }
  
    },

    MyPosts : {
        screen : MyPosts,
        navigationOptions : {
            tabBarIcon : <Icon
            type = 'font-awesome'
            name = 'user'
            color = 'black'
            size = {40}
            iconStyle = {{marginBottom : 10}}
            containerStyle = {{position : "absolute"}}
            />,
            
            tabBarLabel : "MyPosts"
        }
    },

})

/*

<TouchableOpacity style = {{
                justifyContent: "center",
                alignItems: "center",
                alignSelf : 'center',
                backgroundColor : 'teal',
                borderRadius : 100,
                width : 40,
                height : 40,
                marginBottom : 0 }}>
                              </TouchableOpacity>


                              <Icon
                    type = 'font-awesome'
                    name = 'plus-circle'
                    color = 'teal'
                    size = {60}
                    iconStyle = {{marginBottom : 40}}
                    containerStyle = {{position : "absolute"}}
                    
                />


                <TouchableOpacity 
                //onPress = {()=>{
                    //navigation.navigate('AddScreen')}}
                style = {{marginBottom : 80, 
                marginRight : 45, 
                backgroundColor : 'black'}}>
                    
                    
                </TouchableOpacity>,


                navigationOptions : ({navigation}) => {
            //navigationOptions : ({}) => {
            return{
                tabBarIcon :   
                <TouchableOpacity style = {{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf : 'center',
                        backgroundColor : 'teal',
                        borderRadius : 100,
                        width : 40,
                        height : 40,
                        marginBottom : 0 }}
                        onPress = {()=>{
                        navigation.navigate(AddScreen)
                                }}>
                                              </TouchableOpacity>,
                
                
                tabBarLabel : " " 
            }
            
        }


         <TouchableOpacity style = {{
                justifyContent: "center",
                alignItems: "center",
                alignSelf : 'center',
                backgroundColor : 'teal',
                borderRadius : 100,
                width : 40,
                height : 40,
                marginBottom : 0 }}>
                    </TouchableOpacity>,


*/