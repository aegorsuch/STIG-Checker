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
      <button onClick={handleCheck} style={{ padding: '8px 24px', fontSize: 16 }}>Check STIG</button>
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
