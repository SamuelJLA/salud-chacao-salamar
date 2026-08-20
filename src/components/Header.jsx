import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo alineado con altura real adecuada */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Grupo Clínico Chacao"
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};