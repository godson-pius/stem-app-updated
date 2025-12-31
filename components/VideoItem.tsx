import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { IVideo } from "@/interface";
import YoutubePlayer from 'react-native-youtube-iframe';
import { extractYouTubeId } from '@/utils';

interface Props {
    video: IVideo
}

const VideoItem = ({ video }: Props) => {
    return (
        <>
            <View className={'w-full h-52 rounded-2xl overflow-hidden border-2 border-sky-500'}>
                {/* <WebView
                    originWhitelist={['*']}
                    source={{ html }}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsFullscreenVideo
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction={false}
                /> */}

                <YoutubePlayer
                    height={250}
                    play={false}
                    videoId={extractYouTubeId(video.url)}
                />
            </View>
            <Text className={'mt-2 mb-5 ml-4 font-medium text-lg'}>{video.title}</Text>
            {/*<View className={'w-full h-[1px] bg-gray-400 my-5'}></View>*/}
        </>
    )
}

export default VideoItem