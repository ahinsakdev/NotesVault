import type { SlashCommandItem } from "../types/slash-command.types";

export function filterSlashCommands(
  commands: SlashCommandItem[],
  query: string,
): SlashCommandItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return commands;
  }

  return commands.filter((command) => {
    const searchableValues = [
      command.title,
      command.description,
      ...command.keywords,
    ];

    return searchableValues.some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    );
  });
}
