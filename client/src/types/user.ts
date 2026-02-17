export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: User[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
}
