#!/bin/bash

# Post-prebuild script to ensure local.properties exists and add necessary Gradle fixes
# This script is automatically run after expo prebuild

ANDROID_DIR="./android"
LOCAL_PROPS="$ANDROID_DIR/local.properties"
APP_BUILD_GRADLE="$ANDROID_DIR/app/build.gradle"

# Check if android directory exists
if [ ! -d "$ANDROID_DIR" ]; then
  echo "Android directory not found. Skipping post-prebuild fixes."
  exit 0
fi

# ===== 1. Create local.properties =====
# Determine SDK location
if [ -n "$ANDROID_HOME" ]; then
  SDK_DIR="$ANDROID_HOME"
elif [ -n "$ANDROID_SDK_ROOT" ]; then
  SDK_DIR="$ANDROID_SDK_ROOT"
else
  # Default location for macOS
  SDK_DIR="$HOME/Library/Android/sdk"
fi

# Verify SDK directory exists
if [ ! -d "$SDK_DIR" ]; then
  echo "Warning: Android SDK not found at $SDK_DIR"
  echo "Please set ANDROID_HOME environment variable or install Android SDK"
  exit 1
fi

# Create local.properties
echo "Creating android/local.properties with SDK location: $SDK_DIR"
echo "sdk.dir=$SDK_DIR" > "$LOCAL_PROPS"
echo "✅ local.properties created successfully"

# ===== 2. Add AndroidX exclusions to build.gradle =====
if [ -f "$APP_BUILD_GRADLE" ]; then
  # Check if exclusions already exist
  if grep -q "exclude group: 'com.android.support'" "$APP_BUILD_GRADLE"; then
    echo "✅ AndroidX exclusions already present in build.gradle"
  else
    echo "Adding AndroidX exclusions to build.gradle..."
    
    # Find the line with "implementation("com.facebook.react:react-android")" and add exclusions after it
    sed -i.bak '/implementation("com.facebook.react:react-android")/a\
    \
    // Exclude old support libraries from voice package to prevent AndroidX conflicts\
    configurations.all {\
        exclude group: '\''com.android.support'\'', module: '\''support-compat'\''\
        exclude group: '\''com.android.support'\'', module: '\''support-v4'\''\
        exclude group: '\''com.android.support'\'', module: '\''appcompat-v7'\''\
        exclude group: '\''com.android.support'\'', module: '\''versionedparcelable'\''\
    }
' "$APP_BUILD_GRADLE"
    
    # Remove backup file
    rm -f "$APP_BUILD_GRADLE.bak"
    
    echo "✅ AndroidX exclusions added to build.gradle"
  fi
else
  echo "Warning: build.gradle not found at $APP_BUILD_GRADLE"
fi

echo "✨ Post-prebuild fixes applied successfully!"
