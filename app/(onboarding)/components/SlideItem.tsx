import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { useRouter } from 'expo-router'
import { ISlideData } from '@/interface/slideData'
import {useColorScheme} from "@/hooks/useColorScheme";

interface SlideItemProps {
    data: ISlideData
}

const SlideItem = ({ data }: SlideItemProps) => {
    const navigation = useRouter()
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    src={data.image}
                    style={styles.reactLogo}
                />
            }>
            <View style={{ flex: 1, justifyContent: 'center', height: 450 }}>
                <Text style={styles.middleText} className={useColorScheme() == 'light' ? 'text-black' : 'text-white'}>{data.text1}</Text>
                <Text style={styles.middleText} className={useColorScheme() == 'light' ? 'text-black' : 'text-white'}>{data.text2}</Text>


                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('/(auth)')}>
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ParallaxScrollView>
    )
}

export default SlideItem

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        backgroundColor: '#1d5880',
        padding: 13,
        borderRadius: 10,
        marginTop: 50,
    },

    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'epilogue'
    },

    middleText: {
        textAlign: 'center',
        fontFamily: 'epilogue-m',
        fontSize: 21,
    },

    reactLogo: {
        height: 350,
        width: Dimensions.get('window').width,
        bottom: 0,
        left: 0,
        position: 'absolute',
    }
})