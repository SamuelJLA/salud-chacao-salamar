import React from 'react';
import { MessageCircle, Clock, Info } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export const ServiceRow = ({ service }) => {
  const isChacao = service.provider === 'chacao';
  const whatsappUrl = createWhatsAppLink(
    service.name,
    service.providerLabel,
    service.phone
  );

  return (
    <div className="bg-white hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Información del Servicio */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          {/* Badge Prestador */}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border ${
              isChacao
                ? 'bg-blue-50 text-chacao-700 border-blue-200'
                : 'bg-teal-50 text-salamar-700 border-teal-200'
            }`}
          >
            {service.providerLabel}
          </span>

          {/* Código interno */}
          {service.code && (
            <span className="text-[10px] text-slate-400 font-mono">
              Cód: {service.code}
            </span>
          )}

          {/* Días de Entrega */}
          {service.turnaroundDays !== null && service.turnaroundDays !== undefined && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              <Clock className="w-3 h-3 shrink-0" />
              {service.turnaroundDays === 0 ? 'Mismo día' : `${service.turnaroundDays}d hábil`}
            </span>
          )}
        </div>

        {/* Nombre del Examen / Estudio */}
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {service.name}
        </h4>

        {/* Requisitos / Preparación */}
        {service.requirements && (
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{service.requirements}</span>
          </p>
        )}
      </div>

      {/* Botón CTA a WhatsApp Compacto */}
      <div className="shrink-0 pt-1 sm:pt-0">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Cotizar</span>
        </a>
      </div>
    </div>
  );
};