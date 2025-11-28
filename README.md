# 🎤 Speech-to-Text Demo App

A React Native application built with Expo that demonstrates real-time speech-to-text transcription on both Android and iOS.

## ✨ Features

- 🎙️ Real-time speech recognition
- 📱 Works on both Android and iOS
- 🔄 Live transcription display
- ✅ Proper permission handling
- 🎯 Simple, intuitive UI

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- **For Android**:
  - Android Studio with Android SDK
  - Android emulator or physical device
- **For iOS** (macOS only):
  - Xcode (latest version)
  - CocoaPods
  - iOS Simulator or physical iPhone

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment (First Time Only)

**macOS/Linux:**
```bash
# Add to ~/.zshrc or ~/.bash_profile
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Reload shell
source ~/.zshrc  # or source ~/.bash_profile
```

### 3. Run the App

**Start Metro Bundler** (keep this running):
```bash
npm start
```

**Run on Android** (in a new terminal):
```bash
npm run android
```

**Run on iOS** (macOS only, in a new terminal):
```bash
npm run ios
# Or build from Xcode (recommended for first time):
open ios/sttdemoreactnative.xcworkspace
# Then press Cmd+R in Xcode
```

## 📱 Testing on Android

### Option 1: Using Emulator

1. **Start Android Emulator**:
   - Open Android Studio → Device Manager
   - Click ▶️ on any emulator

2. **Run the app**:
   ```bash
   npm run android
   ```

3. **Grant microphone permission** when prompted

4. **Test voice recognition**:
   - Tap "Start Recording"
   - Speak clearly
   - Tap "Stop Recording"
   - See transcription!

### Option 2: Using Physical Device

1. **Enable USB Debugging** on your Android phone:
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → Enable "USB Debugging"

2. **Connect phone via USB** and trust the computer

3. **Verify connection**:
   ```bash
   adb devices
   ```

4. **Run the app**:
   ```bash
   npm run android
   ```

### Sharing APK for Testing

```bash
# Build is automatically created when you run the app
# Find it at:
android/app/build/outputs/apk/debug/app-debug.apk

# Copy to Desktop for sharing:
cp android/app/build/outputs/apk/debug/app-debug.apk ~/Desktop/STT-Demo.apk
```

**Share via**: Email, Google Drive, Dropbox, Slack, AirDrop, etc.

**Testers need to**:
1. Download APK to Android phone
2. Enable "Install from Unknown Sources"
3. Tap APK file to install
4. Grant microphone permission
5. Test the app!

## 📱 Testing on iOS

### Option 1: Using Simulator (UI Only)

```bash
npm run ios
```

⚠️ **Note**: iOS Simulator has limited microphone access. For full voice testing, use a real device.

### Option 2: Using Xcode (Recommended)

1. **Open Xcode**:
   ```bash
   open ios/sttdemoreactnative.xcworkspace
   ```

2. **Select simulator** from device dropdown (top bar)

3. **Build and run**: Press **Cmd+R** or click ▶️

4. **First build takes 3-5 minutes**, subsequent builds are faster

### Option 3: Using Physical iPhone

```bash
# Connect iPhone via USB
# Trust computer on iPhone
npm run ios -- --device
```

## 🔄 Daily Development Workflow

### Starting Fresh (After Restart)

```bash
# Terminal 1: Start Metro (keep running)
npm start

# Terminal 2: Run on platform of choice
npm run android   # For Android
npm run ios       # For iOS
```

### Making Code Changes

1. Edit files in `app/` folder
2. Save your changes
3. App automatically reloads (Fast Refresh)
4. Or manually reload:
   - **Android**: Press `R` twice or shake device → Reload
   - **iOS**: Press `Cmd+R` in simulator

### What Requires Rebuild?

✅ **Fast Refresh** (just save):
- JavaScript/TypeScript changes
- Component updates
- Styling changes

❌ **Full Rebuild** (`npm run android/ios`):
- Installing new packages
- Changing native code
- Modifying `app.json`
- Updating permissions

## 🛠 Troubleshooting

### Android Issues

**"SDK location not found"**
```bash
# Reload environment
source ~/.zshrc
# Or run the post-prebuild script
./scripts/post-prebuild.sh
```

**Build errors after prebuild**
```bash
# Run the automated fix script
./scripts/post-prebuild.sh
npm run android
```

**"Duplicate class" errors**
```bash
# Already handled by post-prebuild script
# If issue persists:
npm run android:clean
```

**Metro port already in use**
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### iOS Issues

**Simulator selection errors**
```bash
# Open Xcode and build from there (easier)
open ios/sttdemoreactnative.xcworkspace
# Then press Cmd+R
```

**CocoaPods errors**
```bash
cd ios
pod install
cd ..
npm run ios
```

**"Unable to boot simulator"**
```bash
open -a Simulator
# Wait for it to open, then:
npm run ios
```

## 📚 Project Structure

```
STT-Demo-ReactNative/
├── app/                        # Main application code
│   ├── (tabs)/                 # Tab navigation
│   │   ├── index.tsx          # Voice Test screen
│   │   └── explore.tsx        # Info screen
│   └── _layout.tsx            # Root layout
├── android/                    # Android native code
├── ios/                        # iOS native code
├── scripts/                    # Automation scripts
│   └── post-prebuild.sh       # Auto-fix script
├── package.json               # Dependencies & scripts
└── app.json                   # Expo configuration
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run android:clean` | Clean rebuild for Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Check code quality |

## 🎯 Tech Stack

- **Framework**: [Expo](https://expo.dev) + [React Native](https://reactnative.dev)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Speech Recognition**: [expo-speech-recognition](https://www.npmjs.com/package/expo-speech-recognition)
- **Language**: TypeScript
- **Platforms**: iOS, Android

## ⚙️ Configuration

### Permissions

**Android** (`app.json`):
```json
"permissions": ["android.permission.RECORD_AUDIO"]
```

**iOS** (`app.json`):
```json
"NSMicrophoneUsageDescription": "This app uses the microphone to record audio for transcription.",
"NSSpeechRecognitionUsageDescription": "This app uses speech recognition to transcribe audio."
```

### Package Info

- **App Name**: stt-demo-reactnative
- **Package ID**: com.saurabhagarwal.sttdemoreactnative (Android)
- **Bundle ID**: com.saurabhagarwal.sttdemoreactnative (iOS)

## 🚨 Important Notes

### For Voice Recognition to Work:

✅ **Android**:
- Internet connection (uses Google speech recognition)
- Google Play Services installed
- Microphone permission granted

✅ **iOS**:
- Internet connection
- Microphone permission granted
- Speech recognition permission granted
- **Best tested on real device** (simulator has limited mic access)

### Development

- ✅ One Metro bundler serves both Android and iOS
- ✅ JavaScript changes sync to both platforms automatically
- ✅ Native code (`android/` and `ios/`) is platform-specific
- ✅ Fast Refresh works on both platforms

## 🤝 Contributing

This is a demo project. Feel free to:
- ENJOY
- Suggest improvements
- Fork and customize for your needs

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using Expo and React Native**

For detailed setup and troubleshooting, see the documentation files in the project root.
