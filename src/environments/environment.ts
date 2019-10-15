// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCy6vlIPZM-y-FT4-SmsCwqBy8U5fbitec',
    authDomain: 'lk-agro-market.firebaseapp.com',
    databaseURL: 'https://lk-agro-market.firebaseio.com',
    projectId: 'lk-agro-market',
    storageBucket: 'lk-agro-market.appspot.com',
    messagingSenderId: '564982565851',
    appId: '1:564982565851:web:978735d9e5289447'
  },
  googleMap: {
    apiKey: 'AIzaSyDPHKNX6jV8y91K6C8ZyaBVB2QQbkohx2w'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
