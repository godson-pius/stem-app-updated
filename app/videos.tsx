import {Alert, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { defaultStyle } from '@/utils/defaultStyle'
import VideoItem from '@/components/VideoItem';
import {useLocalSearchParams} from "expo-router";
import {getAllTopicsForACourse, getAllUploadsForACourse} from "@/utils/firestore";
import {IVideo} from "@/interface";
import { SafeAreaView } from 'react-native-safe-area-context'

const videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Videos = () => {
    const [videos, setVideos] = useState<IVideo[]>([])
    const [refreshing, setRefreshing] = React.useState(false);
    const args = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true)

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        try {
            await fetchVideos()
        } catch (e) {
            Alert.alert("Error fetching topics")
        } finally {
            setRefreshing(false);
        }
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        const courseDetails = {
            course: args.course,
            classname: args.classname,
            topic: args.topic,
        }
        const res = await getAllUploadsForACourse(courseDetails)
        if (res) {
            setVideos(res)
            setLoading(false);
        } else {
            setLoading(false);
            return null
        }
    }

    useEffect(() => {
        (async () => {
            await fetchVideos()
        })()
    }, [args.name]);

    const ref = useRef(null)
    // const player = useVideoPlayer(videoSource, player => {
    //     player.loop = true;
    //     player.play();
    // })

    return (
        
            <ScrollView
                className={'pt-10'}
                style={defaultStyle.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 90}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {!loading ? (
                    videos.length > 0 ? (
                            videos.map((video, index) => (
                                <VideoItem key={index} video={video} />
                            ))
                        ) : <Text>No video lessons yet!</Text>
                ) : (
                    <ActivityIndicator size={"small"} className={'my-5 text-blue-900'} />
                )}
            </ScrollView>
        
    )
}

export default Videos

const styles = StyleSheet.create({})