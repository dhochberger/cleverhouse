import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import PlanningScreen from '../screens/PlanningScreen'
import MoreScreen from '../screens/MoreScreen'
import { useState } from 'react'
import { TabBarIcon } from './TabBarIcon'

const Tab = createBottomTabNavigator()

export default function BottomTab() {
    const [showMore, setShowMore] = useState<boolean>(false)
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { display: 'flex', flexDirection: 'row' },
                    tabBarActiveTintColor: '#e91e63',
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Planning"
                    component={PlanningScreen}
                    options={{
                        title: 'Planning',
                        tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
                        headerShown: false,
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            setShowMore(false)
                        },
                    })}
                />
                <Tab.Screen
                    name="More"
                    component={MoreScreen}
                    options={{
                        title: 'More',
                        tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
                        headerShown: false,
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            setShowMore(false)
                        },
                    })}
                />
            </Tab.Navigator>
        </>
    )
}
