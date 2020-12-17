# Headlines - a React Native News App
This is a react-native client-side implementation of US news app. Users can navigate different categories as well as search for interested news.

The app utilizes **React-Navigation** for navigation, and incorporated **Redux.js** for global store.

![drawer menu](drawerMenu.PNG)

![screen](screen.PNG)

To try the app on your local machine, please clone the repo, `npm install`, and then create an `.env` file under project root folder. Inside the `.env` file, add the following content:
```
API_KEY= YOUR_API_KEY_HERE
API_BASE_URL='https://newsapi.org/v2/top-headlines'
```
Replace `YOUR_API_KEY_HERE` with your API key. This app calls [News API](https://newsapi.org/docs/get-started), which is available for free. Then you may run it on your device or emulator.


