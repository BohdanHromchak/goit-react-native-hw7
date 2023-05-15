import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ1QyYbWm-KQEPXbv-m8VK8a9crWru9zs",
  authDomain: "goit-react-native-76a90.firebaseapp.com",
  databaseURL: "https://goit-react-native-76a90-default-rtdb.firebaseio.com",
  projectId: "goit-react-native-76a90",
  storageBucket: "goit-react-native-76a90.appspot.com",
  messagingSenderId: "773884801386",
  appId: "1:773884801386:web:25adcb8203e8e4bbb0f513",
  measurementId: "G-2PJXXD3LX4"
};

export default firebase.initializeApp(firebaseConfig);
