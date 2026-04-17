import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';
import 'dart:async';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
      home: FutureBuilder(
        future: Firebase.initializeApp(
          options: DefaultFirebaseOptions.currentPlatform,
        ),
        builder: (context, snapshot) {
          if (snapshot.hasError)
            return const Scaffold(body: Center(child: Text('Firebase Error')));
          if (snapshot.connectionState == ConnectionState.done)
            return const AuthWrapper();
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(color: Color(0xFFD4AF37)),
            ),
          );
        },
      ),
    );
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.hasData) return const HomeScreen();
        return const LoginScreen();
      },
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _pass = TextEditingController();

  Future<void> _login() async {
    if (_email.text.isEmpty || _pass.text.isEmpty) return;
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _email.text.trim(),
        password: _pass.text.trim(),
      );
    } catch (e) {
      try {
        await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _email.text.trim(),
          password: _pass.text.trim(),
        );
      } catch (err) {
        if (!mounted) return;
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text("Грешка: $err")));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(30.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'ASHUB',
              style: TextStyle(
                fontSize: 32,
                color: Color(0xFFD4AF37),
                letterSpacing: 10,
              ),
            ),
            const SizedBox(height: 40),
            TextField(
              controller: _email,
              decoration: const InputDecoration(hintText: 'Имейл'),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: _pass,
              obscureText: true,
              decoration: const InputDecoration(hintText: 'Парола'),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: _login,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFD4AF37),
                minimumSize: const Size(double.infinity, 55),
              ),
              child: const Text(
                'ВЛЕЗ / РЕГИСТРАЦИЯ',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ASHUB PREMIUM'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => FirebaseAuth.instance.signOut(),
          ),
        ],
      ),
      body: Center(
        child: Text('Добре дошъл, ${FirebaseAuth.instance.currentUser?.email}'),
      ),
    );
  }
}

