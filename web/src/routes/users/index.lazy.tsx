import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';

interface User {
  _id: string;
  name: string;
}

export const Route = createLazyFileRoute('/users/')({
  component: Users,
});

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data);
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
        <h1>Henter Musikere</h1>
        <p>Vent venligst mens brugere hentes fra databasen.</p>
      </Section>
    );

  return (
    <main>
      <Section>
        <h1>Find Musiker</h1>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

export default Users;
