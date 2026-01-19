export type ChatTheme = {
  id: string;
  name: string;
  userMessage: {
    background: string;
    text: string;
  };
  assistantMessage: {
    background: string;
    text: string;
  };
};

export const chatThemes: ChatTheme[] = [
  {
    id: "default",
    name: "Default",
    userMessage: {
      background: "bg-primary",
      text: "text-primary-foreground",
    },
    assistantMessage: {
      background: "bg-muted",
      text: "text-foreground",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    userMessage: {
      background: "bg-blue-600",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-blue-50 dark:bg-blue-950",
      text: "text-blue-900 dark:text-blue-100",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    userMessage: {
      background: "bg-orange-500",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-orange-50 dark:bg-orange-950",
      text: "text-orange-900 dark:text-orange-100",
    },
  },
  {
    id: "forest",
    name: "Forest",
    userMessage: {
      background: "bg-green-600",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-green-50 dark:bg-green-950",
      text: "text-green-900 dark:text-green-100",
    },
  },
  {
    id: "lavender",
    name: "Lavender",
    userMessage: {
      background: "bg-purple-600",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-purple-50 dark:bg-purple-950",
      text: "text-purple-900 dark:text-purple-100",
    },
  },
  {
    id: "rose",
    name: "Rose",
    userMessage: {
      background: "bg-pink-600",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-pink-50 dark:bg-pink-950",
      text: "text-pink-900 dark:text-pink-100",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    userMessage: {
      background: "bg-gray-800 dark:bg-gray-200",
      text: "text-white dark:text-gray-900",
    },
    assistantMessage: {
      background: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-900 dark:text-gray-100",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    userMessage: {
      background: "bg-indigo-700",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-slate-800",
      text: "text-slate-100",
    },
  },
  {
    id: "coral",
    name: "Coral",
    userMessage: {
      background: "bg-red-500",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-red-50 dark:bg-red-950",
      text: "text-red-900 dark:text-red-100",
    },
  },
  {
    id: "mint",
    name: "Mint",
    userMessage: {
      background: "bg-teal-600",
      text: "text-white",
    },
    assistantMessage: {
      background: "bg-teal-50 dark:bg-teal-950",
      text: "text-teal-900 dark:text-teal-100",
    },
  },
];