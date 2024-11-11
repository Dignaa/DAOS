import { useEffect, useState } from 'react';
import { createLazyFileRoute, redirect } from '@tanstack/react-router';
import Section from '../../components/Section';
import { getCurrentSession } from '../../utils/currentSession';
import buttonStyles from '../../components/buttonStyles.module.css';
import { clearSession } from '../../utils/currentSession';

interface Profile {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  description?: string;
  avatarUrl?: string;
  address?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  seeking: boolean;
  lastLoggedIn?: Date;
  createdAt?: Date;
  instruments?: string[];
}

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(true);

  const token = getCurrentSession();

  if (token == null) {
    window.location.href = '/signin';
  }

  const signUserOut = () => {
    clearSession();
    window.location.href = '/';
  };

  useEffect(() => {
    fetch('http://localhost:3000/users/profile', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProfile(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Section>
        <h1>Henter Profil</h1>
        <p>Vent venligst mens din profil hentes fra databasen.</p>
      </Section>
    );

  return (
    <main>
      <Section>
        <h1>{profile?.name}</h1>
      </Section>
      <Section>
        <p>{profile?.address}</p>
        <p>{profile?.description}</p>
      </Section>
      <Section>
        <button
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          onClick={signUserOut}
        >
          Log ud
        </button>
      </Section>
    </main>
  );
}

export default Profile;
