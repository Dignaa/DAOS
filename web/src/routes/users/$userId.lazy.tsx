import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import User from '../../components/User/User';
import buttonStyles from '../../components/buttonStyles.module.css';

interface Group {
  id: string;
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

function UserPage() {
  const { userId } = Route.useParams();

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhOTkwYjE3YmU2YzkzMTA5YjYxOWYiLCJpYXQiOjE3MzE2OTg5ODgsImV4cCI6MTczMTc4NTM4OH0.v3ElajjXWx_cQHHgcHDLV-eDcBKN8Bmnz6KuBN-g6d0';
  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
  }, []);

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
