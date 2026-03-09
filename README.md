# STIG Checker

Paste your AndroidManifest.xml and get informed of real DISA Android STIG issues.

## Usage
1. Start the app with `npm run dev` (for development) or `npm run build` and `npm run preview` (for production preview).
2. Paste your AndroidManifest.xml.
3. Click "Check STIG" to see issues.

## Features
- Manifest input
- Real DISA Android STIG checks (including permissions, debuggable, backup, cleartext traffic, exported components, and more)
- Issue reporting

## Deployment

To deploy as a GitHub Pages site:
1. Build the static site with `npm run build`.
2. Push the contents of the `docs` folder to the `main` branch.
3. In your GitHub repo settings, set GitHub Pages source to `main` branch, `/docs` folder.
4. Add a `.nojekyll` file to the `docs` folder (already included).

Your app will be available at: https://aegorsuch.github.io/STIG-Checker/

## To Do
- Add more STIG checks
- Improve UI

## Sample AndroidManifest.xml

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	package="com.example.stigtest">

	<application
		android:debuggable="true"
		android:allowBackup="true"
		android:usesCleartextTraffic="true"
		android:exported="true">
		<!-- MTD Hook missing -->
	</application>
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
	<uses-permission android:name="android.permission.READ_PHONE_STATE" />
	<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
	<uses-permission android:name="android.permission.CAMERA" />
	<uses-permission android:name="android.permission.RECORD_AUDIO" />
	<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
</manifest>
```
