import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import routes from './Routes'

import 'react-native-gesture-handler'

export default function App(){
  const Stack = createStackNavigator()

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="products">
        {routes.map((route, index) => (
          <Stack.Screen
            key={ index }
            name={ route.name }
            component={ route.component }
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}