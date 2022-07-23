import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Deals from './SiteTabs/Deals';
import Search from './SiteTabs/Search';

const Tab = createMaterialBottomTabNavigator();

export default function HomeStack() {
    return (
        <Tab.Navigator shifting={true} >
            <Tab.Screen name="Deals" component={Deals} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='shopping' color={color} size={22}/>)}}/>
            <Tab.Screen name="Search" component={Search} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='magnify' color={color} size={22}/>)}}/>
		</Tab.Navigator>
    )
}