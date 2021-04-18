import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from '../Screens/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen';

export const StackNavigator = createStackNavigator({
    HomeScreen : {screen : HomeScreen,
        navigationOptions : {headerShown : false}
    },
    
    DetailsScreen : {screen : DetailsScreen,
        navigationOptions : {headerShown : false}}
},


{intialRouteName : 'HomeScreen'}

)


