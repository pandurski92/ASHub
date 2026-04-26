import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNav({ styles, colors }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="home-variant" size={26} color={colors.text} />
        <Text style={styles.navTextActive}>Начало</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="cart-outline" size={26} color={colors.subText} />
        <Text style={styles.navText}>Купи</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="storefront-outline" size={26} color={colors.subText} />
        <Text style={styles.navText}>Продай</Text>
      </TouchableOpacity>
    </View>
  );
}