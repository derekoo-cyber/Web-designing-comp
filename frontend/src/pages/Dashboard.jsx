import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, CalendarDays, Utensils, Music, PenTool, Dribbble, FileText, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // We simulate loading but don't strictly use the old backend data structure here
        // since we are converting it to a completely matched hardcoded/visual layout.
        // In a real app, we would map the backend data to these exact distinct components.
        setTimeout(() => {
            fetch('http://localhost:8000/api/dashboard')
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching dashboard data:", err);
                    setLoading(false); // fail gracefully to render UI anyway
                });
        }, 300);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col xl:flex-row gap-8 h-full">

            {/* Left Column - Main Content (about 70%) */}
            <div className="w-full xl:w-[68%] flex flex-col gap-8">

                {/* Hero Announcement Card */}
                <div className="relative bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/80 dark:to-slate-900/80 rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-white dark:border-slate-800/60 shadow-sm dark:shadow-none flex flex-col items-start justify-center min-h-[400px] animate-fade-in-up transition-colors">
                    <span className="bg-violet-300/40 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 relative z-10 backdrop-blur-sm transition-colors">
                        Important Announcement
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6 relative z-10 transition-colors">
                        Midterm Exam Schedule is<br />now live! 📑
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-lg mb-10 relative z-10 leading-relaxed font-medium transition-colors">
                        Check your student portal for venue assignments and specific timings. Don't forget your digital ID.
                    </p>

                    <div className="flex items-center gap-6 relative z-10">
                        <button
                            onClick={() => navigate('/profile')}
                            className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-violet-200 dark:shadow-none transition-transform active:scale-95">
                            View Schedule
                        </button>
                        <button
                            onClick={() => navigate('/announcements')}
                            className="text-violet-600 dark:text-violet-400 font-bold hover:text-violet-800 dark:hover:text-violet-300 transition-all active:scale-95 flex items-center">
                            Details <ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                </div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <button className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100/60 dark:border-slate-700/50 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-64 hover:shadow-md dark:hover:shadow-none hover:border-violet-100 dark:hover:border-violet-500/40 dark:hover:bg-slate-800/80 transition-all group active:scale-95">
                        <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <Book className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-white transition-colors">Library</span>
                    </button>

                    <button className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100/60 dark:border-slate-700/50 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-64 hover:shadow-md dark:hover:shadow-none hover:border-violet-100 dark:hover:border-violet-500/40 dark:hover:bg-slate-800/80 transition-all group active:scale-95">
                        <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <CalendarDays className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" />
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-white transition-colors">Time Table</span>
                    </button>

                    <button className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100/60 dark:border-slate-700/50 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-64 hover:shadow-md dark:hover:shadow-none hover:border-violet-100 dark:hover:border-violet-500/40 dark:hover:bg-slate-800/80 transition-all group active:scale-95">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <Utensils className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-white transition-colors">Daily Menu</span>
                    </button>
                </div>
            </div>


            {/* Right Column - Sidebars (about 32%) */}
            <div className="w-full xl:w-[32%] flex flex-col gap-6">

                {/* Header for right section */}
                <div className="flex items-center justify-between mb-2 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white transition-colors">Hype Events</h3>
                    <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400 transition-colors" fill="currentColor" />
                </div>

                {/* Events list Box */}
                <div className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm dark:shadow-none flex flex-col justify-between gap-6 animate-fade-in-left transition-colors" style={{ animationDelay: '0.3s' }}>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                            <Music className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Campus Concert</h4>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Friday • 8 PM • Quad</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700/50 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30 transition-colors">
                            <PenTool className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">UI/UX Workshop</h4>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Sat • 10 AM • Lab 3</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                            <Dribbble className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Inter-college Finals</h4>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Sun • 4 PM • Arena</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/events')}
                        className="w-full mt-2 py-3.5 border-2 border-dashed border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400 font-bold rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all active:scale-95 flex items-center justify-center">
                        View Calendar
                    </button>

                </div>

                {/* New Resources Solid Card */}
                <div className="bg-violet-600 dark:bg-violet-700/80 rounded-[2.5rem] p-8 h-72 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-violet-200/50 dark:shadow-none border dark:border-violet-600/30 group cursor-pointer animate-fade-in-left transition-colors" style={{ animationDelay: '0.4s' }} onClick={() => navigate('/resources')}>
                    <FileText className="absolute -bottom-8 -right-8 w-40 h-40 text-black/10 dark:text-black/20 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" strokeWidth={1.5} />

                    <h3 className="text-white font-bold text-lg relative z-10">New Resources</h3>

                    <div className="relative z-10">
                        <p className="text-violet-200 text-xs font-medium mb-1 uppercase tracking-wider">Recently Uploaded</p>
                        <h2 className="text-white text-2xl font-extrabold leading-snug">Physics Lab Manual v2.pdf</h2>
                    </div>

                    <div className="relative z-10 mt-auto pt-4">
                        <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md">
                            JUST NOW
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
}
