# Happeey

Your personal sleep tracker, built with Expo, React Native, and TypeScript.

Happeey is an early-stage mobile app for recording sleep sessions. The current implementation focuses on the basic sleep/wake flow and sleep-duration calculations.

## Current features

- Start a sleep session and record its start time.
- Switch the home screen between welcome and recording states.
- End a session with **Wake Up**, calculate its duration, and reset the start time.
- Display the latest formatted duration and a list of completed sessions from the current screen session.
- Save completed sleep records to AsyncStorage and log session details to the console.
- Offer retry alerts for failed saves and retain the pending record's original timestamps.
- Validate dates and minute values, reject negative durations, and format durations as hours and minutes.
- Use Expo Router for navigation.

## Tech stack

| Tool | Version |
| --- | --- |
| Expo SDK | 58 |
| React Native | 0.88.1 |
| React | 19.3.0 |
| Expo Router | 58 |
| TypeScript | 6 |

Dependency versions are defined in `package.json` and locked in `package-lock.json`. This project uses npm.

## Getting started

Install Node.js and npm, then run the following commands from the project directory:

```bash
npm ci
npm start
```

Choose a device or runtime from the Expo development server. Additional scripts are available:

```bash
npm run android
npm run ios
npm run web
```

The iOS simulator requires macOS. On Windows, use a supported physical-device workflow or an Android emulator. See the [Expo environment setup guide](https://docs.expo.dev/get-started/set-up-your-environment/) for platform requirements.

## Project structure

```text
src/
  app/
    _layout.tsx        # Root layout and tabs
    index.tsx          # Sleep tracking home screen
    History.tsx        # Empty placeholder for a future history screen
  components/         # Shared UI and platform-specific components
  constants/          # Theme values
  hooks/              # Theme and color-scheme hooks
  types/
    sleep.ts          # In-memory and stored sleep record types
  utils/
    sleep.ts          # Duration calculation, formatting, and validation
assets/               # Icons, images, and splash assets
```

## Development checks

```bash
npx expo lint
npx tsc --noEmit
```

Current baseline:

- ESLint is not configured yet. Expo's lint command attempts to set it up on its first run.
- Type checking currently reports a tab link to the removed `/explore` route and a `ref` type mismatch in `src/components/app-tabs.web.tsx`.

For new Expo dependencies, use `npx expo install <package>` to resolve SDK-compatible versions. Refer to the [Expo SDK 58 documentation](https://docs.expo.dev/versions/v58.0.0/) when working with Expo APIs.

## Current limitations

- Active sessions exist only in component state and are not restored after app restarts or screen remounts.
- Completed records are written to AsyncStorage. A loading helper converts stored timestamps back to Date values and offers a retry alert, but it is not called by the screen yet. Saving a new record after a restart or remount can overwrite the saved list with the current screen's records.
- Save-retry testing is enabled: the first two save attempts per module initialization deliberately fail.
- The History route file is an empty placeholder and does not export a screen yet.
- Statistics, reminders, and account synchronization are not implemented.
- Parts of the shared UI still come from the Expo starter template.

## License

See [LICENSE](LICENSE) for the existing MIT license and copyright notice.
