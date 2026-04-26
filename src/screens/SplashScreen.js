import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function SplashScreen({ setStage }) {
  useEffect(() => {
    // Fallback: ако видеото не се зареди за 5 секунди, преминаваме към login
    const timeout = setTimeout(() => {
      setStage('login');
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden />
      <Video
        source={require('../../assets/intro.mp4')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status && status.didJustFinish) {
            setStage('login');
          }
        }}
        onError={(error) => {
          console.warn('Video error:', error);
          setStage('login');
        }}
      />
    </View>
  );
}
        }}
      />
    </View>
  );
}
