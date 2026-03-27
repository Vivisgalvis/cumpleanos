// Textos especiales para invitados perrunos
export interface DogTexts {
  // HeroSection
  invitationMessage: string;
  quote: string;
  
  // CountdownSection
  whenTitle: string;
  timeLabels: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  daysLeft: string;
  note: string;
  saveTheDate: string;
  dateLabel: string;
  
  // ConsiderationsSection
  considerationsTitle: string;
  considerationsSubtitle: string;
  considerations: {
    dressCode: {
      title: string;
      description: string;
    };
    timing: {
      title: string;
      description: string;
    };
    gifts: {
      title: string;
      description: string;
    };
    noChildren: {
      title: string;
      description: string;
    };
    rsvp: {
      title: string;
      description: string;
    };
  };
  
  // LocationSection
  locationTitle: string;
  locationSubtitle: string;
  locationName: string;
  locationDate: string;
  copyButton: string;
  copiedButton: string;
  googleMapsButton: string;
  wazeButton: string;
  address: string;
  fallbackText: string;
  
  // StorySection (si existe)
  storyTitle?: string;
  storySubtitle?: string;
  
  // DressCodeSection
  dressCodeTitle?: string;
  dressCodeSubtitle?: string;
  dressCodeDescription?: string;
  womenDressCodeTitle?: string;
  womenDressCodeDescription?: string;
  dressCodeNote?: string;
}

export const dogTexts: DogTexts = {
  // HeroSection
  invitationMessage: "¡Guau guau!",
  quote: "(Humano, acompaña a tu peludito 🐕)",
  
  // CountdownSection
  whenTitle: "¿Guau guau?",
  timeLabels: {
    hours: "Guaus",
    minutes: "Wofs", 
    seconds: "Aus"
  },
  daysLeft: "¡Guau guau",
  note: "¡Wof wof wof! 🐾",
  saveTheDate: "¡Au au au wof! 🐕",
  dateLabel: "¡Wof wof, 14 ¡guau! 2026, 15:00",
  
  // ConsiderationsSection
  considerationsTitle: "¡Guau guau guau!",
  considerationsSubtitle: "¡Wof wof! 🐕",
  considerations: {
    dressCode: {
      title: "¡Wof wof!",
      description: "¡**Guau guau**! ✨ ¡Au au au! 💕"
    },
    timing: {
      title: "¡Guau guau!",
      description: "¡**Wof wof**! 🌙"
    },
    gifts: {
      title: "¡Au au!",
      description: "**¡Guau!**, ¡wof wof wof! 💌"
    },
    noChildren: {
      title: "¡Wof guau guau!",
      description: "**¡Wof wof!** ¡Au au! 🥂"
    },
    rsvp: {
      title: "¡Guau wof!",
      description: "**¡Wof wof!** ¡guau guau! 😄"
    }
  },
  
  // LocationSection
  locationTitle: "¿Guau wof?",
  locationSubtitle: "¡Wof wof wof! 🐾",
  locationName: "¡Guau Wof Wof!",
  locationDate: "¡Wof wof! 14 ¡guau! 2026 · 15:00 ¡au au!",
  copyButton: "¡Wof!",
  copiedButton: "¡Guau!",
  googleMapsButton: "¡Au au Google!",
  wazeButton: "¡Wof Waze!",
  address: "¡Guau Wof, Wof Wof, Guau Guau!",
  fallbackText: "¡Wof wof wof!",
  
  // DressCodeSection
  dressCodeTitle: "¡Wof wof guau!",
  dressCodeSubtitle: "¡Au au au! 🐕",
  dressCodeDescription: "¡**Guau guau**! ¡Wof wof wof! ¡Au au! **¡Guau!** ¡wof wof wof! ✨",
  womenDressCodeTitle: "¡Au au!",
  womenDressCodeDescription: "¡Guau wof! ¡Au au! ¡Wof wof guau!",
  dressCodeNote: "💡 ¡Guau guau! ¡**Wof wof**! ¡Au au au wof wof! 🐾"
};

// Función para obtener textos según si es perro o no
export function getTexts(isDog: boolean = false): DogTexts | null {
  return isDog ? dogTexts : null;
}
