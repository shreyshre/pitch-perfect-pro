export const currentPlayer = {
  id: "p1",
  name: "Arjun Mehta",
  age: 24,
  city: "Mumbai",
  position: "Midfielder",
  rating: 8.4,
  goals: 47,
  assists: 32,
  matchesPlayed: 86,
  cleanSheets: 0,
  yellowCards: 4,
  redCards: 0,
  photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
  club: { name: "Coastal FC", badge: "🛡️" },
  bio: "Box-to-box midfielder. Left foot. Loves a long-range strike.",
};

export const recentMatches = [
  { id: "m1", opponent: "Eastside United", score: "3-2", result: "W", date: "May 5", rating: 8.7, goals: 1, assists: 1 },
  { id: "m2", opponent: "Marine Drive XI", score: "1-1", result: "D", date: "May 2", rating: 7.5, goals: 0, assists: 0 },
  { id: "m3", opponent: "Bandra Boys", score: "4-0", result: "W", date: "Apr 28", rating: 9.1, goals: 2, assists: 1 },
  { id: "m4", opponent: "Powai Strikers", score: "0-2", result: "L", date: "Apr 24", rating: 6.4, goals: 0, assists: 0 },
  { id: "m5", opponent: "Andheri All-Stars", score: "2-2", result: "D", date: "Apr 20", rating: 7.8, goals: 1, assists: 0 },
];

export const nearbyTurfs = [
  { id: "t1", name: "Kickoff Arena", area: "Bandra West", price: 1200, rating: 4.8, slots: 6, image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop" },
  { id: "t2", name: "The Box Powai", area: "Powai", price: 900, rating: 4.6, slots: 3, image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop" },
  { id: "t3", name: "Turf 11", area: "Andheri East", price: 1500, rating: 4.9, slots: 8, image: "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=600&h=400&fit=crop" },
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
