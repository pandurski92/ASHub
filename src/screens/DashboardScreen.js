import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import SettingsModal from '../components/SettingsModal';
import { streamingServices } from '../components/BackgroundLogos';

export default function DashboardScreen({ styles, colors, showSettings, setShowSettings, isDarkMode, setIsDarkMode }) {
  return (
    <View style={styles.menuContainer}>
      <SettingsModal 
        visible={showSettings} 
        onClose={() => setShowSettings(false)} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        styles={styles} 
        colors={colors} 
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.revHeader}>
          <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.profilePicContainer}>
            <MaterialCommunityIcons name="account" size={26} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color={colors.subText} />
            <Text style={styles.searchText}>Търсене</Text>
          </View>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="stats-chart" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <MaterialCommunityIcons name="credit-card-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.heroSection}>
            <Text style={styles.heroSubtitle}>Наличен баланс</Text>
            <View style={styles.heroMainTextRow}>
              <Text style={styles.heroMainNumber}>0.00</Text>
              <Text style={styles.heroMainSymbol}>лв.</Text>
            </View>
            <TouchableOpacity style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>BGN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.actionItem}>
              <TouchableOpacity style={styles.actionCircleBtn}>
                <Feather name="plus" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.actionLabel}>Добави пари</Text>
            </View>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.sectionHeading}>Моите абонаменти</Text>
            {streamingServices.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.listIconContainer}>
                  <Image source={item.img} style={styles.listIconImg} resizeMode="contain" />
                  <View style={styles.listIconBadge}>
                    <MaterialCommunityIcons name="shield-check" size={10} color="#FFF" />
                  </View>
                </View>
                <View style={styles.listTextCenter}>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.listSub}>{item.desc}</Text>
                </View>
                <View style={styles.listRight}>
                  <Text style={[styles.listStatusText, item.status === 'Изтича' ? {color: colors.danger} : {color: colors.success}]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNav styles={styles} colors={colors} />
    </View>
  );
}