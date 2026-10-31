# Happeey

Your personal sleep tracker, built with Expo, React Native, and TypeScript.

Happeey is an early-stage mobile app for recording sleep sessions. The current implementation focuses on the basic sleep/wake flow and sleep-duration calculations.

## Current features

- Start a sleep session and record its start time.
- Switch the home screen between welcome and recording states.
- End a session with **Wake Up**, calculate its duration, and reset the start time.
- Store the latest formatted duration in component state and log session details to the console.
- Validate dates and minute values, reject negative durations, and format durations as hours and minutes.
- Use Expo Router for the Home and starter Explore screens.

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
    explore.tsx        # Starter Explore screen
  components/         # Shared UI and platform-specific components
  constants/          # Theme values
  hooks/              # Theme and color-scheme hooks
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
- Type checking currently reports a `ref` type mismatch in `src/components/app-tabs.web.tsx`.

For new Expo dependencies, use `npx expo install <package>` to resolve SDK-compatible versions. Refer to the [Expo SDK 58 documentation](https://docs.expo.dev/versions/v58.0.0/) when working with Expo APIs.

## Current limitations

- Sleep sessions exist only in component state and are not persisted across app restarts or screen remounts.
- The latest sleep duration is stored and logged, but is not yet displayed in the UI.
- Sleep history, statistics, reminders, and account synchronization are not implemented.
- The Explore screen and parts of the shared UI still come from the Expo starter template.

## License

See [LICENSE](LICENSE) for the existing MIT license and copyright notice.
