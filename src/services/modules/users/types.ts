export type Settings = {
  id: string;
  createdAt: string;
  updatedAt: string;
  enableABTesting: boolean;
  isEmailVerified: boolean;
};

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role: string;
  email: string;
  avatar: string;
  isActive: boolean;
  settings: Settings;
};
