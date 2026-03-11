import { Search, Bell, Megaphone, CheckCircle2, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
    'ShieldAlert': ShieldAlert,
    'AlertTriangle': AlertTriangle,
    'Megaphone': Megaphone,
    'Bell': Bell
};

export default function Announcements() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/announcements')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching announcements data:", err));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">

            {/* Header and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Announcements</h1>
                    <p className="text-sm text-slate-500 mt-1">Stay updated with official campus communications.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search notices..."
                            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none w-full sm:w-64 transition-shadow shadow-sm"
                        />
                    </div>
                    <button className="p-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 shadow-sm transition-all active:scale-95 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        <span className="sr-only">Mark all as read</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-200">
                {['All Notices', `Unread (${data.filter(d => !d.read).length})`, 'Academic', 'Campus Life', 'Emergency'].map((tab, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-t-lg border-b-2 transition-all active:scale-[0.98] ${idx === 0
                            ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                            : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Announcement List */}
            <div className="space-y-4">
                {data.map((item) => {
                    const Icon = iconMap[item.icon_name] || Bell;
                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-2xl flex flex-col sm:flex-row shadow-sm border transition-shadow hover:shadow-md ${!item.read ? 'border-indigo-300 ring-1 ring-indigo-50 shadow-indigo-100/50' : 'border-slate-100'
                                }`}
                        >
                            <div className="sm:w-48 bg-slate-50 md:bg-white p-5 rounded-l-2xl sm:border-r border-slate-100 shrink-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-3">
                                <div className="flex sm:flex-col items-center sm:items-start gap-3 w-full">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.category}</span>
                                        <p className="text-sm font-medium text-slate-800 sm:mt-1">{item.date}</p>
                                    </div>
                                </div>
                                {!item.read && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-400 sm:absolute sm:mt-6 sm:-ml-5"></span>
                                )}
                            </div>

                            <div className="p-5 md:p-6 flex-1 flex flex-col justify-center relative">
                                <h3 className={`text-lg mb-2 font-bold ${!item.read ? 'text-slate-900' : 'text-slate-800'}`}>
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {item.content}
                                </p>

                                <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => alert(`Showing details for: ${item.title}`)}
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-all active:scale-95">
                                        Read Details
                                    </button>
                                    {item.category === 'Academic' && (
                                        <button
                                            onClick={() => navigate('/resources')}
                                            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all active:scale-95 ml-4">
                                            Academic Advising Links
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
