export interface birthdayEventConfig {
  birthdayDateISO: string
}

// Edita esta fecha a la de tu boda. Usa formato ISO, incluyendo zona horaria si aplica.
// Ejemplo: 2025-12-20T16:00:00-05:00
export const birthdayEventConfig: birthdayEventConfig = {
  birthdayDateISO: '2026-04-18T18:00:00-05:00',
}

export function getbirthdayDate(): Date {
  return new Date(birthdayEventConfig.birthdayDateISO)
}

export function getbirthdayDateISO(): string {
  return birthdayEventConfig.birthdayDateISO
}


