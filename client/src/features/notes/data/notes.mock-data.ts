import type { Note } from "../types/note.types";

const NOTESVAULT_PREVIEW_NOTE = `NotesVault Frontend Development Preview

NotesVault is a modern note-taking application designed to make writing, organizing, searching, and reading notes feel simple and focused.

This note is intentionally long so we can test how the editor behaves with realistic content. It can be used to review scrolling, typing performance, focus mode, saving, word count, reader mode, responsive layouts, and general typography.

Frontend Architecture

The frontend is organized around application features instead of placing every component in one large directory.

Major areas currently include authentication, dashboard, notes, note editor, folders, tags, search, settings, trash, notifications, and global search.

Shared layout and UI primitives remain outside individual feature folders so they can be reused without creating unnecessary dependencies.

Note Editor

The note editor is one of the most important parts of NotesVault.

It needs to support quick writing while also being capable of handling longer structured documents. The interface should remain calm even when formatting, search, command palette, images, tables, code blocks, and other advanced tools are available.

During normal typing, the application should avoid rerendering the entire editor page after every transaction.

The latest editor content is therefore kept close to the editor runtime while React state is reserved for UI state that actually needs to cause rerenders.

This helps keep typing responsive as notes become larger.

Saving Notes

Saving becomes more interesting when requests are asynchronous.

Imagine that a user clicks Save and immediately continues typing before the request finishes.

An older save request must not mark newer unsaved changes as saved.

NotesVault now tracks revisions so a save only changes the status to Saved when the document has not changed since that save began.

It also tracks save request identifiers so an older request cannot overwrite the result of a newer save request.

Search

NotesVault provides both quick global search and a dedicated search page.

Global search is useful for fast navigation. It can rank matches using titles, previews, folders, and tags.

The dedicated search page provides a larger workspace where users can inspect results, apply filters, and sort their notes.

Search calculations are memoized where appropriate so unrelated component updates do not repeatedly perform the same filtering and sorting work.

Reader Mode

Editing and reading are different experiences.

The editor needs controls, formatting actions, metadata, saving state, and document tools.

Reader mode should remove most of that visual complexity and make the document itself the primary focus.

The reader supports comfortable content widths, reading preferences, estimated reading time, reading progress, a compact header, and focus mode.

Scroll-sensitive reader features are scheduled with requestAnimationFrame so they do not perform expensive DOM measurements for every raw browser scroll event.

Reading Progress

Reading progress measures movement through the reader document rather than the entire application shell.

As the reader scrolls, the progress value moves gradually from zero toward one hundred percent.

This is especially useful for longer notes like this preview document because it gives the reader an immediate sense of how much content remains.

Responsive Navigation

Desktop navigation and mobile navigation behave differently.

On larger screens, the application has a persistent sidebar that can be collapsed or expanded.

On tablets and mobile devices, navigation becomes an overlay.

The mobile navigation trigger can open and close the drawer. The backdrop and close button can also dismiss it, and selecting a destination closes the drawer before navigation continues.

When the mobile sidebar is hidden, the inert attribute prevents its controls from remaining accessible through keyboard navigation.

Focus is restored to the navigation trigger when the user closes the drawer.

Accessibility

Accessibility is part of the component architecture rather than a final visual polish task.

Interactive controls should expose their state using semantic HTML and appropriate ARIA attributes.

Keyboard users need predictable navigation, visible focus indicators, correctly managed dialogs, and reliable focus restoration.

Toggle controls communicate pressed state. Menus communicate expanded state. Dialogs identify themselves as modal where appropriate.

Hidden interactive regions should not accidentally remain available to assistive technology or keyboard navigation.

Performance

Frontend performance work should target real hot paths instead of adding memoization everywhere.

NotesVault now lazy-loads major application routes.

Heavy editor functionality is isolated from the reader and other lightweight pages.

Optional editor UI such as document search, keyboard shortcuts, and the command palette is loaded only when needed.

The syntax-highlighting runtime is isolated to code functionality, and the slash-command popup library is dynamically imported.

This keeps the normal application routes substantially smaller than the full rich-editor route.

Editor Performance

The rich text editor intentionally disables automatic React rerendering for every Tiptap transaction.

Components that genuinely depend on changing editor state subscribe directly to the editor instead.

For example, word and character statistics use their own editor-state subscription.

Undo and redo controls track whether their actions are currently available.

Task-list controls independently track whether a task list is active and whether indent or outdent commands can run.

This allows small toolbar regions to update without forcing the complete editor page to rerender.

Theme System

NotesVault supports light, dark, and system theme preferences.

The stored preference and the resolved theme are treated separately.

For example, a user may choose System while the currently resolved theme is Dark.

If the operating system theme changes, NotesVault can update automatically.

The theme provider keeps its callbacks and context value stable so unrelated application updates do not create unnecessary context propagation.

Application Shell

The application shell owns layout-level state such as focus mode and responsive navigation.

The shared AppShell context has been intentionally kept small.

Only values required by external consumers are exposed through context.

Local header visibility state remains inside the layout instead of being propagated through the entire application tree.

This reduces unnecessary rerenders in heavy pages such as the note editor.

Focus Mode

Focus mode is designed for concentrated writing and reading.

When enabled, surrounding application chrome is reduced and the current document receives more available space.

The previous sidebar state is remembered so leaving focus mode restores the interface to the condition it had before focus mode was entered.

The application header can also be revealed temporarily without permanently leaving focus mode.

Folders and Tags

Folders provide broad organization while tags provide flexible classification.

A note might belong to the Work folder while also carrying tags such as Planning, Product, Frontend, or Architecture.

Using both systems allows users to organize large collections without requiring deeply nested folder structures.

Favorites and Pins

Favorites and pinned notes serve different purposes.

A favorite indicates that a note is personally important or frequently referenced.

A pinned note gives the note stronger visibility in navigation and collections.

A note can be both pinned and favorited when appropriate.

Trash

Deleted notes should not disappear immediately.

NotesVault uses a trash workflow so accidentally removed notes can eventually be restored.

Permanent deletion should be an intentional action rather than the default result of clicking a destructive control.

Loading Performance

Major pages are loaded using route-level lazy loading.

This means visiting the dashboard does not require downloading the full rich-text editor.

Likewise, opening Reader mode does not require loading the editor runtime.

The editor remains the largest route because it intentionally contains a substantial feature set, but that cost is isolated until the user actually opens an editable note.

Production Validation

Before a frontend phase is considered complete, the project should continue passing TypeScript, ESLint, and the production build.

These automated checks cannot detect every runtime problem, so browser interaction testing remains important.

Recent testing has already caught issues that static tools could not detect, including editor lifecycle state and mobile navigation focus behavior.

That is why both automated validation and manual runtime testing are necessary.

Current Frontend Checklist

Test typing continuously in the editor.

Test undo and redo after making changes.

Test task list creation, indentation, and outdentation.

Test editor search and replacement.

Test the command palette and slash commands.

Test focus mode.

Test saving while continuing to type.

Test the reader progress indicator.

Test the reader compact header.

Test light and dark themes.

Test desktop navigation.

Test tablet navigation.

Test mobile navigation.

Test keyboard focus restoration.

Test dialogs and menus.

Test the application at multiple responsive widths.

Final Thoughts

NotesVault has grown from a simple notes interface into a structured frontend application.

Many of the most important improvements are not immediately visible.

Route isolation, editor-state subscriptions, revision-safe saving, event cleanup, focus management, accessibility semantics, stable context values, and responsive navigation all contribute to making the application feel reliable.

The goal is not to make the implementation artificially simple.

The goal is to manage complexity internally so that using the application remains simple.

A user should be able to open NotesVault, find a note, write without interruption, save confidently, switch to a comfortable reading experience, and return later without thinking about the engineering underneath.

That is the experience this application is being built to provide.`;

