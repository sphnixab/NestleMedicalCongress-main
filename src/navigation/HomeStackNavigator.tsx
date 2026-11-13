import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AgendaScreen } from '../features/agenda/screens/AgendaScreen';
import { SessionDetailScreen } from '../features/agenda/screens/SessionDetailScreen';
import { ExhibitorsScreen } from '../features/exhibitors/screens/ExhibitorsScreen';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { QuickAccessScreen } from '../features/home/screens/QuickAccessScreen';
import { NameTagScreen } from '../features/nameTag/screens/NameTagScreen';
import { QAScreen } from '../features/qa/screens/QAScreen';
import { QuestionDetailScreen } from '../features/qa/screens/QuestionDetailScreen';
import { ResourcesScreen } from '../features/resources/screens/ResourcesScreen';
import { SpeakerDetailScreen } from '../features/speakers/screens/SpeakerDetailScreen';
import { SpeakersScreen } from '../features/speakers/screens/SpeakersScreen';
import { VenueScreen } from '../features/venue/screens/VenueScreen';
import { VotingScreen } from '../features/voting/screens/VotingScreen';
import { HomeStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: '#071352' } }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade' }} />
    <Stack.Screen name="QuickAccess" component={QuickAccessScreen} />
    <Stack.Screen name="Agenda" component={AgendaScreen} />
    <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    <Stack.Screen name="Speakers" component={SpeakersScreen} />
    <Stack.Screen name="SpeakerDetail" component={SpeakerDetailScreen} />
    <Stack.Screen name="NameTag" component={NameTagScreen} />
    <Stack.Screen name="Venue" component={VenueScreen} />
    <Stack.Screen name="Voting" component={VotingScreen} />
    <Stack.Screen name="QA" component={QAScreen} />
    <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
    <Stack.Screen name="Resources" component={ResourcesScreen} />
    <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} />
  </Stack.Navigator>
);
