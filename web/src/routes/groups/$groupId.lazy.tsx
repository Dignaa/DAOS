import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import buttonStyles from '../../components/buttonStyles.module.css';

interface Post {
  id: string;
  title: string;
  instrument: string;
}

interface Group {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  address?: string;
  posts?: Post[];
}

export const Route = createLazyFileRoute('/groups/$groupId')({
  component: GroupPage,
});

function GroupPage() {
  const { groupId } = Route.useParams();
  const [group, setGroup] = useState<Group>();
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
        <h1>{group.name}</h1>
        {group.imageUrl && <img src={group.imageUrl} alt={`${group.name}`} />}
        <div>
          <strong>Description:</strong>{' '}
          {group.description || 'No description provided'}
        </div>
        <div>
          <strong>Address:</strong> {group.address || 'No address provided'}
        </div>

        {/* Render Posts for this Group */}
        <div>
          <strong>Posts:</strong>
          <ul>
            {group.posts && group.posts.length > 0 ? (
              group.posts.map(post => (
                <li key={post.id}>
                  <div>
                    <strong>Title:</strong> {post.title}
                  </div>
                  <div>
                    <strong>Instrument:</strong> {post.instrument}
                  </div>
                </li>
              ))
            ) : (
              <li>No posts available for this group</li>
            )}
          </ul>
        </div>
      </Section>
    </main>
  );
}
