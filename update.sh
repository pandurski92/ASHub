#!/bin/bash
echo "�� Стартирам качване към GitHub..."
git add .
git commit -m "Синхронизация на дизайна: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Промените са в твоя GitHub!"
