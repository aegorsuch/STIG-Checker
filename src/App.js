import React, { useState } from 'react';

function checkSTIG(manifest) {
  // STIG checks
  const rules = [
    {
      id: 'V-242851',
      category: 'CAT I',
      pattern: 'android:debuggable="true"',
      description: 'Allows remote memory extraction.',
      label: 'debuggable="true"',
    },
    {
      id: 'V-242854',
      category: 'CAT I',
      pattern: 'usesCleartextTraffic',
      description: 'Sends CoT/PLI data without TLS.',
      label: 'usesCleartextTraffic',
    },
    {
      id: 'V-2026-MTD',
      category: 'CAT I',
      pattern: 'MTD Hook',
      description: 'Fails 2026 Mobile Security Mandate.',
      label: 'Missing MTD Hook',
    },
    {
      id: 'V-242852',
      category: 'CAT II',
      pattern: 'android:allowBackup="true"',
      description: 'Permits local data extraction via ADB.',
      label: 'allowBackup="true"',
    },
    {
      id: 'V-242855',
      category: 'CAT II',
      pattern: 'android:exported="true"',
      description: 'Allows malicious apps to hijack intents.',
      label: 'Exported Components',
    },
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
