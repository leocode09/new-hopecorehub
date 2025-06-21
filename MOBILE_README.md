# HopeCore Hub Mobile App

This project uses Capacitor.js to create mobile applications for Android and iOS from the web application.

## Prerequisites

### For Android Development
- [Android Studio](https://developer.android.com/studio)
- Android SDK
- Java Development Kit (JDK)

### For iOS Development
- Mac computer
- [Xcode](https://developer.apple.com/xcode/)
- CocoaPods (`sudo gem install cocoapods`)

## Build Process

### 1. Build the Web App
```bash
npm run build
```

### 2. Sync with Capacitor
```bash
npx @capacitor/cli sync
```

## Running on Android

### Open in Android Studio
```bash
npx @capacitor/cli open android
```

Once Android Studio opens:
1. Wait for Gradle sync to complete
2. Click the "Run" button (green triangle)
3. Select a device or emulator

### Build APK
In Android Studio:
1. Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
2. The APK will be available in `android/app/build/outputs/apk/debug/`

## Running on iOS (Mac only)

### Open in Xcode
```bash
npx @capacitor/cli open ios
```

Once Xcode opens:
1. Select a development team in the Signing & Capabilities section
2. Select a device or simulator
3. Click the "Run" button (play icon)

### Build for Distribution
In Xcode:
1. Select "Any iOS Device" as the build target
2. Go to Product > Archive
3. Follow the distribution wizard

## Live Reload During Development

For development with live reload:

1. Run the development server:
```bash
npm run dev
```

2. In a separate terminal, run:
```bash
npx @capacitor/cli run android --livereload --external
```
or
```bash
npx @capacitor/cli run ios --livereload --external
```

## Updating the App

After making changes to your web app:

1. Rebuild the web app:
```bash
npm run build
```

2. Update the native projects:
```bash
npx @capacitor/cli copy
npx @capacitor/cli sync
```

3. Open and run the native projects as described above

## Troubleshooting

### Android Issues
- Make sure ANDROID_HOME environment variable is set correctly
- Make sure Android Studio is installed and accessible

### iOS Issues
- Make sure CocoaPods is installed
- Run `pod install` in the ios/App directory if needed

## Automated Builds with GitHub Actions

This project includes a GitHub workflow that automatically builds both Android and iOS apps when code is pushed to the main branch or when manually triggered.

### Workflow Features:
- Builds Android APK on Ubuntu runners
- Builds iOS app on macOS runners
- Creates GitHub releases with both app binaries
- Can be manually triggered using the "workflow_dispatch" event

### Accessing Built Apps:
1. Go to the GitHub repository's "Actions" tab
2. Select the most recent successful workflow run
3. Download the artifacts from the "Artifacts" section
4. Alternatively, check the "Releases" section for stable builds

### Manual Workflow Trigger:
1. Go to the GitHub repository's "Actions" tab
2. Select "Build Mobile Apps" workflow
3. Click "Run workflow" and select the branch to build from 