
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB570bpuRxDo0lxcrmio4uf4oTz6Pn7iG4",
  authDomain: "makemyhabit-db67d.firebaseapp.com",
  projectId: "makemyhabit-db67d",
  storageBucket: "makemyhabit-db67d.appspot.com",
  messagingSenderId: "684692302574",
  appId: "1:684692302574:web:20bdeb78cabfb9e324e1ff",
  measurementId: "G-JJWK96ZCKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;