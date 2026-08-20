export const createWhatsAppLink = (serviceName, providerLabel, phone) => {
  const message = `Hola, quisiera solicitar información y cotización para el examen/servicio: *${serviceName}* (${providerLabel}).`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};