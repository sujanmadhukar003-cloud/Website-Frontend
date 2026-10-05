import React from 'react';
import {
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Layers,
  FileCheck2,
  FolderGit2,
  Megaphone,
  MessageSquare,
  Settings
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'semesters', label: 'Semesters', icon: BookMarked },
    { id: 'subjects', label: 'Subjects', icon: Layers },
    { id: 'practice', label: 'Practice', icon: FileCheck2 },
    { id: 'resources', label: 'Resources', icon: FolderGit2 }
  ];

  const toolsNav = [
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-slate-900 leading-none">NotesVault</div>
            <div className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mt-0.5">
              Learn · Practice · Grow
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'nav-item-active bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* TOOLS Section */}
        <div>
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tools</div>
          <nav className="space-y-1">
            {toolsNav.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'nav-item-active bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Settings */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeTab === 'settings'
              ? 'nav-item-active bg-teal-50 text-teal-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
