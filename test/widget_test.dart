import 'package:flutter_test/flutter_test.dart';
import 'package:ashub/main.dart';

void main() {
  testWidgets('Проверка на заглавието на ASHUB', (WidgetTester tester) async {
    // Използваме ASHubApp, защото така се казва твоят основен клас сега
    await tester.pumpWidget(const ASHubApp());

    // Проверяваме дали на екрана се появява текстът ASHUB
    expect(find.text('ASHUB'), findsWidgets);
  });
}
