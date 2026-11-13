import { act, renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { DEMO_CREDENTIALS } from '../../src/data/mockUsers';
import { strings } from '../../src/constants/strings';

const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  it('rejects a wrong password', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.isRestoring).toBe(false));
    let outcome: Awaited<ReturnType<typeof result.current.login>> | undefined;
    await act(async () => {
      outcome = await result.current.login(DEMO_CREDENTIALS.email, 'wrong');
    });
    expect(outcome).toEqual({ ok: false, error: strings.errors.invalidCredentials });
    expect(result.current.user).toBeNull();
  });

  it('logs in with the demo account and logs out', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.isRestoring).toBe(false));
    await act(async () => {
      await result.current.login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    });
    expect(result.current.user?.email).toBe(DEMO_CREDENTIALS.email);
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.user).toBeNull();
  });

  it('registers a new attendee and blocks a duplicate email', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.isRestoring).toBe(false));
    const payload = { fullName: 'Test User', email: 'test@example.com', organization: 'Clinic', password: 'Password1' };
    await act(async () => {
      await result.current.register(payload);
    });
    expect(result.current.user?.badgeId).toMatch(/^NMC-2026-/);
    await act(async () => {
      await result.current.logout();
    });
    let outcome: Awaited<ReturnType<typeof result.current.register>> | undefined;
    await act(async () => {
      outcome = await result.current.register(payload);
    });
    expect(outcome).toEqual({ ok: false, error: strings.errors.emailTaken });
  });
});
