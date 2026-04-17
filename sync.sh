#!/bin/bash
echo "🚀 Стартирам автоматична синхронизация за ASHub..."
while true
do
  # Проверява за промени в GitHub без да ги сваля веднага
  git fetch origin main
  
  # Сравнява локалния код с този в GitHub
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse @{u})

  if [ $LOCAL != $REMOTE ]; then
    echo "✨ Открити са нови промени! Обновявам кода..."
    git reset --hard origin/main
    # Командата за Hot Reload във Flutter (ако работи в друг таб)
    echo "r" > /tmp/flutter_commands
  fi
  
  sleep 3
done