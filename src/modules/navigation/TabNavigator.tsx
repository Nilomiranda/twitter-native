import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../feed/screens/Feed'
import Search from '../search/screens/Search'
import Profile from '../profile/screens/Profile'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNavigator
