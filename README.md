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

<p>
  <pre><img src="https://github.com/user-attachments/assets/c1a01c32-f193-46e9-a2fb-57c45f560172" width="200" height="400" alt=""/> <img src="https://github.com/user-attachments/assets/8bfb498a-2ed3-446e-883f-d5c393e5b73b" width="200" height="400" alt=""/></pre>
</p>

---

# Technologies and Libraries Used

| Library                                                                              | Version |
| ------------------------------------------------------------------------------------ | ------- |
| [React Native](https://reactnative.dev/)                                             | v0.75   |
| [React](https://reactjs.org/)                                                        | v18     |
| [React Native Paper](https://callstack.github.io/react-native-paper/)                | v5      |
| [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons) | v10     |
| [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)                   | v2      |
| [Babel Module Resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)  | v5      |

---

# Create a Logo

- Visit [Adobe Express](https://new.express.adobe.com/)
- Click `Logo` option to open the templates.
- Search the templates from left sidebar.
- Select the appropriate template.
- Rename the file with a proper name.
- Remove unncessary elements from the logo. Try to keep only one image/element.
- The Template may have multiple elements. Select all elements using `Ctrl+A`.
- Press the `Group` option to group the elements of logo.
- Use the Edges of the group to enlarge the image.
- Keep around 10% area as margin from boundary.
- Press `Align` option from top header. Select `Middle` and `Center`. It will make sure our logo is at exact center.
- Press `Download` button to download the logo.

# Create Android Launcher Images

- Visit [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
- Select `Image` option from left sidebar.
- Select the logo image.
- Keep `0` padding.
- Press `Download`. It will download a zip file which has all android images.

# Prerequisite

- Mobile with USB debugging enabled
- Mobile and laptop are on the same wifi.
- Logos for android's `res` folder.

# Create the dev build

```
yarn testmode
```

# Create the prod build

```
yarn prodmode
```

# Install the app on mobile

```
yarn android
```

# Enable Wireless hot reload

- Run `adb devices` to get Mobile device name.
- Run `ipconfig` to get the IP (v4).
- Connect mobile to laptop via USB cable.
- Install the app

```
yarn android
```

- Disconnect mobile from USB. Metro bundler will be disconnected.
- Shake the mobile to open the React Native Dev menu. Select Settings. Open Debug server host & port for device.
- Enter IP v4 (from step 1) and port number (Generally 8081). Ex. `112.18.1.2:8081`
- Shake the mobile to open the React Native Dev menu .
- Select Reload. Now hot reload should work.

---

# Create the release build

https://github.com/night-fury-rider/react-native-template/wiki/Create-the-release-build

---

# Deploy the App on Play Store

https://github.com/night-fury-rider/react-native-template/wiki/Deploy-the-App-on-PlayStore

---

# Disclaimer

This is a foundational app with a basic setup that will serve as the starting point for building my other React Native applications.
