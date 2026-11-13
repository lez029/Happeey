# Happeey

Your personal sleep tracker, built with Expo, React Native, and TypeScript.

Happeey is an early-stage mobile app for recording sleep sessions. The current implementation focuses on the basic sleep/wake flow and sleep-duration calculations.

## Current features

- Persist a sleep session's start time and restore an active session when the home screen mounts.
- Set the home heading to welcome or recording based on whether a sleep session is active.
- End a session with **Wake Up**, calculate its duration, and remove the persisted start time. Disable the session button while finishing, with a retry alert if cleanup fails.
- Display the latest formatted duration on the home screen.
- Skip saving sleep sessions that round to zero minutes.
- Show an empty-state message when there are no saved sleep records.
- Reload saved sessions each time the History screen gains focus and display local start times, end times, and durations in labeled columns, with a retry alert if loading fails.
- Append completed sleep records to existing AsyncStorage history and log session details to the console.
- Confirm deletion with **Clear History**, then remove saved records and clear the displayed list, with a retry alert if deletion fails.
- Offer retry alerts for failed saves and retain the pending record's original timestamps.
- Validate dates and minute values, reject negative durations, and format durations with compact labels such as `8 h 30 min`.
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
    History.tsx        # Saved session times and durations
  components/         # Shared UI and platform-specific components
  constants/          # Theme values
  hooks/              # Theme and color-scheme hooks
  types/
    sleep.ts          # In-memory and stored sleep record types
  utils/
    sleep.ts          # Duration calculation, formatting, and validation
    sleepStorage.ts   # Persist sleep records and active-session start times
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

- The latest displayed duration and pending save retries remain in component state and are not restored after a restart.
- The simulated save failures used for retry testing are disabled.
- Statistics, reminders, and account synchronization are not implemented.
- Parts of the shared UI still come from the Expo starter template.

## License

See [LICENSE](LICENSE) for the existing MIT license and copyright notice.
