import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { mockPolls } from '../data/mockVoting';
import { mockQuestions } from '../data/mockQuestions';
import { readJson, writeJson } from '../services/storage';
import { Poll, Question, QuestionCategory } from '../types/models.types';
import { useAuth } from './AuthContext';

/** Everything the attendee changes while using the app. Sessions, speakers etc. are read-only data. */
interface AppData {
  sessionIds: string[];
  speakerIds: string[];
  resourceIds: string[];
  downloadedIds: string[];
  polls: Poll[];
  /** pollId -> optionId the attendee voted for */
  selections: Record<string, string>;
  questions: Question[];
  upvotedIds: string[];
  notificationsEnabled: boolean;
  remindersEnabled: boolean;
}

const createInitialData = (): AppData => ({
  sessionIds: [],
  speakerIds: [],
  resourceIds: [],
  downloadedIds: [],
  polls: JSON.parse(JSON.stringify(mockPolls)) as Poll[],
  selections: {},
  questions: mockQuestions.map(question => ({ ...question })),
  upvotedIds: [],
  notificationsEnabled: true,
  remindersEnabled: true,
});

interface AppDataContextValue extends AppData {
  toggleSession: (id: string) => void;
  toggleSpeaker: (id: string) => void;
  toggleResource: (id: string) => void;
  clearSaved: () => void;
  markDownloaded: (id: string) => void;
  vote: (pollId: string, optionId: string) => void;
  addQuestion: (text: string, category: QuestionCategory, author: string) => void;
  toggleUpvote: (id: string) => void;
  toggleNotifications: () => void;
  toggleReminders: () => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

const toggleInList = (list: string[], id: string): string[] =>
  list.includes(id) ? list.filter(item => item !== id) : [...list, id];

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState<AppData>(createInitialData);
  const loadedFor = useRef<string | null>(null);

  // Each attendee gets their own saved data, so it is loaded again whenever the user changes.
  const storageKey = user ? `nmc.data.${user.id}` : null;

  useEffect(() => {
    if (!storageKey) {
      loadedFor.current = null;
      setData(createInitialData());
      return;
    }
    readJson<AppData>(storageKey).then(saved => {
      setData(saved ? { ...createInitialData(), ...saved } : createInitialData());
      loadedFor.current = storageKey;
    });
  }, [storageKey]);

  // Save after every change, but only once the stored data for this user has been loaded.
  useEffect(() => {
    if (storageKey && loadedFor.current === storageKey) {
      writeJson(storageKey, data);
    }
  }, [data, storageKey]);

  const toggleSession = useCallback(
    (id: string) => setData(prev => ({ ...prev, sessionIds: toggleInList(prev.sessionIds, id) })),
    [],
  );
  const toggleSpeaker = useCallback(
    (id: string) => setData(prev => ({ ...prev, speakerIds: toggleInList(prev.speakerIds, id) })),
    [],
  );
  const toggleResource = useCallback(
    (id: string) => setData(prev => ({ ...prev, resourceIds: toggleInList(prev.resourceIds, id) })),
    [],
  );
  const clearSaved = useCallback(
    () => setData(prev => ({ ...prev, sessionIds: [], speakerIds: [], resourceIds: [] })),
    [],
  );
  const markDownloaded = useCallback(
    (id: string) =>
      setData(prev => (prev.downloadedIds.includes(id) ? prev : { ...prev, downloadedIds: [...prev.downloadedIds, id] })),
    [],
  );

  const vote = useCallback((pollId: string, optionId: string) => {
    setData(prev => {
      if (prev.selections[pollId]) {
        return prev; // one vote per poll
      }
      const polls = prev.polls.map(poll =>
        poll.id === pollId
          ? { ...poll, options: poll.options.map(o => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o)) }
          : poll,
      );
      return { ...prev, polls, selections: { ...prev.selections, [pollId]: optionId } };
    });
  }, []);

  const addQuestion = useCallback((text: string, category: QuestionCategory, author: string) => {
    const question: Question = {
      id: `q-${Date.now()}`,
      text,
      category,
      author,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      answered: false,
    };
    setData(prev => ({ ...prev, questions: [question, ...prev.questions] }));
  }, []);

  const toggleUpvote = useCallback((id: string) => {
    setData(prev => {
      const upvoted = prev.upvotedIds.includes(id);
      const questions = prev.questions.map(q =>
        q.id === id ? { ...q, upvotes: Math.max(0, q.upvotes + (upvoted ? -1 : 1)) } : q,
      );
      return { ...prev, questions, upvotedIds: toggleInList(prev.upvotedIds, id) };
    });
  }, []);

  const toggleNotifications = useCallback(
    () => setData(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled })),
    [],
  );
  const toggleReminders = useCallback(
    () => setData(prev => ({ ...prev, remindersEnabled: !prev.remindersEnabled })),
    [],
  );

  const value = useMemo(
    () => ({
      ...data,
      toggleSession,
      toggleSpeaker,
      toggleResource,
      clearSaved,
      markDownloaded,
      vote,
      addQuestion,
      toggleUpvote,
      toggleNotifications,
      toggleReminders,
    }),
    [data, toggleSession, toggleSpeaker, toggleResource, clearSaved, markDownloaded, vote, addQuestion, toggleUpvote, toggleNotifications, toggleReminders],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = (): AppDataContextValue => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return context;
};
