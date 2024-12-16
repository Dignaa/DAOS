import { FormEvent, useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Section from '../../components/Section';
import Grid from '../../components/Grid';
import Form from '../../components/Form';
import Select from 'react-select';
import buttonStyles from '../../components/buttonStyles.module.css';
import SearchContainer from '../../components/Search/SearchContainer';
import SearchRow from '../../components/Search/SearchRow';
import SearchLabel from '../../components/Search/SearchLabel';
import SearchText from '../../components/Search/SearchText';
import SearchRange from '../../components/Search/SearchRange';

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

    const query = new URLSearchParams();
    if (data.instrument) query.append('instrument', data.instrument.toString());
    if (data.address) query.append('address', data.address.toString());
    if (data.range) query.append('range', data.range.toString());

    fetch(`${apiUrl}/posts?${query.toString()}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data) {
          setPosts([]);
        } else {
          setPosts(data);
        }
        document.getElementById('posts')?.scrollIntoView();
      })
      .catch(error => {
        console.error(error);
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

  const updateDistance = (e: any) => {
    document.querySelector('#distance')!.innerHTML = e.target.value;
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
              <SearchContainer>
                <h2>Søg efter opslag</h2>
                <SearchRow>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="instrument"
                    options={instruments}
                    placeholder="Vælg instrument"
                    noOptionsMessage={() => 'Ingen instrumenter fundet'}
                  />
                </SearchRow>
                <SearchRow>
                  <SearchLabel>
                    <span>Lokation</span>
                    <SearchText />
                  </SearchLabel>
                  <SearchLabel>
                    <span>
                      Indenfor <span id="distance">50</span> km
                    </span>
                    <SearchRange updateDistance={updateDistance} />
                  </SearchLabel>
                </SearchRow>
                <SearchRow>
                  <button
                    onClick={showAll}
                    type="button"
                    className={`${buttonStyles.button}`}
                  >
                    Vis alle opslag
                  </button>
                  <button
                    type="submit"
                    className={`${buttonStyles.button} ${buttonStyles.blue}`}
                  >
                    Søg efter opslag
                  </button>
                </SearchRow>
              </SearchContainer>
            </Form>
            <Grid id="posts" cards={posts} />
          </>
        ) : (
          <h2>Ingen opslag</h2>
        )}
      </Section>
    </main>
  );
}

export default Posts;
