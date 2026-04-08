export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ marginBottom: 12 }}>School Management API</h1>

      <section style={{ background: '#fff', padding: 20, borderRadius: 12, marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Endpoints</h2>
        <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
{`POST /addSchool
GET  /listSchools?latitude=18.5204&longitude=73.8567`}
        </pre>
      </section>

      <section style={{ background: '#fff', padding: 20, borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>Database</h2>
        <p style={{ marginBottom: 0 }}>
          Uses the Railway MySQL service.
        </p>
      </section>
    </main>
  );
}
