import { View, Text , Image, StatusBar} from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons }  from '../../constants'

const TabIcon = ({icon, color , name, focused}) => {
  return (
    <View className="items-center justify-center">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold}' : 'font-pregular'} text-xs`} style={{color : color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel:false,
          tabBarStyle: {
            backgroundColor: '#f2f3f4',
            borderTopWidth: 1,
            borderTopColor: '#e5e7e9',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Inicio', 
            headerShown: 'false',
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Inicio"
                focused={focused}

              />
            )
          }}
        />
         <Tabs.Screen
          name="request-appointment"
          options={{
            title: 'Solicitar Turno', 
            headerShown: 'false',
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Solicitar Turno"
                focused={focused}

              />
            )
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: 'Turnos', 
            headerShown: 'false',
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.appointment}
                color={color}
                name="Turnos"
                focused={focused}

              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Mi Perfil', 
            headerShown: 'false',
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Perfil"
                focused={focused}

              />
            )
          }}
        />
        
      </Tabs>
      
    </> 
  )
}

export default TabsLayout