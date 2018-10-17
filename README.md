# Calendar For The Year
Build with [React.js](https://reactjs.org)

### Installation
* Git clone [this repo](https://github.com/yury-herlovich/calendar-for-the-year).
* Move into the folder from your terminal:
```sh
    cd calendar-for-the-year
```
* Run `npm install` to install node dependencies.
* Create file .env.local with GOOGLE API key, Google OAuth 2.0 client ID (Web application), Calendar ID ([OAuth2.0 documentation](https://developers.google.com/calendar/auth))
```
    REACT_APP_CALENDAR_API_KEY={YOUR_KEY}
    REACT_APP_CALENDAR_CLIENT_ID={CLIENT_ID}
    REACT_APP_CALENDAR_ID={CALENDAR_ID}
```
* Run `npm run start-js` to start application.