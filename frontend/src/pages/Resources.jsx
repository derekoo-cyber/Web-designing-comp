import { Book, FileText, Globe, Download, Folder, ExternalLink, GraduationCap, Library, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const iconMap = {
    'GraduationCap': GraduationCap,
    'Library': Library,
    'Folder': Folder,
};

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/resources')
            .then(res => res.json())
            .then(data => {
                setResources(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching resources:", err));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">

            {/* Header section with search */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

                <div className="relative z-10 w-full md:w-2/3">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Resource Center</h1>
                    <p className="text-slate-500 mb-6 text-lg max-w-lg">Find forms, catalogs, study guides, and all essential materials to support your academic journey.</p>

                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search resources, forms, guidelines..."
                            className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-sm focus:bg-white focus:shadow-md"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                            <Globe className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex relative z-10 p-6 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl text-white shadow-xl shadow-indigo-200">
                    <Folder className="w-16 h-16 opacity-80" strokeWidth={1.5} />
                </div>
            </div>

            {/* Grid of resource categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((section, i) => {
                    const SectionIcon = iconMap[section.icon_name] || Folder;
                    return (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 transition-colors group">

                            <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                                <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <SectionIcon className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">{section.category}</h2>
                            </div>

                            <ul className="divide-y divide-slate-100 flex-1">
                                {section.items.map((item, j) => (
                                    <li key={j} className="p-4 hover:bg-slate-50 transition-colors group/item">
                                        <a href="#" onClick={(e) => { e.preventDefault(); alert(`Resource: ${item.name}`); }} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 w-full pr-4">

                                                {/* Type Icon */}
                                                <div className="shrink-0">
                                                    {item.type === 'pdf' && <FileText className="w-5 h-5 text-rose-500" />}
                                                    {item.type === 'doc' && <FileText className="w-5 h-5 text-blue-500" />}
                                                    {item.type === 'link' && <ExternalLink className="w-5 h-5 text-slate-400" />}
                                                    {item.type === 'folder' && <Folder className="w-5 h-5 text-amber-500 fill-amber-50" />}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-slate-700 truncate group-hover/item:text-indigo-600 transition-colors">
                                                        {item.name}
                                                    </p>
                                                    {(item.size || item.count) && (
                                                        <p className="text-xs text-slate-400 mt-0.5 font-medium">
                                                            {item.size ? item.size : `${item.count} items`}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                            {/* Action Icon */}
                                            <div className="shrink-0 opacity-0 md:opacity-100 md:group-hover/item:opacity-100 transition-opacity">
                                                {item.type === 'link' ? (
                                                    <div className="p-1.5 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 hover:text-slate-800 transition-colors">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </div>
                                                ) : item.type === 'folder' ? (
                                                    <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors">
                                                        <Folder className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                                <button
                                    onClick={() => alert(`View all items in ${section.category}`)}
                                    className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors">
                                    View All {section.category}
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}
