import { createFileRoute, Link } from '@tanstack/react-router';
import Section from '../components/Section';
import Grid from '../components/Grid';

import '../index.css';
import typographyStyles from '../components/typographyStyles.module.css';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';

interface Post {
  _id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/posts`)
      .then(response => {
        return response.json();
      })
      .then(data => {
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
      <Section row>
        <div>
          <h1 className={typographyStyles.red}>
            Stedet hvor amatørmusikere finder hinanden og spiller sammen
          </h1>
        </div>
        <Hero src="/illustrations/hero.svg" />
      </Section>
      <Section>
        <div>
          <h2>Seneste opslag</h2>
          <Link to="/posts" className={typographyStyles.red}>
            Se alle opslag
          </Link>
        </div>
        {loading ? (
          <p>Vent venligst mens seneste opslag hentes fra databasen...</p>
        ) : (
          <Grid cards={posts || []} />
        )}
      </Section>
    </main>
  );
}
