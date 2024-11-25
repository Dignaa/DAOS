import { createFileRoute, Link } from '@tanstack/react-router';
import Section from '../components/Section';
import Grid from '../components/Grid';

import '../index.css';
import typographyStyles from '../components/typographyStyles.module.css';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
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
  console.log(posts);

  return (
    <main>
      <Section row>
        <div>
          <h1 className={typographyStyles.red}>
            Stedet hvor amatørmusikere finder hinanden og spiller sammen
          </h1>
        </div>
        <img src="/illustrations/hero.svg" alt="" />
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
