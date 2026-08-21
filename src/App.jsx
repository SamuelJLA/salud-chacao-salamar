import React, { useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { UnitSwitch } from './components/UnitSwitch';
import { CategoryFilter } from './components/CategoryFilter';
import { ServiceRow } from './components/ServiceRow';
import { useMedicalSearch } from './hooks/useMedicalSearch';
import { SearchX, FolderHeart } from 'lucide-react';

export default function App() {
  const {
    activeUnit,
    setActiveUnit,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availableCategories,
    services,
    totalResults,
  } = useMedicalSearch();

  // Agrupar servicios filtrados por su Categoría / Bloque
  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      const groupName = service.category || 'Otros Servicios';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(service);
      return acc;
    }, {});
  }, [services]);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans text-slate-900 bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: "url('/bg-lab.jpg')" }}
    >
      {/* Capa de superposición para suavizar el contraste y garantizar legibilidad */}
      <div className="absolute inset-0 bg-slate-100/60 backdrop-blur-[2px] z-0" />

      {/* Contenido de la Aplicación */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-5 space-y-4">
          {/* Banner de Bienvenida */}
          <div className="text-center space-y-1 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Portal de Atención e Información
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              ¿En qué te podemos ayudar hoy? Escribe tu examen o selecciona una categoría.
            </p>
          </div>

          {/* Switch Principal de Marcas */}
          <UnitSwitch activeUnit={activeUnit} setActiveUnit={setActiveUnit} />

          {/* Buscador Global */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Filtros de Categoría */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            availableCategories={availableCategories}
          />

          {/* Contador de resultados */}
          <div className="flex items-center justify-between text-xs text-slate-700 px-1 pt-1 font-bold">
            <span>
              {totalResults} {totalResults === 1 ? 'servicio encontrado' : 'servicios encontrados'}
            </span>
          </div>

          {/* Listado Agrupado Estilo Tabla Excel con Efecto Cristal */}
          {totalResults > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedServices).map(([categoryName, items]) => (
                <div
                  key={categoryName}
                  className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  {/* Encabezado del Grupo */}
                  <div className="bg-slate-100/90 border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FolderHeart className="w-4 h-4 text-chacao-700" />
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                        {categoryName}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      {items.length}
                    </span>
                  </div>

                  {/* Filas de Servicios */}
                  <div className="divide-y divide-slate-100">
                    {items.map((service) => (
                      <ServiceRow key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Estado Vacío */
            <div className="text-center py-12 px-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md">
              <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No encontramos servicios</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Prueba buscando con otro término o limpia los filtros seleccionados.
              </p>
            </div>
          )}
        </main>

        <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-200/80 bg-white/90 backdrop-blur-md mt-6">
          © {new Date().getFullYear()} Laboratorio Chacao & Centro Diagnóstico Salamar
        </footer>
      </div>
    </div>
  );
}