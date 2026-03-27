export interface WeddingEventConfig {
  weddingDateISO: string
}

// Edita esta fecha a la de tu boda. Usa formato ISO, incluyendo zona horaria si aplica.
// Ejemplo: 2025-12-20T16:00:00-05:00
export const weddingEventConfig: WeddingEventConfig = {
  weddingDateISO: '2026-03-14T15:00:00-05:00',
}

export function getWeddingDate(): Date {
  return new Date(weddingEventConfig.weddingDateISO)
}

export function getWeddingDateISO(): string {
  return weddingEventConfig.weddingDateISO
}


