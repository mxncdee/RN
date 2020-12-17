# React Native - RNews App

This is a react-native client-side implementation of US news app. Users can navigate different categories as well as search for interested news.

L'app utilizza React-Native per la navigazione e Redux per lo store globale.


To try the app on your local machine, please clone the repo, `npm install`, and then create an `.env` file under project root folder.

All'interno creare il file .env e aggiugere:
    API_KEY= xxx
    API_BASE_URL='https://newsapi.org/v2/top-headlines'

Replace `YOUR_API_KEY_HERE` with your API key. This app calls [News API](https://newsapi.org/docs/get-started), which is available for free. Then you may run it on your device or emulator.


