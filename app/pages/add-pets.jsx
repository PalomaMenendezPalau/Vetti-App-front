import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { addPet } from "../../utils/users_api"; 
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPet = () => {
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("Perro"); 
    const [petBirthday, setPetBirthday] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const maxDate = new Date();

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShow(false); 
            setDate(currentDate); 
            const formattedDate = currentDate.toISOString().split('T')[0]; 
            setPetBirthday(formattedDate); 
            console.log("Formatted Birthday:", formattedDate);
        } else {
            setShow(false); 
        }
    };

    const handleAddPet = async () => {
        if (!petName || !petType || !petBirthday) {
            Alert.alert("Datos incompletos", "Por favor ingresar todos los campos solicitados.");
            return;
        }
    
        try {
            setIsLoading(true);
    
            console.log("Sending pet data:", {
                name: petName,
                type: petType,
                birthday: petBirthday,  
            });
    
            const response = await addPet(petName, petType, petBirthday);
            Alert.alert("Éxito", ` "${response.name}" Fue agregado satisfactoriamente!`);
            setPetName("");
            setPetType("Perro");
            setPetBirthday("");
        } catch (error) {
            console.error("Error adding pet:", error.response?.data || error.message);
            Alert.alert(
                "Error",
                error.response?.data?.message || "Ocurrio un error al agregar la mascota."
            );
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <View className="flex-1 bg-gray-800 h-full pr-4 pl-4">
            <Text className="text-2xl font-psemibold text-white mt-4 mb-4">Agregar Mascota</Text>

            <Text className="text-lg font-psemibold text-white mb-2">Nombre</Text>
            <TextInput
                className="bg-gray-100 p-3 rounded-lg font-pregular text-gray-800 mb-4"
                placeholder="Nombre"
                placeholderTextColor="#cccccc"
                value={petName}
                onChangeText={setPetName}
            />

            <Text className="text-lg font-psemibold text-white mb-2">Tipo de Especie</Text>
            <View className="flex-row justify-evenly mb-4">
                <TouchableOpacity
                    onPress={() => setPetType("Perro")}
                    className={`px-6 py-3 rounded-full ${
                        petType === "Perro" ? "bg-blue-500" : "bg-gray-700"
                    }`}
                >
                    <Text className="text-white font-psemibold">Perro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPetType("Gato")}
                    className={`px-6 py-3 rounded-full ${
                        petType === "Gato" ? "bg-blue-500" : "bg-gray-700"
                    }`}
                >
                    <Text className="text-white font-psemibold">Gato</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPetType("Otro")}
                    className={`px-6 py-3 rounded-full ${
                        petType === "Otro" ? "bg-blue-500" : "bg-gray-700"
                    }`}
                >
                    <Text className="text-white font-psemibold">Otro</Text>
                </TouchableOpacity>
            </View>


            <Text className="text-lg font-psemibold text-white mb-2">Fecha de Nacimiento</Text>
            <View className="items-center mb-6">
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    className="bg-gray-700 p-3 rounded-lg font-plight"
                >
                    <Text className="text-white text-sm">
                        {petBirthday || "Seleccionar fecha"}
                    </Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                        maximumDate={maxDate}
                    />
                )}
            </View>

            <TouchableOpacity
                className="bg-secondary rounded-xl min-h-[62px] justify-center items-center text-white font-psemibold text-lg"
                onPress={handleAddPet}
                disabled={isLoading}
            >
                <Text className="text-white text-center text-lg">
                    {isLoading ? "Cargando" : "Agregar Mascota"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddPet;
