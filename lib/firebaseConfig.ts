import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";





const firebaseConfig = {
    apiKey: "AIzaSyA3ZBjyCCTVScoXidLGdZ9o1r29gGRtV18",
    authDomain: "fithnitek-3df30.firebaseapp.com",
    projectId: "fithnitek-3df30",
    storageBucket: "fithnitek-3df30.firebasestorage.app",
    messagingSenderId: "62186584531",
    appId: "1:62186584531:web:cffeb1ea46c0f57e635726"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  export { app , auth} ;

  