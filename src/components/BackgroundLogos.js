import React, { useRef, useEffect } from 'react';
import { Animated, Image, useWindowDimensions } from 'react-native';

export const streamingServices = [
  { id: 1, img: require('../../assets/netflix.png'), name: 'Netflix Premium', desc: 'Валиден до 15.12.2026', status: 'Активен' }, 
  { id: 2, img: require('../../assets/apple.png'), name: 'Apple TV+', desc: 'Валиден до 01.01.2027', status: 'Активен' },
  { id: 3, img: require('../../assets/disney.png'), name: 'Disney+', desc: 'Оставащи 5 дни', status: 'Изтича' },
  { id: 4, img: require('../../assets/voyo.png'), name: 'Voyo', desc: 'Активен', status: 'Активен' },
  { id: 5, img: require('../../assets/sky.png'), name: 'Sky Sport', desc: 'Активен', status: 'Активен' },
];

export default function BackgroundLogo({ service }) {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  // Calculate dynamic position based on screen size
  const positions = {
    1: { top: height * 0.10, left: width * 0.05 },
    2: { top: height * 0.55, left: width * -0.05 },
    3: { top: height * 0.25, left: width * 0.60 },
    4: { top: height * 0.75, left: width * 0.65 },
    5: { top: height * 0.85, left: width * 0.15 },
  };

  const pos = positions[service.id] || { top: 0, left: 0 };
  const size = width * (0.18 - (service.id - 1) * 0.02); // decreasing size pattern

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(moveAnim, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={{ 
      position: 'absolute', 
      zIndex: 1, 
      top: pos.top, 
      left: pos.left, 
      transform: [{ translateY: moveAnim.interpolate({ inputRange: [0, 1], outputRange: [-15, 15] }) }] 
    }}>
      <Image source={service.img} style={{ width: size, height: size / 1.5, opacity: 0.1 }} resizeMode="contain" />
    </Animated.View>
  );
}