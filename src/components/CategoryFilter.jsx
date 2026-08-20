import React from 'react';

export const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  availableCategories = [],
}) => {
  // Si no hay categorías (como en la pestaña "Todos"), no renderiza nada
  if (!availableCategories || availableCategories.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex space-x-2 min-w-max px-0.5">
        {availableCategories.map((cat) => {
          const isAll = cat === 'all';
          const label = isAll ? '✨ Todos los grupos' : cat;
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-chacao-900 text-white shadow-md shadow-chacao-900/10 scale-[1.02]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};