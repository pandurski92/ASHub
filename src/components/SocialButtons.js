import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function SocialButtons({ styles, colors, onLogin }) {
  return (
    <View style={styles.socialRow}>
      <TouchableOpacity style={styles.socialBtn} onPress={onLogin}>
        <AntDesign name="google" size={20} color={colors.text} />
        <Text style={styles.socialBtnText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn} onPress={onLogin}>
        <FontAwesome name="apple" size={20} color={colors.text} />
        <Text style={styles.socialBtnText}>Apple</Text>
      </TouchableOpacity>
    </View>
  );
}