export const createWhatsAppLink = (serviceName, providerLabel, phone) => {
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '584141742148';
  const text = encodeURIComponent(
    `Hola, quisiera cotizar y consultar disponibilidad para el siguiente servicio:\n\n📌 *${serviceName}*\n🏢 *${providerLabel}*\n\n¿Me podrían brindar información sobre costos y requisitos? ¡Muchas gracias!`
  );

  return `https://wa.me/${cleanPhone}?text=${text}`;
};