import React, { useState } from 'react';

function checkSTIG(manifest) {
  // STIG checks
  const rules = [
    {
      id: 'V-242851',
      category: 'CAT I',
      pattern: 'android:debuggable="true"',
      description: 'The AndroidManifest.xml must not set android:debuggable="true" in production. This allows remote memory extraction and debugging.',
      label: 'debuggable="true"',
    },
    {
      id: 'V-242852',
      category: 'CAT II',
      pattern: 'android:allowBackup="true"',
      description: 'The AndroidManifest.xml must not set android:allowBackup="true". This permits local data extraction via ADB.',
      label: 'allowBackup="true"',
    },
    {
      id: 'V-242854',
      category: 'CAT I',
      pattern: 'android:usesCleartextTraffic="true"',
      description: 'The AndroidManifest.xml must not allow cleartext traffic. All network traffic must be encrypted.',
      label: 'usesCleartextTraffic',
    },
    {
      id: 'V-242855',
      category: 'CAT II',
      pattern: 'android:exported="true"',
      description: 'Exported components must be restricted. android:exported="true" can allow malicious apps to hijack intents.',
      label: 'Exported Components',
    },
    {
      id: 'V-242856',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.WRITE_EXTERNAL_STORAGE"',
      description: 'The app must not request WRITE_EXTERNAL_STORAGE permission unless absolutely necessary. This can expose sensitive data.',
      label: 'WRITE_EXTERNAL_STORAGE',
    },
    {
      id: 'V-242857',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.READ_PHONE_STATE"',
      description: 'The app must not request READ_PHONE_STATE permission unless required. This can expose device information.',
      label: 'READ_PHONE_STATE',
    },
    {
      id: 'V-242858',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.ACCESS_FINE_LOCATION"',
      description: 'The app must not request ACCESS_FINE_LOCATION permission unless required. This can expose user location.',
      label: 'ACCESS_FINE_LOCATION',
    },
    {
      id: 'V-242859',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.CAMERA"',
      description: 'The app must not request CAMERA permission unless required. This can expose user privacy.',
      label: 'CAMERA',
    },
    {
      id: 'V-242860',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.RECORD_AUDIO"',
      description: 'The app must not request RECORD_AUDIO permission unless required. This can expose user privacy.',
      label: 'RECORD_AUDIO',
    },
    {
      id: 'V-242861',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.BLUETOOTH_ADMIN"',
      description: 'The app must not request BLUETOOTH_ADMIN permission unless required. This can expose device connectivity.',
      label: 'BLUETOOTH_ADMIN',
    },
    // Add more rules as needed from official STIG documentation
  ];
  const issues = [];
  rules.forEach(rule => {
    if (manifest.includes(rule.pattern) || (rule.label === 'Missing MTD Hook' && !manifest.includes('MTD Hook'))) {
      issues.push({
        id: rule.id,
        category: rule.category,
        label: rule.label,
        description: rule.description,
      });
    }
  });
  return issues;
}

export default function App() {
  const [manifest, setManifest] = useState('');
  const [issues, setIssues] = useState([]);

  const handleCheck = () => {
    setIssues(checkSTIG(manifest));
  };

  // ...existing code...
  const compliantSample = `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigcompliant">\n\n    <!-- STIG-compliant settings -->\n    <uses-permission android:name="android.permission.INTERNET" />\n    <!-- No dangerous permissions -->\n    <!-- No exported components -->\n\n    <application\n        android:allowBackup=\"false\"\n        android:debuggable=\"false\"\n        android:exported=\"false\"\n        android:usesCleartextTraffic=\"false\"\n        android:networkSecurityConfig=\"@xml/network_security_config\">\n        <activity android:name=\".MainActivity\" android:exported=\"false\" />\n    </application>\n</manifest>`;
  const noncompliantSample = `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigviolations">\n\n    <!-- Common STIG infractions -->\n    <uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\" />\n    <uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />\n    <uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\" />\n    <uses-permission android:name=\"android.permission.CAMERA\" />\n    <!-- Exported activity -->\n\n    <application\n        android:allowBackup=\"true\"\n        android:debuggable=\"true\"\n        android:exported=\"true\"\n        android:usesCleartextTraffic=\"true\">\n        <activity android:name=\".MainActivity\" android:exported=\"true\" />\n    </application>\n</manifest>`;

  const handleLoadCompliant = () => setManifest(compliantSample);
  const handleLoadNoncompliant = () => setManifest(noncompliantSample);

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: 'auto', background: '#222', color: '#fff' }}>
      <h1>STIG Checker</h1>
      <textarea
        rows={12}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: 16, marginBottom: 16 }}
        placeholder="Paste your AndroidManifest.xml here"
        value={manifest}
        onChange={e => setManifest(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button onClick={handleCheck} style={{ padding: '8px 24px', fontSize: 16 }}>Check STIG</button>
        <button onClick={handleLoadNoncompliant} style={{ padding: '8px 24px', fontSize: 16 }}>Load Noncompliant Sample</button>
        <button onClick={handleLoadCompliant} style={{ padding: '8px 24px', fontSize: 16 }}>Load Compliant Sample</button>
      </div>
      <div style={{ marginTop: 24 }}>
        <h2>STIG Issues</h2>
        {issues.length === 0 ? <p>No issues found.</p> : (
          <table style={{ width: '100%', background: '#333', color: '#fff', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #444', padding: 8 }}>Category</th>
                <th style={{ border: '1px solid #444', padding: 8 }}>STIG ID</th>
                <th style={{ border: '1px solid #444', padding: 8 }}>Issue</th>
                <th style={{ border: '1px solid #444', padding: 8 }}>Impact</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #444', padding: 8 }}>{issue.category}</td>
                  <td style={{ border: '1px solid #444', padding: 8 }}>{issue.id}</td>
                  <td style={{ border: '1px solid #444', padding: 8 }}>{issue.label}</td>
                  <td style={{ border: '1px solid #444', padding: 8 }}>{issue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
