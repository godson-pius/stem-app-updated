import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#5c5c6a' : '#ffffff',
                    elevation: 0, // optional: removes Android shadow
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 0 : 10,
                    borderRadius: 25,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="lectures"
                options={{
                    title: 'Lectures',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'videocam' : 'videocam-outline'} color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubble-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
