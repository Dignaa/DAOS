import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import List from '../../components/List/List';
import User from '../../components/User/User';

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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhOTkwYjE3YmU2YzkzMTA5YjYxOWYiLCJpYXQiOjE3MzE2MTA1NzUsImV4cCI6MTczMTY5Njk3NX0.MWhEntQ2Uknlep8yPR-C-gtLlZ7bycYDsbsfWR_QapQ';
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
        <h1>Henter bruger</h1>
      </Section>
    );
  }

  return (
    <main>
      {user ? (
        <Section>
          <User user={user} />
        </Section>
      ) : (
        <Section>
          <h1>Bruger ikke fundet</h1>
        </Section>
      )}
    </main>
  );
}
