import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {defaultStyle} from '@/utils/defaultStyle'
import {useRouter} from 'expo-router'
import {ITopic} from "@/interface";

interface TopicProps {
    topic: ITopic,
    course: any
}

const Topic = ({topic, course}: TopicProps) => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.navigate({
            pathname: '/videos',
            params: { course, topic: topic.title, classname: topic.classname }
        })}>
            <Ionicons name='bookmarks-outline' size={25}/>
            <View>
                <Text style={[defaultStyle.textmedium, {
                    fontSize: 15,
                    textTransform: 'capitalize',
                    width: 245
                }]}>{topic.title}</Text>
                <Text style={[defaultStyle.textmedium, {marginTop: 8, color: 'orange'}]}>{topic.desc.toString().slice(0, 30)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Topic

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
        flex: 1,
        gap: 15,
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOpacity: 0.1,
                shadowRadius: 0.5,
                shadowOffset: {
                    height: 3,
                    width: 3,
                },
            },
            android: {
                elevation: 3,
            },
        }),
    },

    numOfLessons: {
        backgroundColor: 'orange',
        width: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 8,
        borderRadius: 5,
    }
})