import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Contenedor flexible sin recortar bordes */}
        <div className="flex items-center h-14 sm:h-16">
          <img
            src="/logo.png"
            alt="Grupo Clínico Chacao"
            className="h-24 sm:h-32 w-auto max-w-none object-contain scale-125 origin-left"
          />
        </div>

        {/* Badge de Alianza */}
        <span className="text-[10px] sm:text-xs font-semibold bg-blue-50 text-chacao-700 px-3 py-1 rounded-full border border-blue-100 shrink-0">
          Atención Unificada
        </span>
      </div>
    </header>
  );
};