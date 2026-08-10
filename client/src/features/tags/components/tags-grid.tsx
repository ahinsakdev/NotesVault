import type { TagSummary } from "../types/tag.types";
import { TagCard } from "./tag-card";

type TagsGridProps = {
  tags: TagSummary[];
};

export function TagsGrid({ tags }: TagsGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {tags.map((tag) => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
