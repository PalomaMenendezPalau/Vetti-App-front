import { View, Text ,TextInput , TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'


import { icons } from "../constants";


const SearchInput = ({title, value, placeholder,handleChangeText,otherStyles}) => {
  
  const [showPassword, setShowPassword] = useState(false)
  return (
    
      
      <View className='border-2 border-gray-400 rounded-2xl w-full h-16  bg-gray-600	focus:border-secondary items-center flex-row SPACE-X-4'>
        <TextInput
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#828383"
          onChangeText={handleChangeText}
          
        />

        <TouchableOpacity>
            <Image 
                source={icons.search}
                className='2-5 h-5'
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>

  
  )
}

export default SearchInput