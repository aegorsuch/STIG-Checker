# STIG Checker

Paste your AndroidManifest.xml and get informed of STIG issues.

## Usage
1. Start the app with `npm start`.
2. Paste your AndroidManifest.xml.
3. Click "Check STIG" to see issues.

## Features
- Manifest input
- STIG checks (expandable)
- Issue reporting

## Deployment

To deploy as a GitHub Pages site:
1. Build the static site with `npm run build`.
2. Push the contents of the `public` folder to the `main` branch.
3. In your GitHub repo settings, set GitHub Pages source to `main` branch, `/public` folder.
4. Add a `.nojekyll` file to the `public` folder (already included).

Your app will be available at: https://aegorsuch.github.io/STIG-Checker/

## To Do
- Add more STIG checks
- Improve UI
