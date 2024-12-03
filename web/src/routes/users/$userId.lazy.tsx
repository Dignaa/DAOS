import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import User from '../../components/User/User';
import buttonStyles from '../../components/buttonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface Group {
  _id: string;
  name: string;
  imageUrl: string;
}

interface User {
  email: string;
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  description?: string;
  address?: string;
  seeking?: boolean;
  groups?: Group[];
  lastLoggedIn: string;
  instruments: string[];
  createdAt: string;
}

export const Route = createLazyFileRoute('/users/$userId')({
  component: UserPage,
});
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';


function UserPage() {
  const { userId } = Route.useParams();

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    fetch(`${apiUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setUser(null);
        setLoading(false);
      });
  }, [userId, session]);

  if (loading) {
    return (
      <Section>
        <h1>Henter musiker</h1>
        <p>Vent venligst mens musikeren hentes fra databasen...</p>
      </Section>
    );
  }

  if (!user)
    return (
      <Section>
        <h1>Musiker ikke fundet</h1>
        <Link
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          to="/users"
        >
          Se alle musikere
        </Link>
      </Section>
    );

  return (
    <main>
      <Section>
        <User user={user} />
      </Section>
    </main>
  );
}
