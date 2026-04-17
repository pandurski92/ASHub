import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'dart:async';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    debugPrint("Firebase init check: $e");
  }
  runApp(const ASHubApp());
}

class ASHubApp extends StatelessWidget {
  const ASHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'ASHUB',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Colors.black,
        colorScheme: const ColorScheme.dark(primary: Color(0xFFD4AF37)),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
    _controller.forward();

    Timer(const Duration(seconds: 4), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const LoginScreen()),
        );
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/logo.png',
                width: 200,
                errorBuilder: (context, error, stackTrace) => const Icon(
                  Icons.stars,
                  color: Color(0xFFD4AF37),
                  size: 100,
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'ASHUB',
                style: TextStyle(
                  color: Color(0xFFD4AF37),
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 6,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          // Добавяме скрол, за да не пречи клавиатурата
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 80),
                const Text(
                  'ВХОД',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w100,
                    color: Color(0xFFD4AF37),
                    letterSpacing: 10,
                  ),
                ),
                const SizedBox(height: 50),

                // Поле за Имейл
                _textField(
                  controller: _emailController,
                  hint: 'Имейл адрес',
                  icon: Icons.email_outlined,
                ),
                const SizedBox(height: 15),

                // Поле за Парола
                _textField(
                  controller: _passwordController,
                  hint: 'Парола',
                  icon: Icons.lock_outline,
                  isPassword: true,
                ),
                const SizedBox(height: 25),

                // Бутон за Вход с Имейл
                _mainButton(
                  label: 'ВЛЕЗ',
                  onPressed: () =>
                      debugPrint("Email Login: ${_emailController.text}"),
                ),

                const SizedBox(height: 30),
                const Text("или", style: TextStyle(color: Colors.grey)),
                const SizedBox(height: 30),

                // Социални бутони
                _socialButton(
                  label: 'Вход с Google',
                  icon: Icons.g_mobiledata,
                  onPressed: () => debugPrint("Google Login Clicked"),
                ),
                const SizedBox(height: 15),
                _socialButton(
                  label: 'Вход с Apple',
                  icon: Icons.apple,
                  onPressed: () => debugPrint("Apple Login Clicked"),
                ),

                const SizedBox(height: 50),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // Дизайн за текстовите полета
  Widget _textField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool isPassword = false,
  }) {
    return TextField(
      controller: controller,
      obscureText: isPassword,
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        prefixIcon: Icon(icon, color: const Color(0xFFD4AF37), size: 20),
        hintText: hint,
        hintStyle: const TextStyle(color: Colors.white24, fontSize: 14),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.white10),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFD4AF37), width: 0.5),
        ),
        filled: true,
        fillColor: Colors.white.withOpacity(0.05),
      ),
    );
  }

  // Основен златен бутон
  Widget _mainButton({required String label, required VoidCallback onPressed}) {
    return SizedBox(
      width: double.infinity,
      height: 55,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFFD4AF37),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 0,
        ),
        child: Text(
          label,
          style: const TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            letterSpacing: 2,
          ),
        ),
      ),
    );
  }

  // Стилизирани социални бутони (с контур)
  Widget _socialButton({
    required String label,
    required IconData icon,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 55,
      child: OutlinedButton.icon(
        icon: Icon(icon, color: Colors.white, size: 24),
        label: Text(
          label,
          style: const TextStyle(color: Colors.white, fontSize: 15),
        ),
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          side: const BorderSide(color: Colors.white10),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }
}
