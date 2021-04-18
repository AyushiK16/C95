import React from 'react';
import {Header, Icon, Badge} from 'react-native-elements'
import {View} from 'react-native'

export default class MyHeader extends React.Component{
    render(){
        return(
            <Header centerComponent = {{text:this.props.title,
                style : {color : '#90A5A9', fontSize : 20, fontWeight : 'bold'}}}
                backgroundColor = '#EAF8FE'
                leftComponent =  {<Icon
                    type = 'font-awesome'
                    name = 'bars'
                    color = '#696969'
                    onPress = {()=>{
                        this.props.navigation.toggleDrawer()
                    }}
                
                    />}
                    rightComponent = {<this.BellIcon {...this.props}/>}
                ></Header>
        )
    }
}

