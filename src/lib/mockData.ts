// Turf, match, and tournament data only — no hardcoded player profile

const TIMES = ["06:00", "07:00", "08:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const buildSlots = (taken: string[]) =>
  TIMES.map((time) => ({ time, available: !taken.includes(time) }));

export const nearbyTurfs = [
  { id: "t1", name: "Kickoff Arena", area: "Bandra West", price: 1200, rating: 4.8, x: 28, y: 32, image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop", slots: buildSlots(["07:00", "17:00", "20:00"]) },
  { id: "t2", name: "The Box Powai", area: "Powai", price: 900, rating: 4.6, x: 68, y: 22, image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop", slots: buildSlots(["06:00", "08:00", "16:00", "18:00", "19:00", "21:00", "22:00"]) },
  { id: "t3", name: "Turf 11", area: "Andheri East", price: 1500, rating: 4.9, x: 45, y: 62, image: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=600&h=400&fit=crop", slots: buildSlots(["20:00"]) },
];

export const upcomingMatches = [
  { id: "u1", title: "Sunday League — Matchday 7", time: "Sun 6:00 PM", venue: "Kickoff Arena", teams: "Coastal FC vs Eastside United" },
  { id: "u2", title: "Friendly", time: "Tue 8:30 PM", venue: "The Box Powai", teams: "Coastal FC vs Powai Strikers" },
];

export const activeTournaments = [
  { id: "tr1", name: "Mumbai Monsoon Cup", format: "7-a-side", teams: 16, prize: "₹50,000", status: "Group Stage" },
  { id: "tr2", name: "Coastal Champions League", format: "5-a-side", teams: 12, prize: "₹25,000", status: "Quarter Finals" },
  { id: "tr3", name: "Bandra Premier", format: "11-a-side", teams: 8, prize: "₹1,00,000", status: "Registration" },
];