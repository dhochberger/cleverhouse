import * as React from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Tab, TabView } from 'react-native-elements'

import { Text, View } from '../components/Themed'

export default function MoreScreen() {
    const [index, setIndex] = useState(1)

    return (
        <>
            <TabView value={index}>
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text>Recovery</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text>Simulation</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text>Share</Text>
                </TabView.Item>
            </TabView>

            <Tab
                value={index}
                onChange={setIndex}
                style={{ display: 'flex', position: 'absolute', bottom: 0, width: '100%' }}
            >
                <Tab.Item title="Recovery" />
                <Tab.Item title="Simulation" />
                <Tab.Item title="Share" />
            </Tab>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
})
