import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import PostOverview from '../../components/Post/PostOverview';
import buttonStyles from '../../components/buttonStyles.module.css';

interface Group {
  _id: string;
  address: string;
  imageUrl: string;
  name: string;
  noOfActiveMembers: number;
  groupId: string;
}

interface Post {
  __v: number;
  _id: string;
  createdAt: string;
  date: string;
  description: string;
  group: Group;
  instrument: string;
  title: string;
}
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
        setPost(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Section>
        <h1>Henter opslag</h1>
        <p>Vent venligst mens opslaget hentes fra databasen...</p>
      </Section>
    );
  }

  if (!post)
    return (
      <Section>
        <h1>Opslag ikke fundet</h1>
        <Link
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          to="/posts"
        >
          Se alle opslag
        </Link>
      </Section>
    );

  return (
    <main>
      <Section>
        <PostOverview post={post} />
      <Section>
        {joined ? (
          <p>Du er allerede med i {post?.group.name}</p>
        ) : (
          <button
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
            onClick={joinGroup}
          >
            Tilslut dig {post?.group.name}
          </button>
        )}
      </Section>
    </main>
  );
}
