import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Layers,
  FileCheck2,
  FolderGit2,
  Megaphone,
  MessageSquare,
  Settings,
  PlayCircle,
  ArrowRight,
  Bookmark,
  FileText,
  Code,
  Cpu,
  CircuitBoard,
  Download,
  Sparkles,
  Book,
  Code2,
  Monitor,
  Binary,
  LineChart,
  FileBadge,
  Clock,
  FileCode,
  Check,
  X,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('Semester 2');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [practiceTab, setPracticeTab] = useState('recommended');
  const [toastMessage, setToastMessage] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Today's Plan Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Study 3 topics', completed: true },
    { id: 2, text: 'Solve 5 questions', completed: true },
    { id: 3, text: 'Read 1 resource', completed: true },
    { id: 4, text: 'Review Notes', completed: false }
  ]);

  // Toast Notification Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard Event Listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Today's Plan Progress Calculations
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completedCount / totalCount) * circumference;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          showToast(updated ? 'Task marked as completed!' : 'Task updated');
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  // Search Data Index
  const searchableData = [
    { title: 'Binary Search Notes', category: 'Data Structures', type: 'Topic', view: 'dashboard' },
    { title: 'Python Classes and Objects', category: 'Python Programming', type: 'Topic', view: 'dashboard' },
    { title: 'MIPS Architecture', category: 'Computer Organization', type: 'Topic', view: 'dashboard' },
    { title: 'Boolean Algebra & Logic Gates', category: 'Digital Design', type: 'Topic', view: 'dashboard' },
    { title: 'Semester 1 Foundation Subjects', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 2 Core Subjects', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 3 Computer Science', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 4 Systems & Design', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 5 Technical Skills', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 6 Advanced Prep', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Data Structures Question Bank', category: 'Question Bank', type: 'PDF', view: 'resources' },
    { title: 'Python Programming Notes', category: 'Notes', type: 'DOCX', view: 'resources' },
    { title: 'COA Lab Manual', category: 'Lab Manual', type: 'PDF', view: 'resources' },
    { title: 'VTU IA-1 Assessment Schedule', category: 'Announcements', type: 'Notice', view: 'announcements' },
    { title: 'Explain binary search with an example', category: 'Practice Question', type: '5 Marks', view: 'practice' },
    { title: 'Arrays and Searching Practice Set', category: 'Practice Set', type: '25 Qs', view: 'practice' }
  ];

  const filteredSearch = searchableData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-slate-800 antialiased min-h-screen flex flex-col font-sans">
      {/* TOP HEADER BAR - CENTERED SEARCH BAR */}
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
        {/* Left Brand Title */}
        <div className="w-48 flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-base tracking-tight">NotesVault</span>
        </div>

        {/* CENTERED SEARCH BAR */}
        <div className="flex-1 max-w-xl mx-auto flex justify-center">
          <button
            onClick={() => setSearchModalOpen(true)}
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

        {/* Right Header User Profile Actions */}
        <div className="w-48 flex items-center justify-end gap-4">
          <button
            onClick={() => showToast('No new notifications')}
            className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          <div
            className="flex items-center gap-3 pl-3 border-l border-slate-200 cursor-pointer"
            onClick={() => setActiveTab('settings')}
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

      <div className="flex flex-1">
        {/* LEFT SIDEBAR NAVIGATION */}
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
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'semesters', label: 'Semesters', icon: BookMarked },
                { id: 'subjects', label: 'Subjects', icon: Layers },
                { id: 'practice', label: 'Practice', icon: FileCheck2 },
                { id: 'resources', label: 'Resources', icon: FolderGit2 }
              ].map((item) => {
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
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeTab === 'announcements'
                      ? 'nav-item-active bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Announcements</span>
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeTab === 'feedback'
                      ? 'nav-item-active bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Feedback</span>
                </button>
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

        {/* MAIN VIEW CONTAINER */}
        <main className="flex-1 bg-white p-8 overflow-y-auto">
          {/* ================= PAGE 1: DASHBOARD VIEW ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Monday, 29 June 2026</div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good morning, Sujan</h1>
                <p className="text-sm text-slate-500 mt-0.5">Small steps today, big progress tomorrow.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Columns */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Banner Card: Continue Learning */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm hover:border-teal-600 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-3">
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Binary Search</h2>
                    <p className="text-xs font-medium text-slate-500 mb-3">Data Structures · Unit 2 · Searching</p>
                    <p className="text-sm text-slate-600 mb-6 max-w-lg leading-relaxed">
                      A searching algorithm for finding an element in a sorted array by repeatedly dividing the search space.
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setActiveTab('subjects')}
                        className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>Continue reading</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsBookmarked(!isBookmarked);
                          showToast(isBookmarked ? 'Removed from bookmarks' : 'Added to saved bookmarks');
                        }}
                        className={`p-2.5 border rounded-lg transition-colors ${
                          isBookmarked
                            ? 'bg-teal-50 border-teal-300 text-teal-700'
                            : 'text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="w-full bg-slate-100 rounded-full h-2 mr-4 overflow-hidden">
                        <div className="bg-teal-700 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="font-bold text-slate-700 whitespace-nowrap">82% complete</span>
                    </div>
                  </div>

                  {/* Your Semesters */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">Your Semesters</h3>
                      <button
                        onClick={() => setActiveTab('semesters')}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                      >
                        View all <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { sem: 'Semester 1', count: '6 Subjects', active: true },
                        { sem: 'Semester 2', count: '6 Subjects', active: false },
                        { sem: 'Semester 3', count: '7 Subjects', active: false },
                        { sem: 'Semester 4', count: '6 Subjects', active: false },
                        { sem: 'Semester 5', count: '7 Subjects', active: false },
                        { sem: 'Semester 6', count: '7 Subjects', active: false }
                      ].map((s, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveTab('semesters')}
                          className="card-hover bg-white border border-slate-200 rounded-xl p-4 cursor-pointer"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                              s.active ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <Book className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-sm text-slate-900">{s.sem}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{s.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recently Opened */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">Recently Opened</h3>
                      <button
                        onClick={() => setActiveTab('subjects')}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                      >
                        View all <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'Binary Search', sub: 'Data Structures · Unit 2', time: 'Yesterday', prog: '82%', icon: FileText, highlight: true },
                        { title: 'Python Classes and Objects', sub: 'Python Programming · Unit 4', time: '3 days ago', prog: '64%', icon: Code },
                        { title: 'MIPS Architecture', sub: 'Computer Organization · Unit 3', time: '5 days ago', prog: '40%', icon: Cpu },
                        { title: 'Boolean Algebra', sub: 'Digital Design · Unit 1', time: '1 week ago', prog: '100%', icon: CircuitBoard }
                      ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveTab('subjects')}
                            className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                                  item.highlight
                                    ? 'bg-teal-50 border-teal-100 text-teal-700'
                                    : 'bg-slate-100 border-slate-200 text-slate-700'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                <div className="text-xs text-slate-500">{item.sub}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="text-xs text-slate-400">{item.time}</span>
                              <span className="text-xs font-bold text-teal-700 w-12 text-right">{item.prog}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practice Questions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">Practice Questions</h3>
                      <button
                        onClick={() => setActiveTab('practice')}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                      >
                        View all <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { q: 'Explain binary search with an example.', marks: '5 marks' },
                        { q: 'Compare linear search and binary search.', marks: '5 marks' },
                        { q: 'Write a C program to implement binary search.', marks: '7 marks' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setActiveTab('practice');
                            showToast('Starting practice question session...');
                          }}
                          className="card-hover bg-white border border-slate-200 rounded-xl p-4 cursor-pointer flex flex-col justify-between"
                        >
                          <p className="text-xs font-semibold text-slate-800 mb-4 line-clamp-2">{item.q}</p>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                            <span>Data Structures · Unit 2</span>
                            <span className="font-bold text-teal-700">{item.marks}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Widgets */}
                <div className="space-y-6">
                  {/* Today's Plan */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">Today's Plan</h3>
                      <button onClick={() => showToast('Plan view updated')} className="text-xs font-semibold text-teal-700 hover:underline">
                        View all
                      </button>
                    </div>

                    {/* Circular Progress Gauge */}
                    <div className="flex justify-center my-4">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                          <circle
                            className="progress-ring-circle"
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#0D9488"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <div className="text-xl font-extrabold text-slate-900">
                            {completedCount}/{totalCount}
                          </div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">tasks</div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Checklist */}
                    <div className="space-y-3 mt-4">
                      {tasks.map((t) => (
                        <label key={t.id} className="flex items-center gap-3 text-sm cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTask(t.id)}
                            className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-500"
                          />
                          <span className={t.completed ? 'text-slate-400 line-through' : 'text-slate-700'}>{t.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Important Announcement */}
                  <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 relative">
                    <div className="flex items-center justify-between text-amber-800 mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Megaphone className="w-4 h-4" />
                        <span>Important Announcement</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">VTU Internal Assessment Schedule</h4>
                    <div className="text-[11px] text-slate-500 mb-2">Sep 28, 2026</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The IA-1 examination will be conducted from 10th October 2026. Check subject-wise schedule.
                    </p>
                  </div>

                  {/* New Resources */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">New Resources</h3>
                      <button onClick={() => setActiveTab('resources')} className="text-xs font-semibold text-teal-700 hover:underline">
                        View all
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: 'Data Structures Question Bank', sub: 'Data Structures · Unit 1-5', tag: 'PDF', bg: 'bg-rose-50 border-rose-100 text-rose-600' },
                        { title: 'Python Programming Notes', sub: 'Python · Complete Notes', tag: 'DOC', bg: 'bg-teal-50 border-teal-100 text-teal-700' },
                        { title: 'COA Lab Manual', sub: 'Computer Organization', tag: 'LAB', bg: 'bg-amber-50 border-amber-100 text-amber-700' },
                        { title: 'Digital Design Slides', sub: 'Digital Design · Unit 1-3', tag: 'PPT', bg: 'bg-teal-50 border-teal-100 text-teal-700' }
                      ].map((res, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded border font-bold text-[10px] flex items-center justify-center ${res.bg}`}>
                              {res.tag}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{res.title}</div>
                              <div className="text-[10px] text-slate-500">{res.sub}</div>
                            </div>
                          </div>
                          <button onClick={() => showToast('Downloading file to device...')} className="text-slate-400 hover:text-slate-700 p-1">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">You're doing great!</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Consistency today builds the results you want tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 2: SEMESTERS VIEW ================= */}
          {activeTab === 'semesters' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-semibold">Semesters</span>
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Semesters</h1>
                <p className="text-sm text-slate-500">Browse subjects, notes and resources by semester.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    sem: 'Semester 1',
                    count: '6 subjects',
                    desc: 'Build your foundation with core engineering concepts, calculus, and introductory programming.',
                    highlight: true,
                    subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical Engineering', 'Elements of Civil Engineering', 'C Programming']
                  },
                  {
                    sem: 'Semester 2',
                    count: '6 subjects',
                    desc: 'Strengthen your fundamentals and programming skills with data logic and chemistry basics.',
                    highlight: false,
                    subjects: ['Engineering Mathematics II', 'Engineering Chemistry', 'Data Structures', 'Python Programming', 'Digital Electronics']
                  },
                  {
                    sem: 'Semester 3',
                    count: '7 subjects',
                    desc: 'Explore core computer science, algorithm analysis, object-oriented concepts, and computer architecture.',
                    highlight: false,
                    subjects: ['Discrete Mathematics', 'Computer Organization', 'Object Oriented Programming', 'Software Engineering', 'Unix Shell Programming']
                  },
                  {
                    sem: 'Semester 4',
                    count: '6 subjects',
                    desc: 'Dive deeper into operating systems, database management systems, design & analysis of algorithms.',
                    highlight: false,
                    subjects: ['Database Management Systems', 'Design & Analysis of Algorithms', 'Operating Systems', 'Microprocessors & Microcontrollers', 'Graph Theory']
                  },
                  {
                    sem: 'Semester 5',
                    count: '7 subjects',
                    desc: 'Advance your technical knowledge in computer networks, web technology, theory of computation, and AI.',
                    highlight: false,
                    subjects: ['Computer Networks', 'Web Technology & Its Applications', 'Automata Theory & Computability', 'Artificial Intelligence', 'Cloud Computing']
                  },
                  {
                    sem: 'Semester 6',
                    count: '6 subjects',
                    desc: 'Prepare for advanced topics, system software, machine learning, cyber security, and real-world projects.',
                    highlight: false,
                    subjects: ['System Software & Compilers', 'Machine Learning', 'Computer Graphics & Visualization', 'Information & Network Security', 'Capstone Project Phase 1']
                  }
                ].map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedSemester(s.sem);
                      setActiveTab('subjects');
                      showToast(`Opened ${s.sem} subjects`);
                    }}
                    className="card-hover bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                            s.highlight ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{s.sem}</h3>
                      <div className="text-xs font-semibold text-teal-700 mb-2">{s.count}</div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Subjects</div>
                      <div className="flex flex-wrap gap-1">
                        {s.subjects.slice(0, 3).map((subName, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {subName}
                          </span>
                        ))}
                        {s.subjects.length > 3 && (
                          <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-bold">
                            +{s.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PAGE 3: SUBJECTS VIEW ================= */}
          {activeTab === 'subjects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-semibold">Subjects</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Subjects</h1>
                  <p className="text-sm text-slate-500">Explore subjects, access notes, practice questions and resources.</p>
                </div>

                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 font-medium focus:outline-none focus:border-teal-600"
                >
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                  <option>Semester 4</option>
                  <option>Semester 5</option>
                  <option>Semester 6</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Data Structures',
                    icon: Cpu,
                    units: '5 Units',
                    desc: 'Learn fundamental data structures and algorithms including Arrays, Stacks, Queues, Trees, Graphs, and Hashing.',
                    highlight: true
                  },
                  {
                    title: 'Python Programming',
                    icon: Code2,
                    units: '5 Units',
                    desc: 'Build problem solving skills using Python syntax, OOP concepts, File I/O, Exception Handling, and standard libraries.',
                    highlight: false
                  },
                  {
                    title: 'Computer Organization',
                    icon: Monitor,
                    units: '5 Units',
                    desc: 'Understand computer architecture, CPU design, memory hierarchy, instruction sets, and input/output interfaces.',
                    highlight: false
                  },
                  {
                    title: 'Digital Design',
                    icon: Binary,
                    units: '5 Units',
                    desc: 'Learn digital logic gates, Boolean minimization techniques, combinational circuits, flip-flops, and sequential state machines.',
                    highlight: false
                  },
                  {
                    title: 'Mathematics',
                    icon: LineChart,
                    units: '5 Units',
                    desc: 'Discrete mathematics, set theory, combinatorics, recurrence relations, graph theory, and mathematical logic.',
                    highlight: false
                  },
                  {
                    title: 'Communication Skills',
                    icon: FileBadge,
                    units: '5 Units',
                    desc: 'Improve technical writing, presentation skills, group discussions, email etiquette, and workplace communication.',
                    highlight: false
                  }
                ].map((subj, idx) => {
                  const IconComp = subj.icon;
                  return (
                    <div key={idx} className="card-hover bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                              subj.highlight ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{subj.title}</h3>
                        <div className="text-xs font-semibold text-teal-700 mb-2">{subj.units}</div>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">{subj.desc}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-4">
                        <button
                          onClick={() => {
                            setActiveTab('resources');
                            showToast(`Viewing ${subj.title} Notes`);
                          }}
                          className="hover:text-teal-700 flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Notes
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('practice');
                            showToast(`Viewing ${subj.title} Question Bank`);
                          }}
                          className="hover:text-teal-700 flex items-center gap-1"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" /> Question Bank
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= PAGE 4: PRACTICE VIEW ================= */}
          {activeTab === 'practice' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-semibold">Practice</span>
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Practice</h1>
                <p className="text-sm text-slate-500">Solve questions, track your progress and strengthen your concepts.</p>
              </div>

              {/* 3 Top Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => showToast('Opening Topic-wise Practice Questions...')}
                  className="card-hover bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Topic-wise Practice</h3>
                  <p className="text-xs text-slate-500 mt-1">Practice specific module questions by topic</p>
                </div>

                <div
                  onClick={() => showToast('Opening Subject-wise Full Question Sets...')}
                  className="card-hover bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Subject-wise Practice</h3>
                  <p className="text-xs text-slate-500 mt-1">Full subject question papers and mock tests</p>
                </div>

                <div
                  onClick={() => showToast('Opening Previous Year Exam Questions...')}
                  className="card-hover bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Previous Year Questions</h3>
                  <p className="text-xs text-slate-500 mt-1">Practice past university semester exam questions</p>
                </div>
              </div>

              {/* Practice List Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-6 text-sm font-bold">
                    <button
                      onClick={() => setPracticeTab('recommended')}
                      className={`pb-4 -mb-4 transition-colors ${
                        practiceTab === 'recommended' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Recommended
                    </button>
                    <button
                      onClick={() => setPracticeTab('recent')}
                      className={`pb-4 -mb-4 transition-colors ${
                        practiceTab === 'recent' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setPracticeTab('bookmarks')}
                      className={`pb-4 -mb-4 transition-colors ${
                        practiceTab === 'bookmarks' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Bookmarks
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Arrays and Searching', sub: 'Data Structures · 25 questions', diff: 'Easy', tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                    { title: 'Python Functions', sub: 'Python Programming · 20 questions', diff: 'Medium', tagColor: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { title: 'Computer Architecture Basics', sub: 'Computer Organization · 30 questions', diff: 'Medium', tagColor: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { title: 'Logic Gates and Boolean Algebra', sub: 'Digital Design · 28 questions', diff: 'Medium', tagColor: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { title: 'Discrete Mathematics', sub: 'Mathematics · 25 questions', diff: 'Hard', tagColor: 'bg-rose-50 text-rose-700 border-rose-200' },
                    { title: 'Communication Skills', sub: 'Communication · 20 questions', diff: 'Easy', tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                  ].map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-teal-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                          <FileCode className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{q.title}</div>
                          <div className="text-xs text-slate-500">{q.sub}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 border rounded-md text-xs font-bold ${q.tagColor}`}>{q.diff}</span>
                        <button
                          onClick={() => showToast(`Starting ${q.title} practice...`)}
                          className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                        >
                          Start <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 5: RESOURCES VIEW ================= */}
          {activeTab === 'resources' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-semibold">Resources</span>
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Resources</h1>
                <p className="text-sm text-slate-500">Access study materials, notes, question banks and useful links – all in one place.</p>
              </div>

              {/* Resource Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'notes', label: 'Notes' },
                  { id: 'qb', label: 'Question Banks' },
                  { id: 'lab', label: 'Lab Manuals' },
                  { id: 'pyq', label: 'Previous Year Papers' },
                  { id: 'textbook', label: 'Textbooks' },
                  { id: 'syllabus', label: 'Syllabus' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setResourceFilter(f.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                      resourceFilter === f.id ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Resource List Items */}
              <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-sm">
                {[
                  { title: 'Data Structures Notes', sub: 'Module 1 – 5 · Complete Notes', size: '2.4 MB', type: 'PDF', cat: 'notes' },
                  { title: 'Python Programming Question Bank', sub: 'Unit wise questions with detailed solutions', size: '1.8 MB', type: 'QB', cat: 'qb' },
                  { title: 'Computer Organization Lab Manual', sub: 'Experiments and assembly programs', size: '3.1 MB', type: 'LAB', cat: 'lab' },
                  { title: 'Digital Design Previous Year Papers', sub: 'VTU Solved Papers 2018 – 2024', size: '4.2 MB', type: 'PYQ', cat: 'pyq' },
                  { title: 'VTU Official Syllabus Handbook', sub: 'Computer Science & Engineering Curriculum', size: '1.1 MB', type: 'PDF', cat: 'syllabus' },
                  { title: 'Discrete Mathematics Formula Sheet', sub: 'Important formulas and theorems summary', size: '680 KB', type: 'PDF', cat: 'notes' },
                  { title: 'Communication Skills Notes', sub: 'Unit wise important questions & answers', size: '1.2 MB', type: 'DOC', cat: 'notes' },
                  { title: 'Quick Revision Flashcards', sub: 'All subjects key summary points', size: '950 KB', type: 'PDF', cat: 'notes' }
                ]
                  .filter((r) => resourceFilter === 'all' || r.cat === resourceFilter)
                  .map((res, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                          {res.type}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{res.title}</div>
                          <div className="text-xs text-slate-500">{res.sub}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs text-slate-400">{res.size}</span>
                        <button
                          onClick={() => showToast(`Downloading ${res.title}...`)}
                          className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                        >
                          View & Download <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= PAGE 6: ANNOUNCEMENTS VIEW ================= */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Announcements</h1>
                <p className="text-sm text-slate-500">Stay updated with official college notices and exam dates.</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                      Urgent Notice
                    </span>
                    <span className="text-xs text-slate-400">Sep 28, 2026</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">VTU Internal Assessment Schedule</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The IA-1 examination for all engineering branches will commence from 10th October 2026. Detailed timetable has been published on the notice board.
                  </p>
                </div>

                <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                      Workshop
                    </span>
                    <span className="text-xs text-slate-400">Sep 25, 2026</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Hands-on AI & Python Development Seminar</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Join our interactive weekend session on building real-world AI applications with Python and modern web frameworks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 7: FEEDBACK VIEW ================= */}
          {activeTab === 'feedback' && (
            <div className="max-w-2xl space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Feedback</h1>
                <p className="text-sm text-slate-500">Have suggestions or spotted an issue? Send us your thoughts!</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Thank you! Your feedback has been submitted.');
                }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Requesting more Data Structures question sets"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your detailed suggestion..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-600"
                  ></textarea>
                </div>
                <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Submit Feedback
                </button>
              </form>
            </div>
          )}

          {/* ================= PAGE 8: SETTINGS VIEW ================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500">Manage your profile details and preference configurations.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 font-extrabold text-xl text-slate-800 flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">Sujan</div>
                    <div className="text-xs text-slate-500">Student Account</div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Sujan" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <input
                      type="text"
                      value="Student"
                      readOnly
                      className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Theme Scheme</label>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-300 text-teal-800 text-xs font-bold">
                        <Check className="w-3.5 h-3.5" /> Pure White Main Canvas (2-Color Teal/Slate System)
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Settings saved successfully!')}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* COMMAND PALETTE / CTRL+K SEARCH MODAL */}
      {searchModalOpen && (
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
                onClick={() => setSearchModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold bg-slate-100 rounded px-2 py-1"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredSearch.length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  <Search className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm">No matching topics or resources found for "{searchQuery}"</p>
                </div>
              ) : (
                filteredSearch.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveTab(item.view);
                      setSearchModalOpen(false);
                    }}
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
      )}

      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50 animate-fadeIn">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
