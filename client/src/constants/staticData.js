// Shared static data for Events and Projects
// Update this file to automatically sync across HomePage, EventsPage, and ProjectsPage

export const STATIC_PROJECTS = [
  {
    _id: 'static-p1',
    title: "Baho Performing Arts",
    description: "Showcasing African performing arts through theater, dance, and music performances. This program provides a platform for local artists to showcase their talents and connect with audiences.",
    image: "/images/performing.jpeg",
    category: "Performing Arts",
    isStatic: true
  },
  {
    _id: 'static-p2',
    title: "Talent Gear Program",
    description: "A comprehensive talent development program for emerging artists and creatives. The program includes mentorship, skills training, and exhibition opportunities.",
    image: "/images/talentgear.jpeg",
    category: "Education",
    isStatic: true
  },
  {
    _id: 'static-p3',
    title: "Baho Events",
    description: "Organizing cultural events, festivals, and exhibitions to promote African arts and culture. These events provide networking opportunities and exposure for artists.",
    image: "/images/bahoevent.jpeg",
    category: "Cultural Events",
    isStatic: true
  },
  {
    _id: 'static-p4',
    title: "Heritage Preservation Initiative",
    description: "A program focused on documenting and preserving traditional African art forms, crafts, and cultural practices for future generations.",
    image: "/images/heritage.jpeg",
    category: "Heritage",
    isStatic: true
  },
  {
    _id: 'static-p5',
    title: "Creative Entrepreneurship Program",
    description: "Training and support for creative professionals to build sustainable businesses in the creative economy. Includes business development and marketing training.",
    image: "/images/ent.jpeg",
    category: "Entrepreneurship",
    isStatic: true
  },
  {
    _id: 'static-p6',
    title: "Inclusive Arts Project",
    description: "Specialized programs for artists with disabilities, refugees, and other marginalized communities, ensuring equal access to creative opportunities.",
    image: "/images/inclusion.jpeg",
    category: "Inclusion",
    isStatic: true
  }
];

export const STATIC_EVENTS = [
  {
    _id: 'static-e1',
    title: "HEROES DAY COMMEMORATION",
    description: "Join us for our biggest celebration of Heroes Day commemorations.",
    scope: { startDate: "2026-01-31" },
    time: "17:00",
    location: "IKORO RESORT",
    category: "Festival",
    image: "/images/heroes.jpeg",
    isStatic: true,
    featured: true
  },
  {
    _id: 'static-e2',
    title: "BAHO AFRICA CONNECT",
    description: "Join us for a night of music, dance, and cultural performances celebrating the rich heritage of Africa.",
    scope: { startDate: "Soon to be published" },
    time: "Soon to be published",
    location: "Musanze",
    category: "Festival",
    image: "/images/bahoafricaconnectnew.jpeg",
    isStatic: true,
    featured: true
  },
  {
    _id: 'static-e3',
    title: "BAHO FEST",
    description: "Join us for a festival of music, dance, and culture celebrating the rich heritage of Africa.",
    scope: { startDate: "Soon to be published" },
    time: "Soon to be published",
    location: "IKORO RESORT",
    category: "Festival",
    image: "/images/bahofest.jpeg",
    isStatic: true,
    featured: true
  },
];
