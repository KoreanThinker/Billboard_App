import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, BackHandler, ToastAndroid, Animated, StyleSheet, Easing } from 'react-native'
import Header from './Header'
import Body from './Body'
import Drawer from './Drawer';
// import BottomBannerAds from '../../components/View/BottomBannerAds';

const HomeScreen = () => {

    const [autoplay, setAutoplay] = useState(true)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [animation] = useState(new Animated.Value(0))

    const init = async () => {
        const auto = await AsyncStorage.getItem('@AUTO')
        if (auto == null) {
            setAutoPlayProcess(true)
        } else {
            setAutoPlayProcess(JSON.parse(auto))
        }

    }

    useEffect(() => {
        init()
    }, [])


    const setAutoPlayProcess = (value: boolean) => {
        setAutoplay(value)
        AsyncStorage.setItem('@AUTO', JSON.stringify(value))
    }

    const drawerOpen = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false
        }).start()
    }

    const drawerClose = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false
        }).start()
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <View style={{ flex: 1 }} >
                <Header
                    value={autoplay}
                    onPress={() => setAutoPlayProcess(!autoplay)}
                    onMenuPress={drawerOpen}
                />

                <Body
                    autoPlay={autoplay}
                />
            </View>

            {/* <Modal
                isVisible={isMenuVisible}
                onBackButtonPress={() => setIsMenuVisible(false)}
                onBackdropPress={() => setIsMenuVisible(false)}
                backdropOpacity={0.5}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <Drawer />
            </Modal> */}

            <Animated.View style={[styles.drawer, {
                height: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250]
                })
            }]} >
                {/* <View>
                    <BottomBannerAds />
                </View> */}
                <Drawer
                    animation={animation}
                    onClose={drawerClose}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    }
})


export default HomeScreen
