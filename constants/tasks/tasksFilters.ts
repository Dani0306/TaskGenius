export const TASK_FILTERS = [
  {
    label: "Status",
    value: "status",
    options: [
      { label: "To Do", option: "todo" },
      { label: "In Progress", option: "in_progress" },
      { label: "Completed", option: "done" },
    ],
  },
  {
    label: "Priority",
    value: "priority",
    options: [
      { label: "Low", option: "low" },
      { label: "Medium", option: "medium" },
      { label: "High", option: "high" },
      { label: "Urgent", option: "urgent" },
    ],
  },
  {
    label: "Due Date",
    value: "dueDate",
    options: [
      { label: "Overdue", option: "overdue" },
      { label: "Today", option: "today" },
      { label: "Tomorrow", option: "tomorrow" },
      { label: "This Week", option: "this_week" },
      { label: "Next Week", option: "next_week" },
      { label: "This Month", option: "this_month" },
      { label: "Next Month", option: "next_month" },
      { label: "Future", option: "future" },
    ],
  },
  {
    label: "Assigned",
    value: "assigned",
    options: [
      { label: "Unassigned", option: "unassigned" },
      { label: "Assigned to Me", option: "me" },
      // Later you can dynamically append:
      // { label: member.name, option: member.user_id }
    ],
  },
];

export const TASK_FILTER_LABELS: Record<string, string> = {
  // Status
  todo: "To Do",
  in_progress: "In Progress",
  done: "Completed",

  // Priority
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",

  // Due Date
  overdue: "Overdue",
  today: "Today",
  tomorrow: "Tomorrow",
  this_week: "This Week",
  next_week: "Next Week",
  this_month: "This Month",
  next_month: "Next Month",
  future: "Future",

  // Assigned
  unassigned: "Unassigned",
  me: "Assigned to Me",
};

export const TASK_FILTER_LABELS_TYPES: Record<string, string> = {
  status: "Status",
  priority: "Priority",
  dueDate: "Due",
  assigned: "Assigned to",
};
