import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundLogo, { streamingServices } from '../components/BackgroundLogos';
import SocialButtons from '../components/SocialButtons';

export default function AuthScreen({ stage, setStage, styles, colors }) {
  const isRegister = stage === 'register';
  const [regStep, setRegStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleAuth = () => {
    if (isRegister) {
      if (regStep === 1) {
        if (!formData.name.trim() || !formData.email.trim()) {
          Alert.alert('Грешка', 'Моля, въведете име и имейл');
          return;
        }
        if (!formData.email.includes('@')) {
          Alert.alert('Грешка', 'Невалиден имейл');
          return;
        }
        setRegStep(2);
      } else if (regStep === 2) {
        if (!formData.password || formData.password.length < 6) {
          Alert.alert('Грешка', 'Паролата трябва да е минимум 6 символа');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Грешка', 'Паролите не съвпадат');
          return;
        }
        setRegStep(3);
      } else if (regStep === 3) {
        if (!agreed) {
          Alert.alert('Грешка', 'Трябва да се съгласите с условията');
          return;
        }
        setStage('menu');
      }
    } else {
      if (!formData.email.trim() || !formData.password) {
        Alert.alert('Грешка', 'Моля, въведете имейл и парола');
        return;
      }
      setStage('menu');
    }
  };

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={StyleSheet.absoluteFill}>
        {streamingServices.map((s) => (
          <BackgroundLogo key={s.id} service={s} />
        ))}
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.loginCenter}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerGroup}>
          <MaterialCommunityIcons name="shield-lock" size={70} color={colors.primary} />
          <Text style={styles.title}>ASHUB</Text>
          <Text style={styles.subtitle}>Premium Media Security</Text>
        </View>

        <View style={styles.formGroup}>
          {isRegister && regStep === 1 && (
            <TextInput
              style={styles.input}
              placeholder="Пълно име"
              placeholderTextColor={colors.subText}
              value={formData.name}
              onChangeText={(text) => updateForm('name', text)}
              autoFocus
            />
          )}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.subText}
            value={formData.email}
            onChangeText={(text) => updateForm('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          
          {isRegister && regStep >= 2 && (
            <TextInput
              style={styles.input}
              placeholder="Парола"
              placeholderTextColor={colors.subText}
              value={formData.password}
              onChangeText={(text) => updateForm('password', text)}
              secureTextEntry
              autoComplete="password"
            />
          )}
          
          {isRegister && regStep === 2 && (
            <TextInput
              style={styles.input}
              placeholder="Повтори парола"
              placeholderTextColor={colors.subText}
              value={formData.confirmPassword}
              onChangeText={(text) => updateForm('confirmPassword', text)}
              secureTextEntry
              autoComplete="password"
            />
          )}

          {isRegister && regStep === 3 && (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setAgreed(!agreed)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                  {agreed && <MaterialCommunityIcons name="check" size={18} color="#FFF" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Съгласен съм с <Text style={styles.linkText}>условията и правилата</Text>
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.mainBtn, isRegister && regStep === 3 && !agreed && styles.disabledButton]}
            onPress={handleAuth}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>
              {isRegister 
                ? (regStep === 3 ? 'Завърши регистрация' : 'Напред') 
                : 'Вход'
              }
            </Text>
          </TouchableOpacity>

          {isRegister && regStep > 1 && (
            <TouchableOpacity onPress={() => setRegStep(regStep - 1)}>
              <Text style={styles.toggleAuthText}>← Назад</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.toggleAuthBtn} onPress={() => setStage(isRegister ? 'login' : 'register')}>
            <Text style={styles.toggleAuthText}>
              {isLogin ? 'Нямате акаунт? ' : 'Вече имате акаунт? '} 
              <Text style={styles.toggleAuthTextBold}>
                {isLogin ? 'Регистрация' : 'Влезте тук'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.divText}>ИЛИ</Text>
          <View style={styles.line} />
        </View>

        <SocialButtons styles={styles} colors={colors} onLogin={() => setStage('menu')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
