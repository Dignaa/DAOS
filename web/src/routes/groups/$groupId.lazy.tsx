import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import buttonStyles from '../../components/buttonStyles.module.css';
import GroupOverview from '../../components/GroupPage';
import { IGroup } from '../../components/GroupPage';

export const Route = createLazyFileRoute('/groups/$groupId')({
  component: GroupPage,
});

function GroupPage() {
  const { groupId } = Route.useParams();
  const [group, setGroup] = useState<IGroup>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <GroupOverview group={group} />
      </Section>
    </main>
  );
}
