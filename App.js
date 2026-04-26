import React, { useState, useMemo } from 'react';
import { StyleSheet, StatusBar, useWindowDimensions, Platform, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [stage, setStage] = useState('splash');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { width, height } = useWindowDimensions();

  const colors = useMemo(() => ({
    bg: isDarkMode ? '#0A0A0B' : '#F2F2F7',
    surface: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    subText: isDarkMode ? '#71797E' : '#8E8E93',
    border: isDarkMode ? '#23272E' : '#D1D1D6',
    primary: isDarkMode ? '#E5E4E2' : '#0A0A0B',
    primaryText: isDarkMode ? '#0A0A0B' : '#FFFFFF',
    inputBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
    danger: '#ff4444',
    success: '#34C759',
  }), [isDarkMode]);

  const getLocalStyles = (colors, width, height) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    menuContainer: { flex: 1, backgroundColor: colors.bg },
    safeArea: { flex: 1, backgroundColor: colors.bg },
    
    loginCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '8%', zIndex: 10 },
    headerGroup: { alignItems: 'center', marginBottom: height * 0.05 },
    title: { fontSize: width * 0.1, fontWeight: 'bold', letterSpacing: 8, color: colors.text },
    subtitle: { fontSize: 12, color: colors.subText, letterSpacing: 2, textTransform: 'uppercase' },
    formGroup: { width: '100%', maxWidth: 400 },
    input: { height: 60, backgroundColor: colors.inputBg, borderRadius: 15, paddingHorizontal: 20, color: colors.text, marginBottom: 15, borderWidth: 1, borderColor: colors.border },
    mainBtn: { height: 60, backgroundColor: colors.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    btnText: { color: colors.primaryText, fontWeight: 'bold', fontSize: 16 },
    divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
    line: { flex: 1, height: 1, backgroundColor: colors.border },
    divText: { color: colors.subText, paddingHorizontal: 15, fontSize: 10 },
    socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
    socialBtn: { width: '48%', height: 55, borderRadius: 15, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.inputBg },
    socialBtnText: { color: colors.text, marginLeft: 10, fontSize: 14, fontWeight: '500' },
    toggleAuthBtn: { marginTop: 30, alignItems: 'center' },
    toggleAuthText: { color: colors.subText, fontSize: 14 },
    toggleAuthTextBold: { color: colors.text, fontWeight: 'bold', fontSize: 14, marginTop: 10, textAlign: 'center' },
    
    // Dashboard styles
    revHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
    profilePicContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, height: 36, borderRadius: 18, marginHorizontal: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.border },
    searchText: { color: colors.subText, marginLeft: 8, fontSize: 15 },
    headerIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderWidth: 1, borderColor: colors.border },
    heroSection: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
    heroSubtitle: { color: colors.subText, fontSize: 14, fontWeight: '500', marginBottom: 5 },
    heroMainTextRow: { flexDirection: 'row', alignItems: 'baseline' },
    heroMainNumber: { color: colors.text, fontSize: 65, fontWeight: 'bold' },
    heroMainSymbol: { color: colors.text, fontSize: 24, fontWeight: 'bold', marginLeft: 5 },
    heroBtn: { backgroundColor: colors.surface, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 15, marginTop: 10, borderWidth: 1, borderColor: colors.border },
    heroBtnText: { color: colors.text, fontSize: 12, fontWeight: '600' },
    actionsRow: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 35 },
    actionItem: { alignItems: 'center' },
    actionCircleBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: colors.border },
    actionLabel: { color: colors.text, fontSize: 13, fontWeight: '500' },
    listContainer: { backgroundColor: colors.surface, borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 20, paddingTop: 25, paddingBottom: 50, minHeight: 400, shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
    sectionHeading: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    listIconContainer: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    listIconImg: { width: '60%', height: '60%' },
    listIconBadge: { position: 'absolute', bottom: -2, right: -2, backgroundColor: colors.surface, borderRadius: 10, padding: 2 },
    listTextCenter: { flex: 1, marginLeft: 15 },
    listTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 2 },
    listSub: { color: colors.subText, fontSize: 13 },
    listRight: { alignItems: 'flex-end' },
    listStatusText: { fontSize: 14, fontWeight: '600' },
    bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: Platform.OS === 'ios' ? 85 : 70, backgroundColor: colors.bg, flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
    navItem: { alignItems: 'center', flex: 1 },
    navText: { color: colors.subText, fontSize: 11, marginTop: 4, fontWeight: '500' },
    navTextActive: { color: colors.text, fontSize: 11, marginTop: 4, fontWeight: 'bold' },
    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, minHeight: 250 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    modalTitle: { color: colors.text, fontSize: 20, fontWeight: 'bold' },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
    settingText: { color: colors.text, fontSize: 16, fontWeight: '500' },
    // Checkbox
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25, gap: 12 },
    checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.subText, alignItems: 'center', justifyContent: 'center' },
    checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
    checkboxText: { color: colors.text, fontSize: 14, flexShrink: 1 },
    linkText: { color: colors.text, textDecorationLine: 'underline' },
    registerContent: { padding: 25, paddingBottom: 50 },
    disabledButton: { opacity: 0.5 },
  });

  const styles = useMemo(() => getLocalStyles(colors, width, height), [colors, width, height]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {stage === 'splash' && (
        <SplashScreen setStage={setStage} />
      )}
      
      {(stage === 'login' || stage === 'register') && (
        <AuthScreen stage={stage} setStage={setStage} styles={styles} colors={colors} />
      )}
      
      {stage === 'menu' && (
        <DashboardScreen 
          styles={styles} 
          colors={colors} 
          showSettings={showSettings} 
          setShowSettings={setShowSettings} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
      )}
    </>
  );
}
