# React Native Base

This is a template for the new React Native apps. Every new React Native app should follow this template.

[<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" height="60">](https://play.google.com/store/apps/details?id=com.yuvrajpatil.apps.starvault)

This app has following:

<pre>
✔️ Project Structure
✔️ Bottom Tab Navigation
✔️ State Management
✔️ Module Resolution
✔️ Styling (Theming)
</pre>

<p>
  <pre><img src="https://github.com/user-attachments/assets/c1a01c32-f193-46e9-a2fb-57c45f560172" width="200" height="400"/> <img src="https://github.com/user-attachments/assets/8bfb498a-2ed3-446e-883f-d5c393e5b73b" width="200" height="400"/>
  </pre>
</p>

---

# 🧱 Tech Stack

| Layer             | Technology                               | Version | Why                                                                        |
| ----------------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------- |
| Core Technology   | React Native with CLI                    | 0.75    | Full native control — no Expo constraints                                  |
| Core Library      | React                                    | 18      |
| Language          | TypeScript                               | 5       |
| State Management  | Redux Toolkit                            | 1       |
| Key-Value Storage | MMKV                                     | 2       | 10x faster than AsyncStorage; used for preferences and access state        |
| Icons             | `react-native-vector-icons`              | 6       |

---

# Getting Started

## Create a Logo

https://github.com/night-fury-rider/react-native-template/wiki/Create-a-Logo

## Create Android Launcher Images

https://github.com/night-fury-rider/react-native-template/wiki/Create-Android-Launcher-Images

## ⚙️ Prerequisites

| Tool             | Version    |
| ---------------- | ---------- |
| Node.js          | >= 22.13.0 |
| React Native CLI | Latest     |
| Android Studio   | Latest     |
| JDK              | 17         |

---

<br />

### Install dependencies

```bash
npm install
```

### Create the dev build

```
npm run mode:sandbox
```

### Create the prod build

```
npm run mode:prod
```

### Install the app

```
npm run android
```

### Export Source Files to build_src

```
npm run export-src
```

# Enable Wireless hot reload

- Run `adb devices` to get Mobile device name.
- Run `ipconfig getifaddr en0` to get the IP (v4).
- Connect mobile to laptop via USB cable.
- Install the app

```
npm run android
```

- Disconnect mobile from USB. Metro bundler will be disconnected.
- Shake the mobile to open the React Native Dev menu. Select Settings. Open Debug server host & port for device.
- Enter IP v4 (from step 1) and port number (Generally 8081). Ex. `1.2.3.4:8081`
- Shake the mobile to open the React Native Dev menu .
- Select Reload. Now hot reload should work.

---

# Create the release build

https://github.com/night-fury-rider/react-native-template/wiki/Create-the-release-build

---

# Deploy the App on Play Store

https://github.com/night-fury-rider/react-native-template/wiki/Deploy-the-App-on-PlayStore

---

# Troubleshooting
https://github.com/night-fury-rider/react-native-template/wiki/Troubleshooting

---

# Disclaimer

This is a foundational app with a basic setup that will serve as the starting point for building my other React Native applications.
