// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
 
export type Role = "player" | "referee" | "cameraman";
 
export interface UserProfile {
  name: string;
  role: Role;
  city: string;
  position: string;
  age: string;
  club: string;
  bio: string;
  photo: string;
}
 
const STORAGE_KEY = "pitchside_user";
 
export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
 
export function saveUser(user: UserProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
 
export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}
 
export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(getUser);
 
  const login = (profile: UserProfile) => {
    saveUser(profile);
    setUser(profile);
  };
 
  const update = (partial: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...partial };
    saveUser(updated);
    setUser(updated);
  };
 
  const logout = () => {
    clearUser();
    setUser(null);
  };
 
  return { user, login, update, logout };
}