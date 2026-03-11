import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Login() {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null); // 'student' or 'admin'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Welcome Screen Animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5 second welcome animation

        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:8000/api/auth/${role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            // Store token if needed: localStorage.setItem('token', data.token);

            if (role === 'student' || role === 'admin') {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden relative transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-fuchsia-50 dark:from-violet-950 dark:to-slate-950 z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/20 dark:bg-violet-600/20 rounded-full blur-3xl z-0 animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Nexus</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-md animate-pulse">
                        Your Smart Campus at your fingertips.
                    </p>

                    <div className="mt-12 flex items-center space-x-3 text-violet-600 dark:text-violet-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-bold tracking-wider uppercase">Initializing Environment</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-screen bg-violet-600/5 dark:bg-violet-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-fuchsia-600/5 dark:bg-fuchsia-500/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto my-auto p-4 md:p-8 z-10">

                {/* Left Side: Branding/Info */}
                <div className="hidden lg:flex w-1/2 flex-col justify-center pr-16 animate-fade-in-left">
                    <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-200 dark:shadow-violet-900/20 mb-8">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors">
                        Empowering your academic journey.
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-md transition-colors font-medium">
                        Access grades, register for courses, discover campus events, and manage your student life securely from one centralized platform.
                    </p>

                    <div className="space-y-5">
                        <div className="flex items-center text-slate-700 dark:text-slate-300 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-4">
                                <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">✓</span>
                            </div>
                            <span className="font-extrabold">Centralized Resource Center</span>
                        </div>
                        <div className="flex items-center text-slate-700 dark:text-slate-300 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-4">
                                <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">✓</span>
                            </div>
                            <span className="font-extrabold">Real-time Campus Communications</span>
                        </div>
                        <div className="flex items-center text-slate-700 dark:text-slate-300 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-4">
                                <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">✓</span>
                            </div>
                            <span className="font-extrabold">Integrated Event Scheduling</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 max-w-md mx-auto animate-fade-in-right">

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10 overflow-hidden relative transition-colors">

                        {/* Mobile Branding (hidden on desktop) */}
                        <div className="lg:hidden w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg mb-8 mx-auto">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 transition-colors">Sign in to Nexus</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Select your portal to continue.</p>
                        </div>

                        {/* Role Selection */}
                        {!role ? (
                            <div className="space-y-4">
                                <button
                                    onClick={() => setRole('student')}
                                    className="w-full flex items-center p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-violet-600 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all group"
                                >
                                    <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mr-5 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">Student Portal</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Access your personal dashboard</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setRole('admin')}
                                    className="w-full flex items-center p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-slate-800 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                                >
                                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center mr-5 group-hover:bg-slate-800 dark:group-hover:bg-slate-700 group-hover:text-white transition-colors">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white transition-colors">Administrator Portal</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage students, events, and notices</p>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            /* Login Form */
                            <div className="animate-fade-in">
                                <button
                                    onClick={() => setRole(null)}
                                    className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-6 hover:text-violet-800 dark:hover:text-violet-300 flex items-center transition-colors"
                                >
                                    ← Back to Selection
                                </button>

                                <div className="mb-8 flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${role === 'student' ? 'bg-violet-600' : 'bg-slate-800 dark:bg-slate-700'}`}>
                                        {role === 'student' ? <User className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-slate-900 dark:text-white text-lg transition-colors">{role === 'student' ? 'Student Login' : 'Admin Login'}</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">Secure Access</p>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-bold transition-colors">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                                            {role === 'student' ? 'University ID / Email' : 'Admin Username'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                            placeholder={role === 'student' ? 'e.g., 90034211 or email@uni.edu' : 'admin_username'}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">Password</label>
                                            <a href="#" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors">Forgot password?</a>
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 px-4 rounded-2xl text-white font-extrabold shadow-md hover:shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2 ${role === 'student' ? 'bg-violet-600 hover:bg-violet-700 shadow-violet-200 dark:shadow-none' : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-slate-200 dark:shadow-none'
                                            }`}
                                    >
                                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In Complete'}
                                    </button>
                                </form>

                                {role === 'student' && (
                                    <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 mt-8 transition-colors">
                                        Don't have an account? <a href="#" className="text-violet-600 dark:text-violet-400 hover:text-violet-800 transition-colors">Contact Admissions</a>
                                    </p>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
