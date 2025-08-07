
import { shifts } from "../../prisma/seed/shifts";
import { workplaces } from "../../prisma/seed/workplaces";

// Count how many shifts per workplace ID
const shiftCounts: Record<number, number> = {};

for (const shift of shifts) {
  const workplaceId = shift.workplace?.connect.id;
  if (workplaceId !== undefined) {
    shiftCounts[workplaceId] = (shiftCounts[workplaceId] || 0) + 1;
  }
}

// Merge workplace name with shift counts
const rankedWorkplaces = workplaces.map((workplace, index) => {
  const id = index + 1; // assuming order = ID
  return {
    id,
    name: workplace.name,
    shiftCount: shiftCounts[id] || 0,
  };
});

// Sort by most shifts
rankedWorkplaces.sort((a, b) => b.shiftCount - a.shiftCount);

// Print top 5
console.log("🏆 Top 5 Most Active Workplaces:\n");
rankedWorkplaces.slice(0, 5).forEach((wp, i) => {
  console.log(`${i + 1}. ${wp.name} — ${wp.shiftCount} shifts`);
});

