import { useEffect, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import Section from '../../components/Section';
import buttonStyles from '../../components/buttonStyles.module.css';
import { clearSession } from '../../utils/currentSession';
import UserProfile from '../../components/UserProfile';
import Grid from '../../components/Grid';
import { useAuth } from '../../contexts/AuthContext';
import GroupGrid from '../../components/Group/GroupGrid';
//import InstrumentGrid from '../../components/IntrumentGrid';

interface Profile {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  description?: string;
  avatarUrl?: string;
  address?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  seeking: boolean;
  lastLoggedIn: Date;
  createdAt: Date;
  instruments?: string[];
  posts?: [];
  groups?: [];
}

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(true);

  const { session } = useAuth();
  if (session == null) {
    window.location.href = '/signin';
  }

  const signUserOut = () => {
    clearSession();
    window.location.href = '/';
  };

  useEffect(() => {
    fetch('http://localhost:3000/users/profile', {
      headers: { Authorization: 'Bearer ' + session },
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
  }, [session]);
  if (loading)
    return (
      <Section>
        <h1>Henter Profil</h1>
        <p>Vent venligst mens din profil hentes fra databasen.</p>
      </Section>
    );
  if (profile) {
    console.log('POSTS', profile.posts);
    return (
      <main>
        <UserProfile {...profile} />
        <div>
          <Section>
            <h2>Mine opslag</h2>
            <Grid cards={profile.posts || []}></Grid>
            <Link to="/posts/create" className={buttonStyles.button}>
              Opret nyt opslag
            </Link>
          </Section>
          <Section>
            <h2>Mine ensenbler</h2>
            <GroupGrid groups={profile.groups || []}></GroupGrid>
            <Link to="/groups/create" className={buttonStyles.button}>
              Opret nyt ensemble
            </Link>
          </Section>
          {/* <Section>
            <h2>Mine instrumenter</h2>
            <a className={buttonStyles.button} href="">
            Tilfoej
          </a>
            {profile.instruments ? <InstrumentGrid instruments={profile.instruments}></InstrumentGrid> : <p>Ingen instrumenter</p>}
          </Section> */}
        </div>
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
}

export default Profile;
