# Hakubun

A cross-platform, third-party Japanese Study App for Wanikani

## Overview

Hakubun is a Japanese learning app that can be used with Wanikani, an SRS-based Japanese learning service. Learn and review radicals, kanji, and vocabulary, easily search for subjects, and explore content across levels.

## Download the App

The iOS and web versions are still being tested, but the alpha version Android is [available on the Play Store through early access!](https://play.google.com/store/apps/details?id=io.hakubun.app)

### Interface

- Use swipe gestures or keyboard shortcuts to submit or retry answers
- Cross-platform, web-based app with native-like interactions and animations

### Reviews and Lessons

- Review or learn by subject
  - Radical, kanji, vocabulary, kana vocabulary
- Select specific items to review or learn
- Shuffle or sort by SRS stage, level, available date
- Option to filter subjects by current level
- Typo tolerance

### Reviews

- Back to back ordering: change card order in queue
  - Meaning then reading
  - Reading then meaning
  - Disabled (shuffled)
- Wrap-up mode: finish up the reviews you started on, unreviewed are removed from queue

## Privacy Policy/Information Collected

Hakubun uses [Logrocket](https://logrocket.com/), a log collecting tool, to detect common errors that users are experiencing.

This means the following information may be stored:

- Username
- Errors encountered
- User actions in app (for example: how often user visits a page)

The following information is **NOT** stored and I will never be able to access to it:

- API tokens
- User location data
- User's name or other sensitive data

Please [email me](mailto:salemlfenn@gmail.com) if you have any questions or concerns about how/what data is stored.

## Screenshots

### Home

<img src="./resources/app-screenshots/home/home-page.jpg" width="300" alt="home page" /> <img src="./resources/app-screenshots/home/subject-popover.jpg" width="300" alt="subject popover" /> <img src="./resources/app-screenshots/home/review-forecast.jpg" width="300" alt="review forecast" />

### Lessons

<img src="./resources/app-screenshots/lessons/settings-basic.jpg" width="300" alt="basic lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced.jpg" width="300" alt="advanced lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced-filters.jpg" width="300" alt="advanced lesson settings with filters" /> <img src="./resources/app-screenshots/lessons/lesson-quiz.jpg" width="300" alt="lesson quiz" /> <img src="./resources/app-screenshots/lessons/lesson-session.jpg" width="300" alt="lesson session, card with 'correct' popover after user input" /> <img src="./resources/app-screenshots/lessons/lesson-summary.jpg" width="300" alt="lesson summary, shows user what items they learned" />

### Reviews

<img src="./resources/app-screenshots/reviews/settings-basic.jpg" width="300" alt="basic review settings" /> <img src="./resources/app-screenshots/reviews/settings-advanced-filters.jpg" width="300" alt="advanced review settings with filters" /> <img src="./resources/app-screenshots/reviews/review-session-correct.jpg" width="300" alt="correct review item after user input" /> <img src="./resources/app-screenshots/reviews/retry-item.jpg" width="300" alt="retrying a review after a bad typo" /> <img src="./resources/app-screenshots/reviews/next-item.jpg" width="300" alt="moving to the next item in review queue" /> <img src="./resources/app-screenshots/reviews/subject-info.jpg" width="300" alt="Viewing subject info in bottom sheet for subject during review" /> <img src="./resources/app-screenshots/reviews/end-review-dialog.jpg" width="300" alt="dialog with cancel, end session, and wrap up options for when user attempts to leave page before completing all reviews" /> <img src="./resources/app-screenshots/reviews/wrapping-up-overlay.jpg" width="300" alt="overlay of checkered flag displaying after 'wrap up' is selected" /> <img src="./resources/app-screenshots/reviews/review-summary.jpg" width="300" alt="summary of reviews items user got correct and incorrect" />

### Subjects

<img src="./resources/app-screenshots/subjects/subjects-levels.jpg" width="300" alt="subjects page with radicals, kanji, and vocabulary where you can browse the levels" /> <img src="./resources/app-screenshots/subjects/subjects-level-vocab.jpg" width="300" alt="subjects page scrolled down to view vocabulary for level" />

### Search

<img src="./resources/app-screenshots/search/empty-input.jpg" width="300" alt="empty search box with Hakubun crabigator asking user to search for something" /> <img src="./resources/app-screenshots/search/no-results.jpg" width="300" alt="search box with nonsense input, Hakubun crabigator saying 'no results' while looking distressed" /> <img src="./resources/app-screenshots/search/results.jpg" width="300" alt="search box with 'cat' input and long list of results to choose from" />

### Subject Details

<img src="./resources/app-screenshots/subject-details/vocab-and-user-meaning.jpg" width="300" alt="subject details page for vocabulary with user-added meaning" /> <img src="./resources/app-screenshots/subject-details/vocab-context-sentences.jpg" width="300" alt="subject details page for vocabulary, showing context sentences with translations that can be hidden and shown" /> <img src="./resources/app-screenshots/subject-details/kanji-entering-user-note.jpg" width="300" alt="subject details page for kanji with user entering their own meaning note" /> <img src="./resources/app-screenshots/subject-details/kanji-reading-user-note.jpg" width="300" alt="subject details page for kanji with saved meaning note by user, displaying reading section below" />

## Building the App

Make sure to run `npm install` before trying the steps below!

### Web Version

**Building using this method for general development is highly recommended over the iOS and Android methods,** it's much easier to debug and inspect changes. Running the app with iOS and Android simulators is only recommended to double-check that the changes you made are compatible with both platforms.

Start server:

```bash
npm run start
```

The app should then be available at http://localhost:5173/

### iOS and Android Simulators (with Hot Reload)

If below doesn't work, check that network URL after displayed after running `npm run start-exposed` matches the URL in the _capacitor.config.ts_ file

Start server in one terminal:

```bash
npm run start-exposed
```

Then run the script for the platform in another terminal:

#### iOS

```bash
npm run ios-live-reload
```

You can then select the type of iOS device you'd like to use as a simulator

##### To view debug info (inspect elements, view console output)

- If you've never done this before, you'll likely have to the make sure "Show features for web developers" is enabled under Safari's Settings

  <img src="./resources/debugging-screenshots/safari-web-dev-settings.png" width="300" alt="Safari settings displaying Show features for web developers setting" />

- Open Safari and click the iOS simulator for Hakubun under Develop -> iOS device you chose as simulator -> IP address displayed. _If this is not displayed, make sure you followed the previous step. If it's still not displayed, opening Xcode can sometimes make it appear_
  <img src="./resources/debugging-screenshots/safari-select-ios-simulator.png" width="300" alt="selecting iOS simulator" />
  <img src="./resources/debugging-screenshots/safari-inspecting-ios-device.png" width="300" alt="inspecting iOS simulator" />

#### Android

```bash
npm run android-live-reload
```

##### To view debug info (inspect elements, view console output)

- In Chrome, go to chrome://inspect/#devices
- An address should be available under "Remote Target", you can click on "inspect" to bring up a web inspector. This can be used to inspect elements and view console output
  <img src="./resources/debugging-screenshots/chrome-remote-targets.png" width="300" alt="remote targets in Chrome" /> <img src="./resources/debugging-screenshots/chrome-web-inspector.png" width="300" alt="web inspector in Chrome for Android device" />

### Running Fastlane

[Fastlane](https://fastlane.tools/) is a tool used to build the Android and iOS apps for Hakubun

To run android lanes:

```bash
fastlane android <LANE>
```

To run iOS lanes:

```bash
fastlane ios <LANE>
```
