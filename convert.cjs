const fs = require('fs');
const xlsx = require('xlsx');

// Helper para clasificar exámenes de laboratorio según su nombre
function getLabCategory(name) {
  const upper = name.toUpperCase();

  if (/PERFIL|HEMATOLOGIA|GLICEMIA|URICO|CREATININA|UREA|CHOLESTEROL|COLESTEROL|TRIGLICERIDO|ORINA|HECES|HEMOGLOBINA|SERIE ROJA|PLAQUETAS|TIEMPO DE PROTROMBINA|PTT|VSG/.test(upper)) {
    return '🧪 Laboratorio de Rutina';
  }
  if (/TSH|T3|T4|PROGESTERONA|ESTRADIOL|TESTOSTERONA|CORTISOL|INSULINA|HORMUNA|PROLACTINA|LH|FSH|SEROLOGIA|ANTICUERPO|HIV|HEPATITIS|IGG|IGM|COVID|INFLUENZA/.test(upper)) {
    return '🔬 Hormonas e Inmunología';
  }
  if (/PSA|CEA|CA-125|CA-19|ALFAFETOPROTEINA|CITOLOGIA|BIOPSIA|PATOLOGIA/.test(upper)) {
    return '🧬 Marcadores & Especializados';
  }
  return '🧪 Exámenes Generales';
}

// Helper para limpiar las categorías de Salamar
function getClinicCategory(costCenter, name) {
  const upperCost = (costCenter || '').toUpperCase();
  const upperName = (name || '').toUpperCase();

  if (upperCost.includes('RADIOLOGIA') || upperName.includes('RX') || upperName.includes('RAYOS X')) {
    return '🩻 Rayos X';
  }
  if (upperCost.includes('ECOGRAFIA') || upperName.includes('ECO')) {
    return '🔊 Ecografías';
  }
  if (upperCost.includes('ESTUDIOS') || upperName.includes('HOLTER') || upperName.includes('MAPA') || upperName.includes('ESPIROMETRIA') || upperName.includes('ELECTRO')) {
    return '🔬 Estudios Especializados';
  }
  
  // Para consultas médicas por especialidad
  if (costCenter) {
    const clean = costCenter.replace(/\d+/g, '').trim();
    return `🩺 ${clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()}`;
  }
  
  return '🩺 Consultas Médicas';
}

try {
  console.log('Procesando y agrupando archivos Excel...');

  // 1. Laboratorio Chacao
  const chacaoWorkbook = xlsx.readFile('chacao.xlsx');
  const chacaoSheet = chacaoWorkbook.Sheets[chacaoWorkbook.SheetNames[0]];
  const chacaoData = xlsx.utils.sheet_to_json(chacaoSheet, { header: 1 });

  const chacaoItems = [];
  for (let i = 10; i < chacaoData.length; i++) {
    const row = chacaoData[i];
    if (!row) continue;

    const code = row[2];
    const name = row[5];
    const days = row[13];

    if (name && String(name).trim() !== '' && String(name) !== 'Descripción del Examen') {
      const cleanName = String(name).trim();
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

      chacaoItems.push({
        id: `lab-${i}-${code ? String(code).trim() : chacaoItems.length}`,
        code: code ? String(Math.floor(code)) : '',
        name: formattedName,
        unit: 'laboratorio',
        category: getLabCategory(cleanName),
        provider: 'chacao',
        providerLabel: 'Laboratorio Clínico Chacao',
        turnaroundDays: days && !isNaN(days) ? Number(days) : 1,
        requirements: 'Ayuno de 8 a 12 horas (Muestra de Sangre)',
        phone: '584120000000'
      });
    }
  }

  // 2. Centro Diagnóstico Salamar
  const salamarWorkbook = xlsx.readFile('salamar.xls');
  const salamarSheet = salamarWorkbook.Sheets[salamarWorkbook.SheetNames[0]];
  const salamarData = xlsx.utils.sheet_to_json(salamarSheet, { header: 1 });

  const salamarItems = [];
  for (let i = 17; i < salamarData.length; i++) {
    const row = salamarData[i];
    if (!row) continue;

    const code = row[0];
    const name = row[1];
    const costCenter = row[3];

    if (name && String(name).trim() !== '' && String(name) !== 'Consultas' && String(code) !== 'Codigo') {
      const cleanName = String(name).trim();
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

      salamarItems.push({
        id: `cli-${i}-${code ? String(code).trim() : salamarItems.length}`,
        code: code ? String(code).trim() : '',
        name: formattedName,
        unit: 'clinica',
        category: getClinicCategory(costCenter, cleanName),
        provider: 'salamar',
        providerLabel: 'Centro Diagnóstico Salamar',
        turnaroundDays: null,
        requirements: 'Previa cita / Consultar preparación previa',
        phone: '584140000000'
      });
    }
  }

  const allServices = [...chacaoItems, ...salamarItems];

  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
  }

  fs.writeFileSync('src/data/services.json', JSON.stringify(allServices, null, 2), 'utf-8');

  console.log(`\n✅ ¡Éxito! Se generó src/data/services.json organizado con ${allServices.length} servicios.\n`);

} catch (error) {
  console.error('\n❌ Error procesando los archivos Excel:', error.message, '\n');
}