import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  searchableData,
  onSelectResult
}) {
  if (!isOpen) return null;

  const filtered = searchableData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            placeholder="Type to search topics, notes, semesters, practice questions..."
            className="w-full text-sm font-medium focus:outline-none text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-700 font-bold bg-slate-100 rounded px-2 py-1"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <Search className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <p className="text-sm">No matching topics or resources found for "{searchQuery}"</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectResult(item.view)}
                className="p-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                    {item.type.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">{item.title}</div>
                    <div className="text-xs text-slate-500">
                      {item.category} • {item.type}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-teal-600 flex items-center gap-1 font-medium">
                  Open <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))
          )}
        </div>

        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>
            Use <kbd className="font-mono bg-white border rounded px-1">↑</kbd> <kbd className="font-mono bg-white border rounded px-1">↓</kbd> to navigate
          </span>
          <span>
            <kbd className="font-mono bg-white border rounded px-1">Ctrl+K</kbd> to toggle
          </span>
        </div>
      </div>
    </div>
  );
}
