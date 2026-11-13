# Nestle Medical Congress 2026

A React Native (TypeScript) attendee app for the Nestle Medical Congress 2026, All  content is sample data.

## Screens

- Login, register and forgot password
- Home with search, quick access tiles, upcoming sessions and notices
- Agenda (day 1 / day 2, category filter, search, bookmarks) and session detail
- Speakers (search, filter, favourites) and speaker detail
- Name tag with a QR code
- Venue with an "open in maps" button
- Live voting, Ask Q&A (submit and upvote), Resources, Exhibitors
- Profile, edit profile and settings

## How it is put together

I kept the setup small on purpose.

- No backend. Sessions, speakers, resources and so on live in `src/data` as plain TypeScript arrays and screens import them directly.
- Stateis two React contexts in `src/context`:
  - `AuthContext` handles login, register, logout and profile edits.
  - `AppDataContext` holds what the attendee changes: bookmarks, votes, questions, upvotes, downloads and settings.
- Storage is AsyncStorage (`src/services/storage.ts`). Accounts, the signed-in user and each attendee's data are saved on the device, so they survive an app restart.
- Navigation is React Navigation (auth stack, bottom tabs, a stack per tab).
- Forms use React Hook Form with Yup validation.

```
src/
  components/   shared UI (buttons, inputs, cards)
  constants/    colors, spacing, strings, quick access items
  context/      AuthContext, AppDataContext
  data/         sample sessions, speakers, resources, polls, questions
  features/     one folder per screen group (auth, home, agenda, ...)
  navigation/   navigators and route types
  services/     AsyncStorage helpers
  utils/        date, filter, format and validation helpers
```

## Run it

You need Node 18+, JDK 17 and Android Studio with an SDK installed. See the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) if you do not have these yet.

```sh
npm install
npx react-native run-android
```

Other scripts: `npm test`, `npm run lint`, `npm run typecheck`.

### Demo login

| Email | Password |
| --- | --- |
| `basit@gmail.com` | `Basit@2026` |

You can also register a new account. The Google and Apple buttons are not connected to a real provider, so they sign in as the demo attendee.

## Build the APK

```sh
cd android
./gradlew assembleRelease
```

## limitations

- Passwords are stored on the device in plain text, but a real app would use a server and secure storage.
- Social sign-in, notifications and file downloads are placeholders.
- Everything resets if the app data is cleared.
