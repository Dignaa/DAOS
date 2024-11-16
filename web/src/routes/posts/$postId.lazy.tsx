import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import buttonStyles from '../../components/buttonStyles.module.css';

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostPage,
});

export interface Group {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  address?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  link?: string;
  noOfActiveMembers?: number;
  adminId: string;
  userIds: string[];
}

export interface Post {
  id: string;
  title: string;
  description: string;
  instrument: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  group: Group;
}

function PostPage() {
  const { postId } = Route.useParams();
  const { session } = useAuth();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  const joinGroup = () => {
    fetch(`http://localhost:3000/groups/${post?.groupId}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.token,
      },
    })
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) {
            return Promise.reject(data);
          }
          return data;
        });
      })
      .then(responseData => {
        console.log(responseData);
        alert('Joined group id: ' + post?.groupId);
        setJoined(true);
      })
      .catch(() => {
        alert('Error');
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      headers: { Authorization: 'Bearer ' + session?.token },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPost(data);
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
        <h1>Henter Post</h1>
        <p>Vent venligst mens din post hentes fra databasen.</p>
      </Section>
    );

  return (
    <main>
      <Section>
        <h1>{post?.title}</h1>
      </Section>
      <Section>
        <p>Group: {post?.group.name}</p>
        <p>{post?.description}</p>
      </Section>
      <Section>
        <p>{post?.instrument}</p>
      </Section>
      <Section>
        {joined ? (
          <p>Joined the group</p>
        ) : (
          <button
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
            onClick={joinGroup}
          >
            Join {post?.group.name}
          </button>
        )}
      </Section>
    </main>
  );
}
