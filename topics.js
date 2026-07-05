/*
 * Topics of the big wheel ("Direction").
 *
 * Edit the words here – nothing else needs to change. Rules:
 *  - All four lists run CLOCKWISE, starting at 12 o'clock.
 *  - The counts must stay exactly 32 / 16 / 8 / 4, because the rings nest:
 *    every green topic covers 2 blue ones, every gold topic covers 2 green
 *    ones, every red topic covers 2 gold ones.
 *    Example: blue #1+#2 belong to green #1; green #1+#2 belong to gold #1.
 *  - Long words are fine – the font size shrinks automatically to fit.
 */

/* Outer ring – 32 topics (blue) */
const RING_BLUE = [
  "Respect", "Bug", "Autonomy", "Courage",
  "Challenge", "Happiness", "Home Office", "Beginnings",
  "Play", "Commitment", "Carreer", "Balance",
  "Dogma", "Failure", "Requirement", "Effort",
  "Estimation", "Fear", "Doubt", "Communication",
  "Debt", "Mastery", "Passion", "Learning",
  "Focus", "Shame", "Sprint", "Retrospective",
  "Meeting", "Planning", "Delivering", "Transparency"
];

/* Second ring – 16 topics (green) */
const RING_GREEN = [
  "Conflict", "Growing", "Profit", "Vision",
  "Strategy", "Salary", "Society", "Economy",
  "Pandemic", "HR", "Scrum", "Mindset",
  "Motivation", "Frustration", "Quality", "Trust"
];

/* Third ring – 8 topics (gold) */
const RING_GOLD = [
  "Leader", "Manager", "Team", "Scrum Master",
  "Mentor", "User", "Product Owner", "Tester"
];

/* Inner ring – 4 topics (red) */
const RING_RED = [
  "People", "Process", "Product", "Purpose"
];
