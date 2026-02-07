"use client";
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    // In a real app, you would validate credentials here
    localStorage.setItem('isLoggedIn', 'true'); // Simple mock auth
    localStorage.setItem('userEmail', email);
    setTimeout(() => {
      setLoading(false);
      router.push(callbackUrl);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          required
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          required
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button fullWidth type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <style jsx>{`
                .input {
                  width: 100%;
                  padding: 12px;
                  border-radius: 8px;
                  border: 1px solid var(--border);
                  background: var(--background);
                  color: var(--foreground);
                  font-family: inherit;
                }
                .input:focus {
                  outline: none;
                  border-color: var(--primary);
                }
            `}</style>
    </form>
  );
}

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link href="/" className="logo">
          MAX<span className="tv-badge">TV</span>
        </Link>
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to manage your subscriptions</p>

        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>

        <p className="auth-footer">
          Don't have an account? <Link href="/register">Create one</Link>
        </p>
      </div>


      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          background-image: radial-gradient(circle at 50% 0%, rgba(0, 220, 130, 0.1), transparent 50%);
        }
        .auth-card {
          background: var(--secondary);
          padding: 3rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          width: 100%;
          max-width: 440px;
          text-align: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--foreground);
          display: block;
          margin-bottom: 2rem;
        }
        .logo-accent { color: var(--primary); }
        h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        
        .auth-form { text-align: left; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .form-group input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
          font-family: inherit;
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
        }
        .auth-footer {
          margin-top: 2rem;
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        .auth-footer a { color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  );
}
