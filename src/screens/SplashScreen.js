import React from 'react';
import { View, Text, TouchableOpacity, Modal, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsModal({ visible, onClose, isDarkMode, setIsDarkMode, styles, colors }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Настройки</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.settingText}>Тъмна тема</Text>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={setIsDarkMode} 
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={isDarkMode ? "#FFF" : "#f4f3f4"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}