/*
 * Categories of wheel 3 ("Category").
 *
 * Edit labels and explanations here – nothing else needs to change. Rules:
 *  - Exactly 6 entries, drawn CLOCKWISE; the first one sits at the top.
 *  - "label" appears on the wheel and in the final storytelling mission;
 *    "expl" is the question shown beneath the mission.
 *  - The entry with label "?" is special: it lets the storyteller pick one
 *    of the other categories themselves (its expl is not shown in that flow).
 */

const CATEGORIES = [
  {label: "First",  expl: "What was a “first” moment in this context for you?"},
  {label: "Last",   expl: "What was a “last” moment in this context for you – the most recent time?"},
  {label: "Best",   expl: "What was a great moment in this context for you?"},
  {label: "Worst",  expl: "What was a tough moment in this context for you?"},
  {label: "Advise", expl: "What advice would you give on this topic?"},
  {label: "?",      expl: "Your choice – tell whatever comes to mind about this topic."}
];
