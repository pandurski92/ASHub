import React, { useEffect, useRef } from 'react';
import { View, StatusBar } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

export default function SplashScreen({ setStage }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Fallback: ако видеото не се зареди за 6 секунди, преминаваме към login
    const timeout = setTimeout(() => {
      setStage('login');
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.didJustFinish) {
      setStage('login');
    }
  };

  const handleError = (error) => {
    console.warn('Splash video error:', error);
    setStage('login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        source={require('../../assets/intro.mp4')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={handleError}
      />
    </View>
  );
}
