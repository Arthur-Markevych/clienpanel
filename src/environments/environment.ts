// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAxANAm4fUNhFrBOenVQfjx_ozca__WaSc",
    authDomain: "clientpanel-test-app.firebaseapp.com",
    databaseURL: "https://clientpanel-test-app.firebaseio.com",
    projectId: "clientpanel-test-app",
    storageBucket: "clientpanel-test-app.appspot.com",
    messagingSenderId: "618884543408"
  }
};
