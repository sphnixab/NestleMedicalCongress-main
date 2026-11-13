import { act, renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { AppDataProvider, useAppData } from '../../src/context/AppDataContext';
import { AuthProvider } from '../../src/context/AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <AppDataProvider>{children}</AppDataProvider>
  </AuthProvider>
);

const setup = async () => {
  const hook = renderHook(() => useAppData(), { wrapper });
  // Let the providers finish reading from storage before the test starts changing things.
  await waitFor(() => expect(hook.result.current.polls.length).toBeGreaterThan(0));
  await act(async () => {});
  return hook;
};

describe('AppDataContext', () => {
  it('toggles a session bookmark on and off', async () => {
    const { result } = await setup();
    act(() => result.current.toggleSession('s-01'));
    expect(result.current.sessionIds).toEqual(['s-01']);
    act(() => result.current.toggleSession('s-01'));
    expect(result.current.sessionIds).toEqual([]);
  });

  it('counts a vote once per poll', async () => {
    const { result } = await setup();
    const poll = result.current.polls[0];
    const option = poll.options[0];
    act(() => result.current.vote(poll.id, option.id));
    act(() => result.current.vote(poll.id, option.id));
    const updated = result.current.polls[0].options[0];
    expect(updated.votes).toBe(option.votes + 1);
    expect(result.current.selections[poll.id]).toBe(option.id);
  });

  it('adds a question at the top and toggles upvotes', async () => {
    const { result } = await setup();
    act(() => result.current.addQuestion('How should we plan infant meals?', 'Nutrition', 'Tester'));
    const added = result.current.questions[0];
    expect(added.text).toBe('How should we plan infant meals?');
    act(() => result.current.toggleUpvote(added.id));
    expect(result.current.questions[0].upvotes).toBe(1);
    act(() => result.current.toggleUpvote(added.id));
    expect(result.current.questions[0].upvotes).toBe(0);
  });
});
