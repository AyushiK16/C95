import CustomSidebar from './CustomSidebar'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {TabNavigator} from './TabNavigator'

export const AppDrawerNavigator = createDrawerNavigator(
{
    HomeScreen : {screen : TabNavigator}
},
 {contentComponent : CustomSidebar},
 {initialRouteName : 'HomeScreen'}
)
