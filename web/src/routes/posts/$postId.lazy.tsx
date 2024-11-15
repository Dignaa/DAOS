import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import PostOverview from '../../components/Post/PostOverview';

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

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();

  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhOTkwYjE3YmU2YzkzMTA5YjYxOWYiLCJpYXQiOjE3MzE2MTA1NzUsImV4cCI6MTczMTY5Njk3NX0.MWhEntQ2Uknlep8yPR-C-gtLlZ7bycYDsbsfWR_QapQ';
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`, {
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
        console.log(data);
        setPost(data);
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
        <h1>Henter post</h1>
      </Section>
    );
  }

  return (
    <main>
      {post ? (
        <Section>
          <PostOverview post={post} />
        </Section>
      ) : (
        <Section>
          <h1>Post ikke fundet</h1>
        </Section>
      )}
    </main>
  );
}
