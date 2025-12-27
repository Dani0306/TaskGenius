"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateProjectIdea = async (prompt: string) => {
  const { error, output_text } = await client.responses.create({
    model: "gpt-5-mini",
    input: prompt,
  });

  if (error) throw new Error(error.message);
  return output_text;
};

// {
//   "title": "4-Week Home Workout Habit",
//   "description": "Build a daily 4-week home exercise habit focused on strength, flexibility, and overall well-being using simple bodyweight routines—no gym needed.",
//   "category": "fitness",
//   "timeframe": "1 Month",
//   "goal": "Build a 4-week habit of daily exercise to improve strength, flexibility, and overall well-being — without needing a gym.",
//   "tasks": [
//     {
//       "title": "Write a simple 4-week plan & schedule",
//       "description": "Decide daily time (15–30 min), weekly focus (strength/mobility/cardio), and a habit cue (same time/place).",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-03"
//     },
//     {
//       "title": "Prepare workout space and minimal gear",
//       "description": "Clear 2x2m space, get a mat, water, and optional resistance band; set phone timer.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-03"
//     },
//     {
//       "title": "Learn a 5–10 min warm-up and cool-down",
//       "description": "Pick 4 warm-up moves and 4 stretches to use each day; watch quick demo videos if needed.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-03"
//     },
//     {
//       "title": "Day 1: 20 min bodyweight strength + stretch",
//       "description": "Complete 3 rounds: squats, push-ups/incline, Plank 30s, glute bridges; finish with 5 min stretching.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-03"
//     },
//     {
//       "title": "Day 2: 20 min mobility + light cardio",
//       "description": "10 min dynamic mobility flow, 10 min brisk walk or marching in place; finish with stretches.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-04"
//     },
//     {
//       "title": "Day 3: 25 min upper-body & core",
//       "description": "3 rounds of incline/regular push-ups, rows (band or horizontal), side planks; 5 min cool-down.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-05"
//     },
//     {
//       "title": "Day 4: 25 min lower-body focus",
//       "description": "Lunges, single-leg glute bridges, calf raises, bodyweight squats; include balance work and stretch.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-06"
//     },
//     {
//       "title": "Day 5: 20 min full-body circuit",
//       "description": "AMRAP-style: 5 exercises x 40s work/20s rest for 3 rounds (modify intensity as needed).",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-07"
//     },
//     {
//       "title": "Day 6: 20 min yoga-style flexibility session",
//       "description": "Follow a short mobility/yoga flow focusing on hips, hamstrings, shoulders and spine.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-08"
//     },
//     {
//       "title": "Day 7: 20–30 min endurance & review week 1",
//       "description": "Do a steady cardio session (walk/jog/skip) then journal what worked and adjust plan.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-09"
//     },
//     {
//       "title": "Day 8: 20 min strength (slightly increase reps)",
//       "description": "Repeat a Day 1-style strength session, add 1–2 reps/sets if comfortable.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-10"
//     },
//     {
//       "title": "Day 9: 20 min mobility + light cardio",
//       "description": "Mobility flow and 10 min cardio; focus on technique and breathing.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-11"
//     },
//     {
//       "title": "Day 10: 25 min upper-body & core (progress)",
//       "description": "Add difficulty (decline/incline variations or longer planks); track improvements.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-12"
//     },
//     {
//       "title": "Day 11: 25 min lower-body strength",
//       "description": "Increase time under tension: slow reps, pauses at bottom, single-leg focus.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-13"
//     },
//     {
//       "title": "Day 12: 20 min full-body HIIT (moderate)",
//       "description": "6–8 intervals of 30s work/30s rest with bodyweight moves; cool down 5 min.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-14"
//     },
//     {
//       "title": "Day 13: 20 min restorative mobility & breathing",
//       "description": "Gentle flow and diaphragmatic breathing to recover and reduce soreness.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-15"
//     },
//     {
//       "title": "Day 14: 25 min mixed session + week 2 review",
//       "description": "Mixed strength/cardio session; reflect on consistency and tweak schedule if needed.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-16"
//     },
//     {
//       "title": "Day 15: 25 min progressive strength",
//       "description": "Choose compound bodyweight moves and increase difficulty slightly (tempo or reps).",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-17"
//     },
//     {
//       "title": "Day 16: 20 min mobility + band work",
//       "description": "Use resistance band for pulls/rows and combine with mobility drills.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-18"
//     },
//     {
//       "title": "Day 17: 25 min core focus",
//       "description": "Planks, dead bugs, leg raises, and rotational moves; finish with lower-back stretch.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-19"
//     },
//     {
//       "title": "Day 18: 25 min plyometrics or low-impact cardio",
//       "description": "Include jump variations or low-impact alternatives for cardio and power.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-20"
//     },
//     {
//       "title": "Day 19: 20 min lower-body endurance",
//       "description": "Higher-rep lunges, squats and step-ups to build stamina; cool down thoroughly.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-21"
//     },
//     {
//       "title": "Day 20: 20 min mobility + active recovery",
//       "description": "Slow mobility flow, foam rolling or self-massage, and breathing work.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-22"
//     },
//     {
//       "title": "Day 21: 30 min mixed challenge + week 3 review",
//       "description": "Longer session mixing strength and cardio; assess progress and adjust the final week.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-23"
//     },
//     {
//       "title": "Day 22: 25 min strength with improved form",
//       "description": "Prioritize perfect technique; reduce reps if needed to maintain form.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-24"
//     },
//     {
//       "title": "Day 23: 20 min flexibility & breath work",
//       "description": "Extended stretching routine with 10 min focused breathing for recovery.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-25"
//     },
//     {
//       "title": "Day 24: 25 min cardio mix",
//       "description": "Choose intervals, steady-state, or low-impact cardio to maintain heart fitness.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-26"
//     },
//     {
//       "title": "Day 25: 25 min total-body strength",
//       "description": "Combine upper, lower, and core moves; track reps/sets to see improvements.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-27"
//     },
//     {
//       "title": "Day 26: 20 min mobility + balance work",
//       "description": "Single-leg balance, hip mobility and stability exercises to prevent injury.",
//       "status": "todo",
//       "priority": "medium",
//       "due_date": "2025-12-28"
//     },
//     {
//       "title": "Day 27: 20–30 min moderate HIIT or steady cardio",
//       "description": "Choose intensity you can sustain; focus on maintaining habit and energy.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-29"
//     },
//     {
//       "title": "Day 28: Final 30 min mixed session + week 4 review",
//       "description": "Complete a longer mixed session; reflect on 4-week habit, record gains and plan next steps.",
//       "status": "todo",
//       "priority": "urgent",
//       "due_date": "2025-12-30"
//     },
//     {
//       "title": "Celebrate completion & set ongoing plan",
//       "description": "Write a short summary of wins, set a sustainable weekly plan to continue the habit.",
//       "status": "todo",
//       "priority": "high",
//       "due_date": "2025-12-30"
//     }
//   ]
// }
