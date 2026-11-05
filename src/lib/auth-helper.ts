import { auth } from './firebase';
import { User, signOut } from 'firebase/auth';

const ADMIN_EMAIL = 'khjjvhasnhsbbs@gmail.com';
const STORAGE_KEY = 'aurevent_admin_session';

export interface AdminUser {
  email: string;
  displayName: string;
  isSession: boolean;
}

export function getStoredAdmin(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && data.email === ADMIN_EMAIL) {
      return data;
    }
  } catch (e) {
    console.warn('Failed to parse admin session:', e);
  }
  return null;
}

export function setStoredAdmin(): AdminUser {
  const admin: AdminUser = {
    email: ADMIN_EMAIL,
    displayName: 'Executive Administrator',
    isSession: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
  window.dispatchEvent(new Event('admin_auth_changed'));
  return admin;
}

export function clearStoredAdmin(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('admin_auth_changed'));
}

export async function logoutAdmin(): Promise<void> {
  clearStoredAdmin();
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Firebase signout error:', e);
  }
}

export function isAuthorizedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function subscribeAdminAuth(callback: (user: { email: string; displayName?: string | null } | null) => void): () => void {
  // Check initial state
  const stored = getStoredAdmin();
  if (stored) {
    callback(stored);
  } else if (auth.currentUser && isAuthorizedEmail(auth.currentUser.email)) {
    callback({ email: auth.currentUser.email!, displayName: auth.currentUser.displayName });
  } else {
    callback(null);
  }

  // Firebase listener
  const unsubscribeFirebase = auth.onAuthStateChanged((fbUser: User | null) => {
    const currentStored = getStoredAdmin();
    if (fbUser && isAuthorizedEmail(fbUser.email)) {
      callback({ email: fbUser.email!, displayName: fbUser.displayName });
    } else if (currentStored) {
      callback(currentStored);
    } else {
      callback(null);
    }
  });

  // Local storage / session listener
  const handleStorageChange = () => {
    const currentStored = getStoredAdmin();
    if (currentStored) {
      callback(currentStored);
    } else if (auth.currentUser && isAuthorizedEmail(auth.currentUser.email)) {
      callback({ email: auth.currentUser.email!, displayName: auth.currentUser.displayName });
    } else {
      callback(null);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('admin_auth_changed', handleStorageChange);

  return () => {
    unsubscribeFirebase();
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('admin_auth_changed', handleStorageChange);
  };
}
