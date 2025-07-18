#!/bin/bash

# Start Android emulator in background
echo "Starting Android emulator..."
emulator -avd test_avd -no-audio -no-window -gpu swiftshader_indirect -no-snapshot -wipe-data &

# Wait for emulator to boot
echo "Waiting for emulator to boot..."
adb wait-for-device

# Start Expo
echo "Starting Expo development server..."
npx expo start --android --host 0.0.0.0