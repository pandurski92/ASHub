import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SocialButtons from '../components/SocialButtons';

export default function AuthScreen({ stage, setStage, styles, colors }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [regStep, setRegStep] = useState(1);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Грешка', 'Моля, въведете имейл и парола');
      return;
    }
    setStage('menu');
  };

  const handleRegister = () => {
    if (regStep === 1) {
      if (!name || !email) {
        Alert.alert('Грешка', 'Моля, въведете име и имейл');
        return;
      }
      setRegStep(2);
    } else if (regStep === 2) {
      if (!password || password !== confirmPassword) {
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
  };

  const isRegister = stage === 'register';

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.loginCenter} keyboardShouldPersistTaps="handled">
          <View style={styles.headerGroup}>
            <MaterialCommunityIcons name="shield-lock" size={70} color={colors.primary} />
            <Text style={styles.title}>ASHUB</Text>
            <Text style={styles.subtitle}>Premium Media Security</Text>
          </View>

          <View style={styles.formGroup}>
            {isRegister && regStep === 1 && (
              <TextInput
                style={styles.input}
                placeholder="Име"
                placeholderTextColor={colors.subText}
                value={name}
                onChangeText={setName}
                autoFocus={false}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.subText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            
            {isRegister && regStep >= 2 && (
              <TextInput
                style={styles.input}
                placeholder="Парола"
                placeholderTextColor={colors.subText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            )}
            
            {isRegister && regStep === 2 && (
              <TextInput
                style={styles.input}
                placeholder="Повтори парола"
                placeholderTextColor={colors.subText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                  Съгласен съм с <Text style={styles.linkText}>условията</Text>
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.mainBtn, isRegister && regStep === 3 && !agreed && styles.disabledButton]}
              onPress={isRegister ? handleRegister : handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                {isRegister ? (regStep === 3 ? 'Завърши регистрация' : 'Напред') : 'Вход'}
              </Text>
            </TouchableOpacity>

            {isRegister && regStep > 1 && (
              <TouchableOpacity onPress={() => setRegStep(regStep - 1)}>
                <Text style={styles.toggleAuthText}>Назад</Text>
              </TouchableOpacity>
            )}

            {!isRegister && (
              <TouchableOpacity onPress={() => setStage('register')}>
                <Text style={styles.toggleAuthTextBold}>Нямаш акаунт? Създай</Text>
              </TouchableOpacity>
            )}

            {isRegister && regStep < 3 && (
              <TouchableOpacity onPress={() => setStage('login')}>
                <Text style={styles.toggleAuthTextBold}>Имаш акаунт? Влез</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.divText}>ИЛИ</Text>
            <View style={styles.line} />
          </View>

          <SocialButtons styles={styles} colors={colors} onLogin={() => {}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
