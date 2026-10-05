import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header({ onOpenSearch, onOpenSettings, onShowToast }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left Brand Title */}
      <div className="w-48 flex items-center gap-2">
        <span className="font-extrabold text-slate-900 text-base tracking-tight">NotesVault</span>
      </div>

      {/* CENTERED SEARCH BAR */}
      <div className="flex-1 max-w-xl mx-auto flex justify-center">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg px-4 py-2 text-sm transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search subjects, topics, questions, resources...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-slate-400 font-semibold bg-white border border-slate-200 rounded px-1.5 py-0.5">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right User Actions */}
      <div className="w-48 flex items-center justify-end gap-4">
        <button
          onClick={() => onShowToast('No new notifications')}
          className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div
          className="flex items-center gap-3 pl-3 border-l border-slate-200 cursor-pointer"
          onClick={onOpenSettings}
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center">
            S
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold text-slate-900 leading-tight">Sujan</div>
            <div className="text-xs text-slate-500 leading-tight">Student</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
