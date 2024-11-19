import UserOverview from './UserOverview';
import UserInstruments from './UserInstruments';

interface User {
  email: string;
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  description?: string;
  address?: string;
  seeking?: boolean;
  lastLoggedIn: string;
  instruments: string[];
  createdAt: string;
}
interface Props {
  user: User;
}

export default function User({ user }: Props) {
  return (
    <>
      <UserOverview user={user} />
      <UserInstruments instruments={user.instruments} />
    </>
  );
}
