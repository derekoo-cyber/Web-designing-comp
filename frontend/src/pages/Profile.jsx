import { User, Mail, Phone, MapPin, Edit3, Settings, LogOut, CheckCircle, BookOpen, Shield, CreditCard, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/profile')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching profile:", err));
    }, []);

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    const { user_info, semester } = data;

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Left Column - Main Profile Card */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600 relative">
                        <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors">
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="px-6 pb-8">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-4 max-w-max mx-auto lg:mx-0">
                            <img
                                src={user_info.avatar}
                                alt={user_info.name}
                                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white object-cover"
                            />
                            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{user_info.name}</h1>
                            <p className="text-indigo-600 font-semibold mb-1">{user_info.major}</p>
                            <div className="flex items-center justify-center lg:justify-start text-sm text-slate-500 font-medium mb-6">
                                <span className="bg-slate-100 rounded-md px-2 py-0.5">ID: {user_info.id}</span>
                                <span className="mx-2">•</span>
                                <span>{user_info.year}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">University Email</p>
                                    <p className="text-sm font-medium text-slate-900 truncate">{user_info.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone Number</p>
                                    <p className="text-sm font-medium text-slate-900 truncate">{user_info.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Campus Housing</p>
                                    <p className="text-sm font-medium text-slate-900 truncate">{user_info.housing}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links Menu */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-2 space-y-1">
                    <button
                        onClick={() => alert("Redirecting to Account Security settings...")}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors pl-4">
                        <div className="flex items-center gap-3 font-medium">
                            <Shield className="w-5 h-5 text-indigo-500" /> Account Security
                        </div>
                    </button>
                    <button
                        onClick={() => alert("Redirecting to Preferences...")}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors pl-4">
                        <div className="flex items-center gap-3 font-medium">
                            <Settings className="w-5 h-5 text-slate-500" /> Preferences
                        </div>
                    </button>
                    <button
                        onClick={() => alert("Opening Billing Portal...")}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors pl-4">
                        <div className="flex items-center gap-3 font-medium">
                            <CreditCard className="w-5 h-5 text-emerald-500" /> Billing and Payments
                        </div>
                    </button>
                    <div className="my-2 border-t border-slate-100 mx-3"></div>
                    <button
                        onClick={() => {
                            alert("Signing out...");
                            navigate("/dashboard");
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors pl-4">
                        <div className="flex items-center gap-3 font-bold">
                            <LogOut className="w-5 h-5" /> Sign Out
                        </div>
                    </button>
                </div>
            </div>

            {/* Right Column - Tabs and Content */}
            <div className="w-full lg:w-2/3 space-y-6">

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200">
                    {/* Tabs header */}
                    <div className="flex border-b border-slate-200 px-6 pt-2 overflow-x-auto scrollbar-hide">
                        <button className="px-4 py-4 border-b-2 border-indigo-600 text-indigo-600 font-bold whitespace-nowrap">Academic Progress</button>
                        <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-semibold whitespace-nowrap transition-colors">Extracurriculars</button>
                        <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-semibold whitespace-nowrap transition-colors">Documents</button>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">{semester.term}</h2>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" /> {semester.status}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {semester.classes.map((cls, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 bg-white hover:shadow-md transition-all group">
                                    <div className="flex items-start gap-4 mb-3 sm:mb-0">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-slate-900">{cls.course}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${cls.type === 'Core' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{cls.type}</span>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium">{cls.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center border-t border-slate-50 sm:border-0 pt-3 sm:pt-0">
                                        <span className="text-xs font-semibold text-slate-500">{cls.credits} Credits</span>
                                        <span className="text-lg font-bold text-slate-800 bg-slate-50 px-3 py-1 rounded-lg mt-1">{cls.grade}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Credits</p>
                                <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1">{semester.total_credits} <span className="text-base font-medium text-slate-500">this term</span></p>
                            </div>
                            <button
                                onClick={() => navigate('/resources')}
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                                View Unofficial Transcript <ExternalLink className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}
