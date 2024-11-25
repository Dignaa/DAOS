import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import buttonStyles from '../../components/buttonStyles.module.css';
import GroupOverview from '../../components/GroupPage';
import { Group } from '../../components/GroupPage';
import { useAuth } from '../../contexts/AuthContext';

export const Route = createLazyFileRoute('/groups/$groupId')({
  component: GroupPage,
});

function GroupPage() {
  const { groupId } = Route.useParams();
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { session } = useAuth();

  const checkIsAdmin = () => {
    fetch(`http://localhost:3000/groups/${groupId}/isAdmin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIsAdmin(data ? true : false);
      })
      .catch(() => {
        alert('Error');
      });
  };

  useEffect(() => {
    checkIsAdmin();
    fetch(`http://localhost:3000/groups/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setGroup(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [groupId]);

  if (loading)
    return (
      <Section>
        <h1>Henter ensemble</h1>
        <p>Vent venligst mens ensemble hentes fra databasen...</p>
      </Section>
    );

  if (!group)
    return (
      <Section>
        <h1>Ensemble ikke fundet</h1>
        <Link
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          to="/posts"
        >
          Find ensembles
        </Link>
      </Section>
    );

  return (
    <main>
      <Section>
        <GroupOverview group={group} isAdmin={isAdmin}/>
      </Section>
    </main>
  );
}
