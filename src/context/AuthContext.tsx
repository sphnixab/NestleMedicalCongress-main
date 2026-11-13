import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { strings } from '../constants/strings';
import { DEMO_CREDENTIALS, MockUserRecord, mockUsers } from '../data/mockUsers';
import { readJson, removeKey, writeJson } from '../services/storage';
import { User } from '../types/models.types';

const USERS_KEY = 'nmc.users';
const SESSION_KEY = 'nmc.session';

export interface RegisterPayload {
  fullName: string;
  email: string;
  organization: string;
  password: string;
}

export type ProfileUpdate = Pick<User, 'fullName' | 'designation' | 'phone' | 'location'>;

/** `error` is only set when `ok` is false. */
type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthContextValue {
  user: User | null;
  isRestoring: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  demoSocialLogin: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const toPublicUser = ({ password: _password, ...user }: MockUserRecord): User => user;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<MockUserRecord[]>(mockUsers);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // On launch, load the saved accounts and the signed-in user (if any).
  useEffect(() => {
    const restore = async () => {
      const savedUsers = await readJson<MockUserRecord[]>(USERS_KEY);
      const savedSession = await readJson<string>(SESSION_KEY);
      if (savedUsers && savedUsers.length > 0) {
        setUsers(savedUsers);
        if (savedSession && savedUsers.some(item => item.id === savedSession)) {
          setCurrentId(savedSession);
        }
      }
      setIsRestoring(false);
    };
    restore();
  }, []);

  const saveUsers = useCallback(async (next: MockUserRecord[]) => {
    setUsers(next);
    await writeJson(USERS_KEY, next);
  }, []);

  const startSession = useCallback(async (id: string) => {
    setCurrentId(id);
    await writeJson(SESSION_KEY, id);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const found = users.find(item => item.email.toLowerCase() === email.trim().toLowerCase());
      if (!found || found.password !== password) {
        return { ok: false, error: strings.errors.invalidCredentials };
      }
      await startSession(found.id);
      return { ok: true };
    },
    [users, startSession],
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResult> => {
      const email = payload.email.trim().toLowerCase();
      if (users.some(item => item.email.toLowerCase() === email)) {
        return { ok: false, error: strings.errors.emailTaken };
      }
      const number = String(users.length + 1).padStart(3, '0');
      const newUser: MockUserRecord = {
        id: `u-${number}`,
        fullName: payload.fullName.trim(),
        email,
        password: payload.password,
        organization: payload.organization.trim(),
        designation: payload.organization.trim(),
        phone: '',
        location: 'Dubai, UAE',
        attendeeType: 'Attendee',
        badgeId: `NMC-2026-${number}`,
        certificates: 0,
      };
      await saveUsers([...users, newUser]);
      await startSession(newUser.id);
      return { ok: true };
    },
    [users, saveUsers, startSession],
  );

  // Google / Apple sign-in are not wired to a real provider, so both buttons log in the demo account.
  const demoSocialLogin = useCallback(async () => {
    const demo = users.find(item => item.email === DEMO_CREDENTIALS.email) ?? users[0];
    await startSession(demo.id);
  }, [users, startSession]);

  const logout = useCallback(async () => {
    setCurrentId(null);
    await removeKey(SESSION_KEY);
  }, []);

  const updateProfile = useCallback(
    async (update: ProfileUpdate) => {
      const next = users.map(item => (item.id === currentId ? { ...item, ...update } : item));
      await saveUsers(next);
    },
    [users, currentId, saveUsers],
  );

  const user = useMemo(() => {
    const found = users.find(item => item.id === currentId);
    return found ? toPublicUser(found) : null;
  }, [users, currentId]);

  const value = useMemo(
    () => ({ user, isRestoring, login, register, demoSocialLogin, logout, updateProfile }),
    [user, isRestoring, login, register, demoSocialLogin, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
