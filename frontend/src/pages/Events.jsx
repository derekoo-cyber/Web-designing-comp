import { Calendar, MapPin, Clock, Users, ArrowUpRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Events</h1>
                    <p className="text-sm text-slate-500 mt-1">Discover what's happening around campus.</p>
                </div>
                <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
                    <button className="px-4 py-1.5 text-sm font-semibold rounded-md bg-white text-indigo-700 shadow-sm border border-slate-200/50">Upcoming</button>
                    <button className="px-4 py-1.5 text-sm font-semibold rounded-md text-slate-500 hover:text-slate-800">Past</button>
                    <button className="px-4 py-1.5 text-sm font-semibold rounded-md text-slate-500 hover:text-slate-800">Saved</button>
                </div>
            </div>

            {/* Hero Featured Event */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden relative shadow-xl shadow-slate-200">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/40 mix-blend-multiply z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 z-0 mix-blend-overlay"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-200 bg-indigo-900/50 border border-indigo-500/30 rounded-full backdrop-blur-sm">
                            FEATURED EVENT
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                            Annual Tech Hackathon 2026
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm font-medium mb-6">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-indigo-400" /> Apr 2-4</span>
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-indigo-400" /> Engineering Building Hub</span>
                            <span className="flex items-center"><Users className="w-4 h-4 mr-2 text-indigo-400" /> 500+ Spots Filled</span>
                        </div>
                        <p className="text-slate-400 mb-0 hidden md:block max-w-lg leading-relaxed">
                            Join students from across the state for 48 hours of building, learning, and networking. Over $20,000 in prizes available.
                        </p>
                    </div>

                    <button
                        onClick={() => alert('Registration opening soon!')}
                        className="shrink-0 bg-white text-slate-900 hover:bg-slate-100 transition-colors px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-white/10 flex items-center justify-center">
                        Register Now
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Divider */}
            <h3 className="font-bold text-lg text-slate-800 mt-8 mb-4">This Month</h3>

            {/* Grid of Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((evt) => (
                    <div key={evt.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col">

                        <div className={`h-32 ${evt.image} relative p-5 flex flex-col justify-between align-top`}>
                            <div className="flex justify-between items-start">
                                <div className="bg-white/20 backdrop-blur-md rounded-lg text-center px-3 py-2 border border-white/20 text-white shadow-xl">
                                    <span className="block text-xs font-bold uppercase tracking-wider opacity-90">{evt.date.split(' ')[0]}</span>
                                    <span className="block text-xl font-extrabold leading-none mt-0.5">{evt.date.split(' ')[1]}</span>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                                    <Calendar className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {evt.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h4 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                                {evt.title}
                            </h4>

                            <div className="space-y-2 mb-6 text-sm text-slate-600 mt-auto">
                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>{evt.day}, {evt.time}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">{evt.location}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                                <span className="text-xs font-semibold text-slate-500">{evt.organizer}</span>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{evt.attendees} attending</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}
