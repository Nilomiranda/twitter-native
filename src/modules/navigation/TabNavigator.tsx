import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../feed/screens/Feed'
import Search from '../search/screens/Search'
import Profile from '../profile/screens/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '../../config/theme'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Feed" tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          // eslint-disable-next-line react/prop-types,react/display-name
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={
                focused ? theme?.colors?.primary : theme?.colors?.primaryLighter
              }
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          // eslint-disable-next-line react/prop-types,react/display-name
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={
                focused ? theme?.colors?.primary : theme?.colors?.primaryLighter
              }
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // eslint-disable-next-line react/prop-types,react/display-name
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={
                focused ? theme?.colors?.primary : theme?.colors?.primaryLighter
              }
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
