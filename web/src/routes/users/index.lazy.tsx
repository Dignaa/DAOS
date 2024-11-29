import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';
import PostGrid from '../../components/Grid';

interface User {
  _id: string;
  name: string;
}

export const Route = createLazyFileRoute('/users/')({
  component: Users,
});
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Section>
        <h1>Find musiker</h1>
        {loading ? (
          <p>Vent venligst mens brugere hentes fra databasen...</p>
        ) : (
          <PostGrid cards={users} />
        )}
      </Section>
    </main>
  );
}

export default Users;
