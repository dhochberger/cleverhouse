import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors } from '../constants/Styleguide';



function recoveryPage(props) {
    return (
        <SafeAreaView style={styles.container}>
        
            <StatusBar barStyle="light-content" />
         
            <Text style={styles.titleText}>Recovery </Text>
        </SafeAreaView>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColor,
        alignItems: 'center',
        padding: 30,
    },
    titleText: {
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 32,
    },
    buttonText: {
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 15,
        fontWeight: '600',
    },
    closeButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingBottom: 20,
        paddingLeft: 20,
    },
});

export default recoveryPage;
