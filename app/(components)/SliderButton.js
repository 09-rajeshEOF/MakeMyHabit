import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const SliderButton = ({ iconColor, iconSize, onSlideComplete, width = 250, height = 50 }) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            if (gesture.dx > 0 && gesture.dx <= width - height) {
                pan.x.setValue(gesture.dx);
            }
        },
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx >= width - height) {
                Animated.spring(pan.x, {
                    toValue: width - height,
                    useNativeDriver: false,
                }).start();
                onSlideComplete();
            } else {
                Animated.spring(pan.x, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    return (
        <View style={[styles.container, { width, height }]}>
            <Text style={styles.text}>Slide to confirm</Text>
            <Animated.View
                style={[
                    styles.slider,
                    { width: height, height, transform: [{ translateX: pan.x }] },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.arrowRight}>
                    <AntDesign name="rightcircle" size={iconSize || 24} color={iconColor || 'black'} />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 16,
        color: '#888',
    },
    slider: {
        position: 'absolute',
        left: 0,
        backgroundColor: '#6626bf',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowRight: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default SliderButton;