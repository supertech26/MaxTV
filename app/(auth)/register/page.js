"use client";
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ... imports ...

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate registration & login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        setTimeout(() => {
            setLoading(false);
            router.push(callbackUrl);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
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
                {loading ? 'Creating Account...' : 'Sign Up'}
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

export default function Register() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <Link href="/" className="logo">
                    MAX<span className="tv-badge">TV</span>
                </Link>
                <h1>Create Account</h1>
                <p className="subtitle">Start your 4K streaming journey today</p>

                <Suspense fallback={<div>Loading...</div>}>
                    <RegisterForm />
                </Suspense>

                <p className="auth-footer">
                    Already have an account? <Link href="/login">Login</Link>
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
