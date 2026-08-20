import React from 'react';
import { TestTube, Stethoscope, LayoutGrid } from 'lucide-react';

export const UnitSwitch = ({ activeUnit, setActiveUnit }) => {
  const options = [
    { id: 'all', label: 'Todos', icon: LayoutGrid },
    { id: 'laboratorio', label: 'Laboratorio Chacao', icon: TestTube },
    { id: 'clinica', label: 'Clínica Salamar', icon: Stethoscope },
  ];

  return (
    <div className="flex bg-slate-200/80 p-1 rounded-2xl w-full">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = activeUnit === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setActiveUnit(opt.id)}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              isActive
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};