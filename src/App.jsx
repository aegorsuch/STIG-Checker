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
      id: 'V-242862',
      category: 'CAT I',
      pattern: 'android:permission="android.permission.READ_EXTERNAL_STORAGE"',
      description: 'The app must not request READ_EXTERNAL_STORAGE permission unless absolutely necessary. This can expose sensitive data.',
      label: 'READ_EXTERNAL_STORAGE',
    },
    {
      id: 'V-242863',
      category: 'CAT I',
      pattern: 'android:permission="android.permission.INTERNET"',
      description: 'The app must not request INTERNET permission unless required. Unrestricted internet access can expose sensitive data.',
      label: 'INTERNET',
    },
    {
      id: 'V-242864',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.ACCESS_COARSE_LOCATION"',
      description: 'The app must not request ACCESS_COARSE_LOCATION permission unless required. This can expose user location.',
      label: 'ACCESS_COARSE_LOCATION',
    },
    {
      id: 'V-242865',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.ACCESS_BACKGROUND_LOCATION"',
      description: 'The app must not request ACCESS_BACKGROUND_LOCATION permission unless required. This can expose user location in the background.',
      label: 'ACCESS_BACKGROUND_LOCATION',
    },
    {
      id: 'V-242866',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.SYSTEM_ALERT_WINDOW"',
      description: 'The app must not request SYSTEM_ALERT_WINDOW permission unless required. This can allow overlay attacks.',
      label: 'SYSTEM_ALERT_WINDOW',
    },
    {
      id: 'V-242867',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.PACKAGE_USAGE_STATS"',
      description: 'The app must not request PACKAGE_USAGE_STATS permission unless required. This can expose app usage data.',
      label: 'PACKAGE_USAGE_STATS',
    },
    {
      id: 'V-242868',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.BLUETOOTH"',
      description: 'The app must not request BLUETOOTH permission unless required. This can expose device connectivity.',
      label: 'BLUETOOTH',
    },
    {
      id: 'V-242869',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.BLUETOOTH_ADMIN"',
      description: 'The app must not request BLUETOOTH_ADMIN permission unless required. This can expose device connectivity.',
      label: 'BLUETOOTH_ADMIN',
    },
    {
      id: 'V-242870',
      category: 'CAT II',
      pattern: 'android:permission="android.permission.NFC"',
      description: 'The app must not request NFC permission unless required. This can expose device connectivity.',
      label: 'NFC',
    },
    // Add more rules as needed from official STIG documentation
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
  const [darkMode, setDarkMode] = useState(true);

  const handleCheck = () => {
    setIssues(checkSTIG(manifest));
  };

  // ...existing code...
  const compliantSample = `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigcompliant">\n\n    <!-- STIG-compliant settings -->\n    <uses-permission android:name="android.permission.INTERNET" />\n    <!-- No dangerous permissions -->\n    <!-- No exported components -->\n\n    <application\n        android:allowBackup=\"false\"\n        android:debuggable=\"false\"\n        android:exported=\"false\"\n        android:usesCleartextTraffic=\"false\"\n        android:networkSecurityConfig=\"@xml/network_security_config\">\n        <activity android:name=\".MainActivity\" android:exported=\"false\" />\n    </application>\n</manifest>`;
  const noncompliantSample = `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigviolations">\n\n    <!-- Common STIG infractions -->\n    <uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\" />\n    <uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />\n    <uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\" />\n    <uses-permission android:name=\"android.permission.CAMERA\" />\n    <!-- Exported activity -->\n\n    <application\n        android:allowBackup=\"true\"\n        android:debuggable=\"true\"\n        android:exported=\"true\"\n        android:usesCleartextTraffic=\"true\">\n        <activity android:name=\".MainActivity\" android:exported=\"true\" />\n    </application>\n</manifest>`;

  const handleLoadCompliant = () => setManifest(compliantSample);
  const handleLoadNoncompliant = () => setManifest(noncompliantSample);
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div
      className="stig-root"
      style={{
        padding: 24,
        maxWidth: 800,
        margin: 'auto',
        background: darkMode ? '#222' : '#fff',
        color: darkMode ? '#fff' : '#222',
        boxSizing: 'border-box',
        transition: 'background 0.2s, color 0.2s',
      }}
      role="main"
      aria-label="Android Manifest STIG Checker Main Content"
    >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button
                onClick={() => setDarkMode(dm => !dm)}
                style={{ padding: '6px 18px', fontSize: 15, borderRadius: 6, background: darkMode ? '#444' : '#eee', color: darkMode ? '#fff' : '#222', border: '1px solid #888', cursor: 'pointer' }}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
      <h1 tabIndex={0} aria-label="Android Manifest STIG Checker" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span role="img" aria-label="Shield" style={{ fontSize: 32 }}>🛡️</span>
        Android Manifest STIG Checker
      </h1>
      <div style={{ marginBottom: 16 }}>
        <input
          type="file"
          accept=".xml,text/xml"
          style={{ marginBottom: 8 }}
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = ev => setManifest(ev.target.result);
              reader.readAsText(file);
            }
          }}
        />
        <textarea
          rows={12}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: 16 }}
          placeholder="Paste your AndroidManifest.xml here"
          value={manifest}
          onChange={e => setManifest(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <button onClick={handleCheck} style={{ padding: '8px 24px', fontSize: 16, flex: '1 1 180px', minWidth: 120 }} title="Check your manifest for STIG compliance">
          <span role="img" aria-label="Check">✅</span> Check STIG Compliance
        </button>
        <button onClick={handleLoadNoncompliant} style={{ padding: '8px 24px', fontSize: 16, flex: '1 1 180px', minWidth: 120 }} title="Load a sample manifest with common STIG violations">
          <span role="img" aria-label="Warning">⚠️</span> Load Noncompliant Sample
        </button>
        <button onClick={handleLoadCompliant} style={{ padding: '8px 24px', fontSize: 16, flex: '1 1 180px', minWidth: 120 }} title="Load a sample manifest that is STIG compliant">
          <span role="img" aria-label="Shield">🛡️</span> Load Compliant Sample
        </button>
      </div>
            {/* Responsive styles for mobile */}
            <style>
              {`
                @media (max-width: 600px) {
                  .stig-root {
                    padding: 8px !important;
                    max-width: 100vw !important;
                  }
                  textarea {
                    font-size: 14px !important;
                    min-width: 0 !important;
                  }
                  table {
                    font-size: 12px !important;
                  }
                  button {
                    font-size: 14px !important;
                    padding: 8px 12px !important;
                    min-width: 80px !important;
                  }
                }
                body, .stig-root {
                  background: ${darkMode ? '#222' : '#fff'} !important;
                  color: ${darkMode ? '#fff' : '#222'} !important;
                }
              `}
            </style>
      <div style={{ marginTop: 24 }} aria-live="polite" aria-label="STIG Issues Table">
        <h2 tabIndex={0} aria-label="STIG Issues">STIG Issues</h2>
        {issues.length === 0 ? <p>No issues found.</p> : (
          <>
            <table style={{ width: '100%', background: '#333', color: '#fff', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #444', padding: 8 }}>Category</th>
                  <th style={{ border: '1px solid #444', padding: 8 }}>STIG ID</th>
                  <th style={{ border: '1px solid #444', padding: 8 }}>Issue</th>
                  <th style={{ border: '1px solid #444', padding: 8 }}>Impact</th>
                  <th style={{ border: '1px solid #444', padding: 8 }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, idx) => {
                  let rowStyle = {};
                  if (issue.category === 'CAT I') {
                    rowStyle.background = '#440000'; // dark red
                  } else if (issue.category === 'CAT II') {
                    rowStyle.background = '#444000'; // dark yellow
                  }
                  // Link to official STIG documentation (example URL)
                  const stigUrl = `https://www.stigviewer.com/stig/android_os/${issue.id.toLowerCase()}`;
                  return (
                    <tr key={idx} style={rowStyle}>
                      <td style={{ border: '1px solid #444', padding: 8 }}>{issue.category}</td>
                      <td style={{ border: '1px solid #444', padding: 8 }}>{issue.id}</td>
                      <td style={{ border: '1px solid #444', padding: 8 }}>{issue.label}</td>
                      <td style={{ border: '1px solid #444', padding: 8 }}>{issue.description}</td>
                      <td style={{ border: '1px solid #444', padding: 8 }}>
                        <a href={stigUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4eaaff', textDecoration: 'underline' }}>View STIG</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button onClick={() => {
                // CSV export
                const csv = [
                  ['Category', 'STIG ID', 'Issue', 'Impact'],
                  ...issues.map(i => [i.category, i.id, i.label, i.description])
                ].map(row => row.map(cell => '"' + cell.replace(/"/g, '""') + '"').join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'stig-issues.csv';
                a.click();
                URL.revokeObjectURL(url);
              }} style={{ padding: '8px 24px', fontSize: 16 }}>Export CSV</button>
              <button onClick={() => window.print()} style={{ padding: '8px 24px', fontSize: 16 }}>Export PDF</button>
            </div>
          </>
        )}
      </div>

      {/* Feedback Section */}
      <div style={{ marginTop: 40, background: '#282828', padding: 24, borderRadius: 8 }} aria-label="Feedback & Suggestions">
        <h2 tabIndex={0} aria-label="Feedback & Suggestions">Feedback & Suggestions</h2>
        <form
          action="https://github.com/aegorsuch/Android-Manifest-STIG-Checker/issues"
          target="_blank"
          style={{ marginBottom: 16 }}
          aria-label="Feedback Form"
          onSubmit={e => {
            setFeedbackSent(true);
            setTimeout(() => setFeedbackSent(false), 4000);
          }}
        >
          <label htmlFor="feedback" style={{ display: 'block', marginBottom: 8 }}>Suggest a new rule or report an issue:</label>
          <textarea id="feedback" name="feedback" rows={4} style={{ width: '100%', fontFamily: 'monospace', fontSize: 16, marginBottom: 12 }} placeholder="Describe your suggestion or issue..." aria-label="Feedback Input" />
          <button type="submit" style={{ padding: '8px 24px', fontSize: 16 }} aria-label="Submit Feedback">Submit Feedback</button>
        </form>
        {feedbackSent && (
          <div style={{ color: '#4eaaff', fontWeight: 'bold', marginBottom: 8 }} aria-live="polite">Thank you for your feedback!</div>
        )}
        {/* Removed direct GitHub report link as requested */}
      </div>
    </div>
  );
}
