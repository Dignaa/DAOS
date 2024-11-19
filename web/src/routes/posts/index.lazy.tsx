import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';
import PostGrid from '../../components/PostGrid';

interface Post {
  _id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

export const Route = createLazyFileRoute('/posts/')({
  component: Posts,
});

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
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
        <h1>Find ensemble</h1>
        {loading ? (
          <p>Vent venligst mens opslag hentes fra databasen...</p>
        ) : (
          <PostGrid posts={posts} />
        )}
      </Section>
    </main>
  );
}

export default Posts;
