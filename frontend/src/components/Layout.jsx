import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bell, Calendar, BookOpen, User, Menu, Search, X, GraduationCap, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Announcements', path: '/announcements', icon: Bell },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
];

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize dark mode from document
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        setDarkMode(!darkMode);
    };

    const getPageTitle = () => {
        const item = NAV_ITEMS.find((nav) => location.pathname.startsWith(nav.path));
        return item ? item.name : 'Smart Campus';
    };

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans transition-colors">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
                <div className="h-24 flex items-center px-8">
                    <div className="w-10 h-10 rounded-full bg-violet-600 flex flex-col justify-center items-center mr-3 shadow-lg shadow-violet-200">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
                        Smart Campus
                    </h1>
                </div>

                <nav className="flex-1 overflow-y-auto pt-4 px-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3.5 text-sm font-bold rounded-full transition-all duration-200 active:scale-95 ${isActive
                                        ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 mr-4" strokeWidth={2} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center w-full text-left transition-all hover:scale-105 active:scale-95">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-10 h-10 rounded-full mr-3 shadow-sm border-2 border-white dark:border-slate-700" />
                        <div className="flex-1 min-w-0">
                            <p className="truncate font-bold text-slate-900 dark:text-white text-sm">Alex Rivera</p>
                            <p className="truncate text-xs text-slate-400 font-medium">ID: 249012</p>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">

                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-20 transition-colors">
                    <div className="flex items-center">
                        <div className="w-7 h-7 rounded-md bg-indigo-600 dark:bg-violet-600 flex justify-center items-center mr-2 shadow-sm">
                            <span className="text-white font-bold text-xs">SC</span>
                        </div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Nexus</h1>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 -mr-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>

                {/* Mobile menu overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-10 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <div
                            className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl pb-4 px-2 pt-2 rounded-b-2xl transition-colors"
                            onClick={e => e.stopPropagation()}
                        >
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-3 text-base font-medium rounded-xl mb-1 transition-all active:scale-95 ${isActive
                                                ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300'
                                                : 'text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5 mr-4" />
                                        {item.name}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Desktop Header */}
                <header className="hidden md:flex items-center justify-between pt-8 px-12 bg-transparent w-full shrink-0">
                    {location.pathname.includes('/dashboard') ? (
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">Hey, Alex! <span className="text-3xl">👋</span></h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">Ready for your Fall Midterms?</p>
                        </div>
                    ) : (
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">{getPageTitle()}</h2>
                    )}

                    <div className="flex items-center space-x-4">
                        <div className="relative group flex items-center mr-2">
                            <Search className="w-4 h-4 text-slate-400 absolute left-4" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-violet-500 w-64 transition-all focus:w-72 outline-none text-slate-700 dark:text-white"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/announcements')}
                            className="relative w-10 h-10 flex border-none items-center justify-center bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 transition-all active:scale-95 rounded-full hover:bg-violet-200 dark:hover:bg-violet-900/50">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full transition-transform active:scale-95 hover:bg-slate-300 dark:hover:bg-slate-700">
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-12 mb-4">
                    <div className="mx-auto w-full max-w-7xl h-full relative">
                        <AnimatePresence mode="wait">
                            <PageTransition key={location.pathname}>
                                <Outlet />
                            </PageTransition>
                        </AnimatePresence>
                    </div>
                </div>

            </main>

            {/* Mobile Bottom Navigation - Optional alternatively to mobile menu or alongside */}
            {/* Decided to use standard mobile menu dropdown under header for cleaner look and more space, but leaving this commented out block as architecture note */}
        </div>
    );
}
