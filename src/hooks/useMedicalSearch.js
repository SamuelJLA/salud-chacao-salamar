import { useState, useMemo, useEffect } from 'react';
import servicesData from '../data/services.json';

export const useMedicalSearch = () => {
  const [activeUnit, setActiveUnit] = useState('all'); // 'all' | 'laboratorio' | 'clinica'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Capturar '?unit=laboratorio' o '?unit=clinica' desde Linktree
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const unitParam = params.get('unit');
    if (unitParam && ['laboratorio', 'clinica'].includes(unitParam.toLowerCase())) {
      setActiveUnit(unitParam.toLowerCase());
    }
  }, []);

  // Al cambiar de unidad principal se resetean los subfiltros
  const handleUnitChange = (unit) => {
    setActiveUnit(unit);
    setSelectedCategory('all');
  };

  // Categorías dinámicas: vacío para "Todos", específicas para Laboratorio y Clínica
  const availableCategories = useMemo(() => {
    if (activeUnit === 'all') {
      return []; // En "Todos" ocultamos los chips de categorías
    }

    const filteredByUnit = servicesData.filter((item) => item.unit === activeUnit);
    const categoriesSet = new Set(filteredByUnit.map((item) => item.category));
    const sortedCategories = Array.from(categoriesSet).sort();

    return ['all', ...sortedCategories];
  }, [activeUnit]);

  // Lógica de filtrado unificada
  const filteredServices = useMemo(() => {
    return servicesData.filter((item) => {
      const matchesUnit = activeUnit === 'all' || item.unit === activeUnit;
      
      const matchesCategory =
        activeUnit === 'all' ||
        selectedCategory === 'all' ||
        item.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        (item.code && item.code.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query);

      return matchesUnit && matchesCategory && matchesQuery;
    });
  }, [activeUnit, selectedCategory, searchQuery]);

  return {
    activeUnit,
    setActiveUnit: handleUnitChange,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availableCategories,
    services: filteredServices,
    totalResults: filteredServices.length,
  };
};