# Chat Theme Feature

## Overview

A new chat theme feature has been added that allows users to change the color scheme of chat messages. The implementation includes 10 different color themes to choose from.

## Features

- **10 Pre-defined Themes**:
  - Default (system colors)
  - Ocean (blue theme)
  - Sunset (orange theme)
  - Forest (green theme)
  - Lavender (purple theme)
  - Rose (pink theme)
  - Minimal (gray theme)
  - Midnight (dark indigo theme)
  - Coral (red theme)
  - Mint (teal theme)

- **Theme Persistence**: The selected theme is saved to localStorage and persists across sessions

- **Dark Mode Support**: All themes are designed to work seamlessly in both light and dark modes

## How to Use

1. Click on your user avatar in the sidebar to open the user menu
2. Select "Chat Theme" from the dropdown
3. Choose your preferred theme from the submenu
4. The chat messages will instantly update to reflect the new color scheme

## Implementation Details

### Files Added/Modified:

#### New Files:
- `/lib/chat-themes.ts` - Theme configurations and types
- `/context/chat-theme.tsx` - React context for theme state management
- `/components/chat-theme-selector.tsx` - Theme selector UI component

#### Modified Files:
- `/app/layout.tsx` - Added ChatThemeProvider to wrap the app
- `/components/messages.tsx` - Updated to use dynamic theme colors
- `/components/nav-user.tsx` - Added theme selector to user menu

### Technical Implementation:

1. **Theme Configuration** (`/lib/chat-themes.ts`):
   - Defines the `ChatTheme` type with color settings for user and assistant messages
   - Contains an array of 10 pre-configured themes

2. **Theme Context** (`/context/chat-theme.tsx`):
   - Provides global theme state management
   - Handles localStorage persistence
   - Exposes `currentTheme` and `setTheme` functions

3. **Theme Application** (`/components/messages.tsx`):
   - Dynamically applies theme colors to message bubbles
   - User messages use `currentTheme.userMessage` colors
   - Assistant messages use `currentTheme.assistantMessage` colors

4. **Theme Selection** (`/components/chat-theme-selector.tsx`):
   - Dropdown menu component for theme selection
   - Shows current selection with a check mark
   - Integrates seamlessly with the sidebar user menu

## Color Classes Used

All themes use Tailwind CSS color classes:
- Standard colors: `bg-blue-600`, `text-white`, etc.
- Dark mode variants: `dark:bg-blue-950`, `dark:text-blue-100`
- System colors: `bg-primary`, `text-primary-foreground`, `bg-muted`

## Testing

To test the feature:
1. Open the application in development mode (`bun run dev`)
2. Navigate to a chat conversation
3. Open the user menu in the sidebar
4. Select "Chat Theme" and try different themes
5. Verify that:
   - Colors change immediately
   - Theme persists after page refresh
   - Both light and dark modes work correctly

## Future Enhancements

Possible future improvements could include:
- Custom color picker for creating personalized themes
- More theme presets
- Theme import/export functionality
- Per-conversation theme settings