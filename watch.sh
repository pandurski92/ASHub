#!/bin/bash

echo "🚀 Стартирам ASHUB Авто-обновяване..."

# Стартираме Flutter веднъж в тестов режим
flutter run -d web-server --web-port 8080 --web-hostname 0.0.0.0 &

while true; do
  # Изчакваме 10 секунди (5 са твърде малко за компилация)
  sleep 10
  
  # Изпращаме сигнал "r" към последната команда, което е Hot Reload във Flutter
  echo "r" > /proc/self/fd/0
  
  echo "♻️ Кодът е обновен в $(date +%H:%M:%S)"
done