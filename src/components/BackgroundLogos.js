import React, { useRef, useEffect } from 'react';
import { Animated, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const streamingServices = [
  { id: 1, img: require('../../assets/netflix.png'), size: width * 0.18, top: '10%', left: '5%', name: 'Netflix Premium', desc: 'Валиден до 15.12.2026', status: 'Активен' }, 
  { id: 2, img: require('../../assets/apple.png'), size: width * 0.25, top: '55%', left: '-5%', name: 'Apple TV+', desc: 'Валиден до 01.01.2027', status: 'Активен' },
  { id: 3, img: require('../../assets/disney.png'), size: width * 0.22, top: '25%', left: '60%', name: 'Disney+', desc: 'Оставащи 5 дни', status: 'Изтича' },
];

export default function BackgroundLogo({ service }) {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(moveAnim, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ position: 'absolute', zIndex: 1, top: service.top, left: service.left, transform: [{ translateY: moveAnim.interpolate({ inputRange: [0, 1], outputRange: [-15, 15] }) }] }}>
      <Image source={service.img} style={{ width: service.size, height: service.size / 1.5, opacity: 0.1 }} resizeMode="contain" />
    </Animated.View>
  );
}