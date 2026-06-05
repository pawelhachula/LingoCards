import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TUTAJ wklej swoją rzeczywistą konfigurację Firebase z konsoli Firebase (https://console.firebase.google.com/)
// Aby włączyć logowanie Google, przejdź do zakładki Authentication -> Sign-in method -> Włącz Google.
const firebaseConfig = {
  apiKey: "PLACEHOLDER_API_KEY",
  authDomain: "PLACEHOLDER_AUTH_DOMAIN",
  projectId: "PLACEHOLDER_PROJECT_ID",
  storageBucket: "PLACEHOLDER_STORAGE_BUCKET",
  messagingSenderId: "PLACEHOLDER_MESSAGING_SENDER_ID",
  appId: "PLACEHOLDER_APP_ID"
};

// Sprawdzamy, czy klucz API jest skonfigurowany
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY";

let app;
let auth;
let googleProvider;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export { auth, googleProvider, isFirebaseConfigured };

// Funkcja logowania Google z fallbackiem (symulacją) dla łatwego testowania bez konfiguracji
export const signInWithGoogle = async () => {
  if (isFirebaseConfigured) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Zwracamy ujednolicony profil użytkownika
      return {
        username: result.user.displayName || result.user.email.split("@")[0],
        email: result.user.email,
        avatar: "👩‍🚀", // Domyślny awatar
        isGoogle: true
      };
    } catch (error) {
      console.error("Firebase Google Auth Error:", error);
      throw error;
    }
  } else {
    // Symulacja (Mock) - pozwala przetestować flow logowania Google bez konieczności zakładania konta Firebase
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          username: "Krzysztof Kowalski",
          email: "krzysztof.kowalski@gmail.com",
          avatar: "🦉",
          isGoogle: true,
          isMock: true
        });
      }, 1000);
    });
  }
};
