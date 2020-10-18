# Annaul Calendar
Build with [React.js](https://reactjs.org)

## Installation
* Git clone [this repo](https://github.com/yury-herlovich/annaul-calendar).
* Move into the folder from your terminal:
```sh
    cd annaul-calendar
```
* Run `npm install` to install node dependencies.
* Create file .env.local with GOOGLE API key, Google OAuth 2.0 client ID (Web application), Calendar ID ([OAuth2.0 documentation](https://developers.google.com/calendar/auth))
```
    REACT_APP_API_KEY={YOUR_KEY}
    REACT_APP_CLIENT_ID={CLIENT_ID}
    REACT_APP_CALENDAR_ID={CALENDAR_ID}
```
* Run `npm run start-js` to start application.


## Deploy to s3 bucket with ansible
* install ansible and boto for s3_sync module
* Create file deploy/group_vars/all
```
    S3_BUCKET: {S3_BUCKET}
```
* run `ansible-playbook deploy/ansible-deploy.yml` to deploy application to s3