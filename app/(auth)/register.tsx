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
import React, {ChangeEvent, useState} from 'react'
import {defaultStyle} from '@/utils/defaultStyle'
import {useRouter} from 'expo-router'
import {addUserToDb} from "@/utils/firestore";
import {storeData} from "@/utils/storage";
import {password} from "@firebase/auth/dist/test/helpers/integration/helpers";

const Register = () => {
    const navigation = useRouter()
    const [userData, setUserData] = useState({})

    const handleInput = (value: string, name: string) => {
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = async () => {
        if (Object.keys(userData).length === 4) {
            await storeData("userData", userData)
            return navigation.navigate('/second')
        }
        return Alert.alert("All fields should be filled.")
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('@/assets/images/logo.png')}/>
                    <Text style={[defaultStyle.text, styles.title]}>Start Learning</Text>
                    <Text style={defaultStyle.text}>Geanco STEM</Text>

                    <View style={{marginTop: 60}}>
                        <Text style={[defaultStyle.label]}>Enter Full Name</Text>
                        <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                   onChangeText={(value: string) => handleInput(value, "fullname")}/>
                    </View>

                    <View style={{marginTop: 30}}>
                        <Text style={[defaultStyle.label]}>Enter username</Text>
                        <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                   onChangeText={(value: string) => handleInput(value.toLowerCase().replaceAll(' ', '-'), "username")}/>
                    </View>

                    <View style={{marginTop: 30}}>
                        <Text style={[defaultStyle.label]}>Enter email</Text>
                        <TextInput autoCapitalize='none'  keyboardType={'email-address'} textContentType={'emailAddress'} autoCorrect={false} style={defaultStyle.input}
                                   onChangeText={(value: string) => handleInput(value, "email")}/>
                    </View>

                    <View style={{marginTop: 30, marginBottom: 40}}>
                        <Text style={[defaultStyle.label]}>Enter phone number</Text>
                        <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                   onChangeText={(value: string) => handleInput(value, "number")}/>
                    </View>

                    <TouchableOpacity style={defaultStyle.button} onPress={handleSubmit}>
                        <Text style={defaultStyle.buttonText}>Next</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={'font-medium mt-3'} onPress={() => navigation.push('/(auth)')}>
                        <Text>Already registered? Login</Text>
                    </TouchableOpacity>

                    <Text style={[defaultStyle.text, {marginTop: 30, color: 'gray'}]}>Secured by
                        GeancoStem</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ededee'
    },

    image: {
        width: 200,
        height: 200,
        marginTop: -10
    },

    title: {
        fontSize: 24,
        marginTop: -30,
        fontWeight: '500'
    }
})