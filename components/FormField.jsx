import { View, Text ,TextInput , TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'


import { icons } from "../constants";


const FormField = ({title, value, placeholder,handleChangeText,otherStyles}) => {
  
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-stone-50 front-pmedium'>{title}</Text>
      
      <View className='border-2 border-slate-300 rounded-2xl w-full h-16  bg-slate-300	focus:border-secondary items-center flex-row'>
        <TextInput
          className='flex-1 text-black font-psemibld text-base text-center'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#828383"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Contraseña' && !showPassword}
        />

        {title === "Contraseña" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-7 h-7 pl-1"
              
            />
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}

export default FormField