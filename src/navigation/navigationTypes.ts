import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  QuickAccess: undefined;
  Agenda: undefined;
  SessionDetail: { sessionId: string };
  Speakers: undefined;
  SpeakerDetail: { speakerId: string };
  NameTag: undefined;
  Venue: undefined;
  Voting: undefined;
  QA: undefined;
  QuestionDetail: { questionId: string };
  Resources: undefined;
  Exhibitors: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;
export type HomeScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<HomeStackParamList, T>;
export type ProfileScreenProps<T extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  T
>;
