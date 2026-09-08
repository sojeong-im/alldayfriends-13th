import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// 올데프 13기 공식 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDThHDfHPkP7GvoJXN9hESGKmGnQbZV4JI",
  authDomain: "alldef-3fb83.firebaseapp.com",
  projectId: "alldef-3fb83",
  storageBucket: "alldef-3fb83.firebasestorage.app",
  messagingSenderId: "405382096851",
  appId: "1:405382096851:web:e3e8bd39fa23fba0e77126",
  measurementId: "G-ZL2DQ33KMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (브라우저 환경 지원 확인 후 안전하게 초기화)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
