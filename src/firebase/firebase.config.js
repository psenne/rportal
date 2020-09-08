import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var prodconfig = {
    apiKey: "AIzaSyCNMMcb5kK1Mc-8v-_LjxI6gl7RDLbfj98",
    authDomain: "staffing-pipeline.firebaseapp.com",
    databaseURL: "https://staffing-pipeline.firebaseio.com",
    projectId: "staffing-pipeline",
    storageBucket: "staffing-pipeline.appspot.com",
    messagingSenderId: "403362370549",
    appId: "1:403362370549:web:486a369427a5fc45c406bc",
    measurementId: "G-2QF0PCWHWR"
};

var devconfig = {
    apiKey: "AIzaSyCzu1yAol8hre3s8SGINGzf0BwVFhxrIbY",
    authDomain: "staffing-pipeline-dev.firebaseapp.com",
    databaseURL: "https://staffing-pipeline-dev.firebaseio.com",
    projectId: "staffing-pipeline-dev",
    storageBucket: "staffing-pipeline-dev.appspot.com",
    messagingSenderId: "90337545773"
};

// eslint-disable-next-line
const config = process.env.NODE_ENV === "production" ? prodconfig : devconfig;
//const config = process.env.NODE_ENV === "production" ? devconfig : devconfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const fbLoginsDB = firebase.database().ref("logins");
const fbPositionsDB = firebase.database().ref("positions");
const fbContractsDB = firebase.database().ref("contracts");
const fbauth = firebase.auth();
firebase.analytics();


const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider(); //strictly use Google's Authentication service (built in to Firebase)
    return fbauth.signInWithPopup(provider);
};

//callback function for clicking profile avatar (logout button)
const SignOutWithGoogle = () => {
    return fbauth.signOut();
};

export default firebase;
export {  fbLoginsDB,  fbauth,  fbPositionsDB, fbContractsDB,  SignInWithGoogle, SignOutWithGoogle };
