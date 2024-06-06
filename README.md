Valorant Fantasy react native ar laravel un mysql mobile app instrukcijas kā palaist <br>

1. Ielādējot cd līdz tiek uz mapi virs Fantasy_Valorant <br>
2. Run npm install expo <br>
3. Run npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-safe-area-context expo-secure-store <br>
npm install @react-navigation/native @react-navigation/native-stack<br>
4. Talak var pariet uz Fantasy_Valorant un npm start, ja tailwind izdomas stradat tad projekts aizgaja <br>
![fns-all-good](https://github.com/21DP2RJerm/ValoFantasy/assets/100911489/2a2b2680-b369-4d94-bd9c-e261eade1b0b) <br>
Prieks backend setup cd backend<br>
composer update <br>
cp .env.example .env un veic izmainas env faila<br>
php artisan migrate<br>
php artisan passport:client --personal<br>
php artisan passport:install<br>
php artisan key:generate<br>
php artisan serve<br>
