# ngFire-Todos
### Todos app using Angular 2 &amp; FireStore (Firebase) with Dark Material Theme

The purpose of this project is to connect an **Angular 2** app to a **Firebase**'s service **Firestore** using **CRUD** functions.

If you want to clone it, you will have to set your Firebase keys at ```.../src/environments/environment.ts``` :

``` typescript

export const environment = {
  production: false,
  firebase: {
    apiKey: 'your-apiKey',
    authDomain: 'your-authDomain',
    databaseURL: 'your-databaseURL',
    projectId: 'your-projectId',
    storageBucket: 'your-storageBucket',
    messagingSenderId: 'your-messagingSenderId'
  }
};

```
