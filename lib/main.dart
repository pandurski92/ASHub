import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'dart:async';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    // Инициализация със защита за Web/IDX
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

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'ВХОД',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w100,
                  color: Color(0xFFD4AF37),
                  letterSpacing: 10,
                ),
              ),
              const SizedBox(height: 60),
              _authButton(
                label: 'Вход с Google',
                icon: Icons.g_mobiledata,
                onPressed: () => debugPrint("Google Login Clicked"),
              ),
              const SizedBox(height: 20),
              _authButton(
                label: 'Вход с Apple',
                icon: Icons.apple,
                onPressed: () => debugPrint("Apple Login Clicked"),
              ),
              const SizedBox(height: 40),
              const Text(
                'PREMIUM ACCESS ONLY',
                style: TextStyle(
                  color: Colors.white24,
                  fontSize: 10,
                  letterSpacing: 2,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _authButton({
    required String label,
    required IconData icon,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 55,
      child: ElevatedButton.icon(
        icon: Icon(icon, color: Colors.black, size: 28),
        label: Text(
          label,
          style: const TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFFD4AF37),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 0,
        ),
      ),
    );
  }
}
