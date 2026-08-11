type SerializableUser = {
  _id: {
    toString(): string;
  };
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
};

export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
};

export function serializeUser(user: SerializableUser): AuthenticatedUser {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl ?? null,
  };
}
