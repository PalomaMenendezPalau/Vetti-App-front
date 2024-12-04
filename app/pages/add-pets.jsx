import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { addPet } from "../../utils/users_api"; // Update the path to match your file structure
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPet = () => {
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petBirthday, setPetBirthday] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const maxDate = new Date();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false); // Close the picker
        setDate(currentDate); // Update the picker state
        setPetBirthday(currentDate.toISOString().split('T')[0]); // Save as YYYY-MM-DD
    };

    const handleAddPet = async () => {
        if (!petName || !petType || !petBirthday) {
            Alert.alert("Validation Error", "Porfavor ingresar todos los campos solicitados.");
            return;
        }

        try {
            setIsLoading(true); // Show loading indicator
            const response = await addPet(petName, petType, petBirthday);
            Alert.alert("Success", `Pet "${response.name}" added successfully!`);
            setPetName(""); // Reset input fields
            setPetType("");
            setPetBirthday("");
        } catch (error) {
            Alert.alert(
                "Error",
                error.response?.data?.message || "An error occurred while adding the pet."
            );
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    return (
        <View className="flex-1 bg-gray-800 h-full pr-4 pl-4 ">
            <Text className="text-2xl font-psemibold text-white mt-4 mb-4">Agregar Mascota</Text>
            <Text className="text-lg font-psemibold text-white"> Nombre </Text>
            <TextInput
                className="bg-gray-100 p-3 rounded-lg font-pregular text-white mb-2"
                placeholder="Nombre"
                placeholderTextColor="#cccccc"
                value={petName}
                onChangeText={setPetName}
            />
            <Text className="text-lg font-psemibold text-white"> Tipo de Especie </Text>
            <TextInput
                className="bg-gray-100 p-3 rounded-lg font-pregular text-white mb-2"
                placeholder="Perro"
                placeholderTextColor="#cccccc"
                value={petType}
                onChangeText={setPetType}
            />

            <View className="items-center">
                <Text className="text-lg font-psemibold text-white mb-4">Fecha de Nacimiento</Text>

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
                className="bg-secondary rounded-xl min-h-[62px] justify-center items-center text-white font-psemibold text-lg mt-2"
                onPress={handleAddPet}
                disabled={isLoading}
            >
                <Text className="text-white text-center text-lg">
                    {isLoading ? "Adding Pet..." : "Agregar Mascota"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddPet;
