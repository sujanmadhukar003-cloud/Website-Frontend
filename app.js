// NotesVault Main Application JS Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation tab switching
  setupNavigation();

  // Initialize Ctrl + K shortcut and modal search
  setupSearchModal();

  // Initialize Today's Plan task manager
  setupTodayPlan();

  // Initialize Resource filtering
  setupResourceFilters();

  // Initialize AI Assistant Chat
  setupAIChat();

  // Initialize Toast notification system
  setupToasts();
});

// 1. Navigation Tab Switching System
function setupNavigation() {
  const navLinks = document.querySelectorAll('[data-nav-target]');
  const tabContents = document.querySelectorAll('.tab-content');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-nav-target');
      
      if (!targetId) return;

      // Update active nav state
      navLinks.forEach(item => {
        item.classList.remove('nav-item-active', 'bg-teal-50', 'text-teal-700', 'font-semibold');
        item.classList.add('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900');
      });

      // Highlight active link
      link.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900');
      link.classList.add('nav-item-active', 'bg-teal-50', 'text-teal-700', 'font-semibold');

      // Switch tab visibility
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `view-${targetId}`) {
          content.classList.add('active');
        }
      });

      // Scroll to top of main content smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// 2. Command Palette / Ctrl+K Search Modal
function setupSearchModal() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('modal-search-input');
  const searchTriggers = document.querySelectorAll('.trigger-search');
  const closeSearchBtn = document.getElementById('close-search-modal');
  const searchResultsContainer = document.getElementById('search-results');

  const searchableData = [
    { title: 'Binary Search Notes', category: 'Data Structures', type: 'Topic', view: 'dashboard' },
    { title: 'Python Classes and Objects', category: 'Python Programming', type: 'Topic', view: 'dashboard' },
    { title: 'MIPS Architecture', category: 'Computer Organization', type: 'Topic', view: 'dashboard' },
    { title: 'Boolean Algebra & Logic Gates', category: 'Digital Design', type: 'Topic', view: 'dashboard' },
    { title: 'Semester 1 - 6 Subjects', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Semester 2 - 6 Subjects', category: 'Semesters', type: 'Semester', view: 'semesters' },
    { title: 'Data Structures Question Bank', category: 'Question Bank', type: 'PDF', view: 'resources' },
    { title: 'Python Programming Notes', category: 'Notes', type: 'DOCX', view: 'resources' },
    { title: 'COA Lab Manual', category: 'Lab Manual', type: 'PDF', view: 'resources' },
    { title: 'VTU IA-1 Assessment Schedule', category: 'Announcements', type: 'Notice', view: 'announcements' },
    { title: 'Explain binary search with an example', category: 'Practice Question', type: '5 Marks', view: 'practice' },
    { title: 'Compare linear search and binary search', category: 'Practice Question', type: '5 Marks', view: 'practice' }
  ];

  function openModal() {
    if (!searchModal) return;
    searchModal.classList.remove('hidden');
    searchModal.classList.add('flex');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
      renderSearchResults('');
    }
  }

  function closeModal() {
    if (!searchModal) return;
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
  }

  // Keyboard Event Listener: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('hidden')) {
        openModal();
      } else {
        closeModal();
      }
    }
    if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  searchTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeModal);
  
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeModal();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.toLowerCase().trim());
    });
  }

  function renderSearchResults(query) {
    if (!searchResultsContainer) return;
    
    const filtered = searchableData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="py-8 text-center text-slate-500">
          <i class="lucide-search text-2xl mb-2 text-slate-400"></i>
          <p class="text-sm">No matching topics or resources found for "${query}"</p>
        </div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = filtered.map(item => `
      <div class="p-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 rounded-lg cursor-pointer transition-colors flex items-center justify-between group" data-jump-view="${item.view}">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
            ${item.type.charAt(0)}
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-800 group-hover:text-teal-700">${item.title}</div>
            <div class="text-xs text-slate-500">${item.category} • ${item.type}</div>
          </div>
        </div>
        <span class="text-xs text-slate-400 group-hover:text-teal-600 flex items-center gap-1 font-medium">
          Open <i class="lucide-chevron-right text-xs"></i>
        </span>
      </div>
    `).join('');

    // Attach click listeners to jump results
    searchResultsContainer.querySelectorAll('[data-jump-view]').forEach(elem => {
      elem.addEventListener('click', () => {
        const view = elem.getAttribute('data-jump-view');
        closeModal();
        const navBtn = document.querySelector(`[data-nav-target="${view}"]`);
        if (navBtn) navBtn.click();
      });
    });
  }
}

