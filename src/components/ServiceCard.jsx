import React from 'react';
import { MessageCircle, Clock, Info } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export const ServiceCard = ({ service }) => {
  const isChacao = service.provider === 'chacao';
  const whatsappUrl = createWhatsAppLink(
    service.name,
    service.providerLabel,
    service.phone
  );

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Cabecera: Marca y Código */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
              isChacao
                ? 'bg-blue-50 text-chacao-700 border-blue-200'
                : 'bg-teal-50 text-salamar-700 border-teal-200'
            }`}
          >
            {service.providerLabel}
          </span>
          {service.code && (
            <span className="text-[10px] text-slate-400 font-mono">
              Cód: {service.code}
            </span>
          )}
        </div>

        {/* Nombre del Servicio */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
          {service.name}
        </h3>

        {/* Categoría / Centro de Costo */}
        <p className="text-xs text-slate-500 font-medium mb-3">
          {service.category}
        </p>

        {/* Indicadores: Días de entrega (Laboratorio) o Requisitos */}
        <div className="space-y-1.5 mb-4">
          {service.turnaroundDays !== null && service.turnaroundDays !== undefined && (
            <div className="flex items-center space-x-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/80 w-fit">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Resultado en: <strong>{service.turnaroundDays} {service.turnaroundDays === 1 ? 'día hábil' : 'días hábiles'}</strong></span>
            </div>
          )}

          {service.requirements && (
            <div className="flex items-start space-x-1.5 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{service.requirements}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botón CTA a WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Cotizar por WhatsApp</span>
      </a>
    </div>
  );
};