export const notesMockData: Note[] = [
  {
    id: "notesvault-frontend-preview",
    title: "NotesVault Frontend Development Preview",
    preview: NOTESVAULT_PREVIEW_NOTE,
    folderId: "work",
    folderName: "Work",
    tags: ["NotesVault", "Frontend"],
    accent: "purple",
    createdAt: "2026-08-09T18:30:00.000Z",
    updatedAt: "2026-08-09T18:30:00.000Z",
    isPinned: true,
    isFavorite: true,
    isArchived: false,
    deletedAt: null,
  },

  {
    id: "project-roadmap-q2",
    title: "Project Roadmap Q2",
    preview:
      "Overview of our goals and milestones for the second quarter. Key focus areas and deliverables.",
    folderId: "work",
    folderName: "Work",
    tags: ["Planning", "Product"],
    accent: "orange",
    createdAt: "2026-07-18T09:30:00.000Z",
    updatedAt: "2026-08-03T08:45:00.000Z",
    isPinned: true,
    isFavorite: true,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "todo-app-ideas",
    title: "Todo App Ideas",
    preview:
      "Interesting ideas to improve task management, user experience, and productivity.",
    folderId: "ideas",
    folderName: "Ideas",
    tags: ["Ideas", "Product"],
    accent: "purple",
    createdAt: "2026-07-22T12:15:00.000Z",
    updatedAt: "2026-08-02T14:10:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "mongodb-aggregation-cheatsheet",
    title: "MongoDB Aggregation Cheatsheet",
    preview:
      "Common aggregation pipelines and operators with examples for quick reference.",
    folderId: "learning",
    folderName: "Learning",
    tags: ["MongoDB", "Backend"],
    accent: "green",
    createdAt: "2026-07-12T10:00:00.000Z",
    updatedAt: "2026-08-01T09:40:00.000Z",
    isPinned: true,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "daily-journal-august-1",
    title: "Daily Journal — August 1",
    preview:
      "Today was productive. Completed authentication validation and refined the application shell.",
    folderId: "personal",
    folderName: "Personal",
    tags: ["Personal"],
    accent: "blue",
    createdAt: "2026-08-01T18:30:00.000Z",
    updatedAt: "2026-08-01T20:00:00.000Z",
    isPinned: false,
    isFavorite: true,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "design-system-notes",
    title: "Design System Notes",
    preview:
      "Colors, typography, spacing, components, and interface decisions used throughout NotesVault.",
    folderId: "work",
    folderName: "Work",
    tags: ["Design", "UI/UX"],
    accent: "red",
    createdAt: "2026-07-10T08:25:00.000Z",
    updatedAt: "2026-07-30T11:15:00.000Z",
    isPinned: false,
    isFavorite: true,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "express-error-handling",
    title: "Express.js Error Handling",
    preview:
      "Best practices for error handling in Express applications with useful code examples.",
    folderId: "learning",
    folderName: "Learning",
    tags: ["Node.js", "Backend"],
    accent: "green",
    createdAt: "2026-07-06T15:20:00.000Z",
    updatedAt: "2026-07-29T16:45:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "reading-list",
    title: "Reading List",
    preview:
      "Atomic Habits, The Pragmatic Programmer, Clean Code, and Designing Data-Intensive Applications.",
    folderId: "learning",
    folderName: "Learning",
    tags: ["Learning"],
    accent: "blue",
    createdAt: "2026-06-20T10:40:00.000Z",
    updatedAt: "2026-07-28T07:35:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "project-ideas",
    title: "Project Ideas",
    preview:
      "A collection of product ideas for future development, experiments, and portfolio projects.",
    folderId: "ideas",
    folderName: "Ideas",
    tags: ["Ideas", "Product"],
    accent: "orange",
    createdAt: "2026-07-02T13:10:00.000Z",
    updatedAt: "2026-07-26T19:25:00.000Z",
    isPinned: true,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "frontend-interview-notes",
    title: "Frontend Interview Notes",
    preview:
      "React rendering, TypeScript patterns, accessibility, performance, and frontend architecture.",
    folderId: "career",
    folderName: "Career",
    tags: ["Career", "Frontend"],
    accent: "purple",
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-07-24T12:30:00.000Z",
    isPinned: true,
    isFavorite: true,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "weekly-planning",
    title: "Weekly Planning",
    preview:
      "Plan development tasks, DSA practice, communication training, and project milestones.",
    folderId: "personal",
    folderName: "Personal",
    tags: ["Planning", "Personal"],
    accent: "red",
    createdAt: "2026-07-19T07:45:00.000Z",
    updatedAt: "2026-07-22T08:10:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: null,
  },
  {
    id: "old-api-notes",
    title: "Old API Notes",
    preview:
      "Earlier notes about API structure, endpoint conventions, and request handling experiments.",
    folderId: "learning",
    folderName: "Learning",
    tags: ["Backend", "Node.js"],
    accent: "green",
    createdAt: "2026-06-08T10:20:00.000Z",
    updatedAt: "2026-07-18T14:30:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: "2026-08-07T09:15:00.000Z",
  },
  {
    id: "unused-dashboard-ideas",
    title: "Unused Dashboard Ideas",
    preview:
      "Discarded dashboard concepts, layout experiments, and interface ideas that are no longer needed.",
    folderId: "ideas",
    folderName: "Ideas",
    tags: ["Ideas", "Design"],
    accent: "purple",
    createdAt: "2026-06-28T12:40:00.000Z",
    updatedAt: "2026-07-20T08:50:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: "2026-08-05T16:40:00.000Z",
  },
  {
    id: "july-weekly-plan",
    title: "July Weekly Plan",
    preview:
      "An older weekly plan covering development goals, learning tasks, and project priorities. Lorem",
    folderId: "personal",
    folderName: "Personal",
    tags: ["Planning", "Personal"],
    accent: "red",
    createdAt: "2026-07-05T07:30:00.000Z",
    updatedAt: "2026-07-14T18:20:00.000Z",
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    deletedAt: "2026-08-02T11:25:00.000Z",
  },
];