// 3. Today's Plan Interactive Checklist & Circular Chart
function setupTodayPlan() {
  const checkboxes = document.querySelectorAll('.plan-checkbox');
  const counterElem = document.getElementById('tasks-count-display');
  const progressCircle = document.getElementById('progress-ring-circle');

  if (!checkboxes.length) return;

  function updatePlanProgress() {
    const total = checkboxes.length;
    let completed = 0;

    checkboxes.forEach(cb => {
      const label = cb.closest('label');
      if (cb.checked) {
        completed++;
        if (label) {
          label.classList.add('text-slate-400', 'line-through');
          label.classList.remove('text-slate-700');
        }
      } else {
        if (label) {
          label.classList.remove('text-slate-400', 'line-through');
          label.classList.add('text-slate-700');
        }
      }
    });

    if (counterElem) {
      counterElem.innerText = `${completed}/${total}`;
    }

    if (progressCircle) {
      // Circumference = 2 * PI * r = 2 * 3.14159 * 42 ≈ 263.89
      const radius = 42;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (completed / total) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updatePlanProgress();
      showToast(cb.checked ? 'Task marked as completed!' : 'Task updated');
    });
  });

  updatePlanProgress();
}

// 4. Resource Filtering System
function setupResourceFilters() {
  const filterBtns = document.querySelectorAll('.resource-filter-btn');
  const resourceItems = document.querySelectorAll('.resource-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-teal-700', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
      });

      btn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
      btn.classList.add('bg-teal-700', 'text-white');

      resourceItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// 5. AI Assistant Interactive Chat simulator
function setupAIChat() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat-btn');

  if (!chatMessages || !chatInput || !sendBtn) return;

  const aiKnowledge = {
    'binary search': 'Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you have narrowed the possible locations to just one. Time Complexity: O(log N).',
    'python': 'Python is a high-level, interpreted programming language known for readable syntax. Key features include dynamic typing, automatic memory management, and rich built-in data structures (lists, tuples, dicts, sets).',
    'mips': 'MIPS (Microprocessor without Interlocked Pipelined Stages) is a RISC architecture. It uses 32-bit fixed length instructions, 32 general-purpose registers, and a 5-stage pipeline (IF, ID, EX, MEM, WB).',
    'default': 'Great question! In NotesVault, you can review topic summaries, solve practice questions, or download detailed PDF notes from your Semesters menu.'
  };

  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    const userBubble = document.createElement('div');
    userBubble.className = 'flex justify-end mb-4';
    userBubble.innerHTML = `
      <div class="bg-teal-700 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-md text-sm shadow-sm">
        ${escapeHTML(text)}
      </div>
    `;
    chatMessages.appendChild(userBubble);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI Response
    setTimeout(() => {
      let replyText = aiKnowledge['default'];
      const lower = text.toLowerCase();
      if (lower.includes('binary search')) replyText = aiKnowledge['binary search'];
      else if (lower.includes('python')) replyText = aiKnowledge['python'];
      else if (lower.includes('mips') || lower.includes('architecture')) replyText = aiKnowledge['mips'];

      const aiBubble = document.createElement('div');
      aiBubble.className = 'flex items-start gap-3 mb-4';
      aiBubble.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
          AI
        </div>
        <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-md text-sm border border-slate-200">
          ${replyText}
        </div>
      `;
      chatMessages.appendChild(aiBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
  }

  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}

// 6. Toast Notification Helper
function setupToasts() {
  window.showToast = function(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50 transition-opacity duration-300 opacity-0';
    toast.innerHTML = `
      <i class="lucide-check-circle text-teal-400 text-base"></i>
      <span>${escapeHTML(message)}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.remove('opacity-0'), 10);
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Attach generic click triggers for action buttons
  document.addEventListener('click', (e) => {
    const downloadBtn = e.target.closest('[data-action="download"]');
    if (downloadBtn) {
      e.preventDefault();
      showToast('Downloading study file to your device...');
    }

    const bookmarkBtn = e.target.closest('[data-action="bookmark"]');
    if (bookmarkBtn) {
      e.preventDefault();
      showToast('Resource added to your saved bookmarks!');
    }

    const startBtn = e.target.closest('[data-action="start-practice"]');
    if (startBtn) {
      e.preventDefault();
      showToast('Starting practice session...');
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
