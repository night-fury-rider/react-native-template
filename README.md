# React Native Base

This is a template for the new React Native apps. Every new React Native app should follow this template.

This app has following:
<pre>
✔️ Project Structure
✔️ Bottom Tab Navigation
✔️ State Management
✔️ Module Resolution
✔️ Styling (Theming)
</pre>


<p >
  <pre><img src="https://github.com/user-attachments/assets/c1a01c32-f193-46e9-a2fb-57c45f560172" width="200" height="400" alt=""/> <img src="https://github.com/user-attachments/assets/8bfb498a-2ed3-446e-883f-d5c393e5b73b" width="200" height="400" alt=""/></pre>
</p>


<br/><br/>

# Technologies and Libraries Used

- [React Native 0.75.2](https://reactnative.dev/)
- [React 18.3.1](https://reactjs.org/)
- [React Native Paper 5.12.3](https://callstack.github.io/react-native-paper/)
- [React Native Vector Icons 10.1.0](https://www.npmjs.com/package/react-native-vector-icons)
- [React Native MMKV 2.10.2](https://github.com/mrousavy/react-native-mmkv)
- [Babel Module Resolver 5.0.0](https://www.npmjs.com/package/babel-plugin-module-resolver)

  <br/><br/>

# Getting Started

## Prerequisite

- Mobile with USB debugging enabled
- Mobile and laptop are on the same wifi.

## Install the app on mobile

```
yarn android
```

## Enable Wireless hot reload

- Run `adb devices` to get Mobile device name.
- Run `ipconfig` to get the IP (v4).
- Connect mobile to laptop via USB cable.
- Install the app

```
yarn android
```

- Disconnect mobile from USB. Metro bundler will be disconnected.
- Shake the mobile to open the React Native Dev menu. Select Settings. Open Debug server host & port for device.
- Enter IP v4 (from step 1) and port number (Generally 8081). Ex. `192.168.1.12:8081`
- Shake the mobile to open the React Native Dev menu .
- Select Reload. Now hot reload should work.

  <br/><br/>

# Create the release build

- Make sure that `my-upload-key.keystore` file is kept under the `android/app` directory
- Make sure that `gradle.properties` file is kept under the `.gradle` directory. In Windows, `.gradle` directory is under `C:\Users\<username>`.
- Increment `version` in `package.json`.
- Increment `versionMajor` or `versionMinor` or `versionPatch` in `android/app/build.gradle`
- Create the apk build.

```
yarn run android-build-apk
```

- Uninstall the app from device (from work profile as well if available). Connect the device using USB.
- Install the apk file onto device

```
adb -s <device_name> install android/app/build/outputs/apk/release/app-release.apk
```

- Complete the sanity testing and capture the screenshots.
- Update the screenshots in this README.
- Capture the home screen screenshot on emulator with Nexus_7_API_33.
- Capture the home screen screenshot on emulator with Nexus_10_API_33.
- Create a [release on Github](https://github.com/night-fury-rider/react-native-base/releases). Use [Github filter](https://github.com/night-fury-rider/react-native-base/compare/v0.0.1...main) for extracting data for release notes.
- Create the release build (aab build).

```
yarn run android-build
```

<br/><br/>

# Deploy the App on PlayStore

1. Login into [Developer Console Account](https://play.google.com/console/developers)
2. Select the app from the App list. It should open the App Dashboard.
3. Select `Production` (which is under `Release`) from the sidebar.
4. Click on `Create new release` which is on the right top. It would open `Create production release`.
5. Upload the build file and follow the instructions.
   <br/><br/>

# Disclaimer

This is a foundational app with a basic setup that will serve as the starting point for building my other React Native applications.
