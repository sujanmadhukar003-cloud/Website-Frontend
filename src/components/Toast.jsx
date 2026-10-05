import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50 animate-fadeIn">
      <Check className="w-4 h-4 text-teal-400" />
      <span>{message}</span>
    </div>
  );
}
