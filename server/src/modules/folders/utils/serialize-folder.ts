type SerializableFolder = {
  _id: {
    toString(): string;
  };
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedFolder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export function serializeFolder(
  folder: SerializableFolder,
): SerializedFolder {
  return {
    id: folder._id.toString(),
    name: folder.name,
    createdAt: folder.createdAt.toISOString(),
    updatedAt: folder.updatedAt.toISOString(),
  };
}
