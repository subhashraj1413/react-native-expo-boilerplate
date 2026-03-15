export type UserHighlight = {
  id: string;
  label: string;
  value: string;
};

export type UserProfile = {
  bio: string;
  email: string;
  highlights: UserHighlight[];
  id: string;
  location: string;
  name: string;
  role: string;
};
