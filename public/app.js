* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #111827, #1f2937);
  color: #e5e7eb;
  font-family: "Segoe UI", Tahoma, sans-serif;
}

.container {
  width: min(560px, 90vw);
}

.card {
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.badge {
  display: inline-block;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.14);
  color: #86efac;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
}

h1 {
  margin: 0 0 10px;
  font-size: clamp(2rem, 3vw, 2.5rem);
}

.subtitle {
  color: #cbd5e1;
  margin-bottom: 24px;
  line-height: 1.6;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

input {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.8);
  color: #f8fafc;
  padding: 14px 16px;
  font-size: 1rem;
  margin-bottom: 18px;
}

input:focus {
  outline: 2px solid rgba(96, 165, 250, 0.7);
}

button {
  width: 100%;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 18px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.status {
  margin-top: 18px;
  min-height: 24px;
  font-size: 0.96rem;
  color: #cbd5e1;
}

.status.error {
  color: #fca5a5;
}

.status.success {
  color: #86efac;
}

.note {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.25);
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;
}
