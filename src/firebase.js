
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Конфігурація Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBjbu92fvAJ97x_CIuKnxaOwPQ790T2Co4',
  authDomain: 'hotel-complex-2026.firebaseapp.com',
  projectId: 'hotel-complex-2026',
  storageBucket: 'hotel-complex-2026.firebasestorage.app',
  messagingSenderId: '515341994847',
  appId: '1:515341994847:web:8056fe7b86c794dce9c4ea',
}

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig)

// База даних Cloud Firestore
export const db = getFirestore(app)

// Firebase Authentication
export const auth = getAuth(app)
