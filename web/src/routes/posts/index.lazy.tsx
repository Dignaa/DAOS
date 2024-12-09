import { FormEvent, useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';
import Grid from '../../components/Grid';
import Form from '../../components/Form';
import Select from 'react-select';
import buttonStyles from '../../components/buttonStyles.module.css';

interface Post {
  _id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Instrument {
  type: string;
}

export const Route = createLazyFileRoute('/posts/')({
  component: Posts,
});

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [instruments, setInstruments] = useState<SelectOption[]>([]);

  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const search = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`${apiUrl}/posts?search=${data.instrument}`)
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
  };

  const fetchInstruments = () => {
    fetch(`${apiUrl}/instruments/`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const instruments: SelectOption[] = data.map(
          (instrument: Instrument) => ({
            value: instrument.type,
            label: instrument.type,
          })
        );
        setInstruments(instruments);
      })
      .catch(errors => {
        alert('Instrumenter ikke fundet');
        console.log(errors);
      });
  };

  useEffect(() => {
    fetch(`${apiUrl}/posts`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setAllPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    fetchInstruments();
  }, []);

  const showAll = () => {
    setPosts(allPosts);
  };

  return (
    <main>
      <Section>
        <h1>Find ensemble</h1>
        {loading ? (
          <p>Vent venligst mens opslag hentes fra databasen...</p>
        ) : posts ? (
          <>
            <Form onSubmit={search}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                required
                name="instrument"
                options={instruments}
                placeholder="Vælg instrument"
                noOptionsMessage={() => 'Ingen instrumenter fundet'}
              />
              <button
                type="submit"
                className={`${buttonStyles.button} ${buttonStyles.blue}`}
              >
                Søg
              </button>
              <button
                onClick={showAll}
                type="button"
                className={`${buttonStyles.button}`}
              >
                Vis alle
              </button>
            </Form>
            <Grid cards={posts} />
          </>
        ) : (
          <h2>Ingen opslag</h2>
        )}
      </Section>
    </main>
  );
}

export default Posts;
