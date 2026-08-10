export type ProfileMenuUser = {
  name: string;
  email: string;
  initials: string;
};

export type ProfileMenuState =
  | {
      status: "guest";
      user: null;
    }
  | {
      status: "authenticated";
      user: ProfileMenuUser;
    };
