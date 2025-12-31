import {
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { defaultStyle } from '@/utils/defaultStyle'
import { useRouter } from 'expo-router'
import { addUserToDb } from "@/utils/firestore";
import { storeData } from "@/utils/storage";
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
    const navigation = useRouter()
    const [userData, setUserData] = useState({})

    const handleInput = (value: string, name: string) => {
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async () => {
        if (Object.keys(userData).length === 4) {
            await storeData("userData", userData)
            return navigation.navigate('/second')
        }
        return Alert.alert("All fields should be filled.")
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView>
                    <View style={styles.container} className='h-screen'>
                        <View className="bg-blue-500 rounded-full flex justify-center items-center w-40 h-40 my-10">
                            <Image
                                style={styles.image}
                                source={require("@/assets/images/logo.png")}
                            />
                        </View>
                        <Text style={[defaultStyle.text, styles.title]}>Start Learning</Text>
                        <Text style={defaultStyle.text}>iLearnSTEM</Text>

                        <View style={{ marginTop: 37 }}>
                            <Text style={[defaultStyle.label]}>Enter Full Name</Text>
                            <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                onChangeText={(value: string) => handleInput(value, "fullname")} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={[defaultStyle.label]}>Enter username</Text>
                            <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                onChangeText={(value: string) => handleInput(value.toLowerCase().replaceAll(' ', '-'), "username")} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={[defaultStyle.label]}>Enter email</Text>
                            <TextInput autoCapitalize='none' keyboardType={'email-address'} textContentType={'emailAddress'} autoCorrect={false} style={defaultStyle.input}
                                onChangeText={(value: string) => handleInput(value, "email")} />
                        </View>

                        <View style={{ marginTop: 20, marginBottom: 15 }}>
                            <Text style={[defaultStyle.label]}>Enter phone number</Text>
                            <TextInput autoCapitalize='none' autoCorrect={false} returnKeyType='done' style={defaultStyle.input}
                                onChangeText={(value: string) => handleInput(value, "number")} />
                        </View>

                        <TouchableOpacity style={defaultStyle.button} onPress={handleSubmit}>
                            <Text style={defaultStyle.buttonText}>Next</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={'font-medium mt-3'} onPress={() => navigation.push('/(auth)')}>
                            <Text>Already registered? Login</Text>
                        </TouchableOpacity>

                        <Text style={[defaultStyle.text, { color: 'gray' }]} className='my-3'>Secured by legions of hope</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#ededee",
    },

    image: {
        width: 100,
        height: 100,
        marginTop: -10,
    },

    title: {
        fontSize: 24,
        marginTop: -30,
        fontWeight: "500",
    },
});