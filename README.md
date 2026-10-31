# Школьный дневник — PWA

## Настройка Firebase
1. Создайте проект в https://console.firebase.google.com/.
2. Добавьте Web App (значок `</>`) и скопируйте `firebaseConfig`.
3. Вставьте один и тот же конфиг в `admin/firebase.js` и `student/firebase.js`.
4. Создайте Firestore Database.
5. Authentication → Sign-in method → включите Email/Password.
6. Authentication → Users → Add user: создайте администратора.
7. Скопируйте UID этого пользователя.
8. В `firestore.rules` замените `PASTE_ADMIN_UID_HERE` на UID и опубликуйте правила в Firestore → Rules.

Web config не является паролем. Не публикуйте пароль администратора или service account JSON. Чтение расписания открыто для учеников, но запись разрешена только UID администратора. Не храните персональные данные детей.

## GitHub Pages
1. Создайте репозиторий `school-diary`.
2. Загрузите папки `admin`, `student`, а также `firestore.rules` и `README.md` в корень.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Ссылки: `https://ВАШ-ЛОГИН.github.io/school-diary/admin/` и `https://ВАШ-ЛОГИН.github.io/school-diary/student/`.

## Установка
Откройте ссылку по HTTPS. iPhone: Safari → Поделиться → На экран «Домой». Android: Chrome → меню → Установить приложение.

## Локальная проверка
Открывайте через локальный HTTP-сервер (например, VS Code Live Server), не через `file://`.

Firebase бесплатен в пределах действующих квот; проверьте их в консоли перед использованием. Firestore в этой конфигурации публично читаем: используйте только расписание и задания без личных/конфиденциальных данных.
