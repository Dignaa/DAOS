import * as React from 'react';
import { useNavigate, createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect, FormEvent } from 'react';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import buttonStyles from '../../../components/buttonStyles.module.css';
import Form from '../../../components/Form';
import { useAuth } from '../../../contexts/AuthContext';
import Select from 'react-select';
import UserInstruments from '../../../components/User/UserInstruments';

export const Route = createLazyFileRoute('/posts/edit/$postId')({
  component: EditPost,
});

interface Post {
  _id: string;
  description: string;
  instrument: string;
  title: string;
}

interface Instrument {
  type: string;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function EditPost() {
  const { postId } = Route.useParams();

  const [post, setPost] = useState<Post | null>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState<SelectOption[]>([]);

  // Redirect if no session exists
  if (!session) {
    navigate({
      to: '/signin',
    });
  }

  const fetchInstruments = () => {
    fetch('http://localhost:3000/instruments/', {
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
        navigate({
          to: '/profile',
        });
        console.log(errors);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      headers: { Authorization: 'Bearer ' + session },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setPost(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [session]);

  useEffect(() => {
    fetchInstruments();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost(prev =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : null
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    fetch(`http://localhost:3000/posts/${post?._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(JSON.stringify(data.message));
        }
      })
      .finally(() => {
        setSaving(false);
        navigate({
          to: `/posts/${post?._id}`,
        });
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  };

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
        <h1>Rediger Post</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Post title"
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            type="text"
            name="description"
            value={post.description}
            onChange={handleChange}
          />
          <Select
            required
            name="instrument"
            options={instruments}
            placeholder="Vælg instrument"
            noOptionsMessage={() => 'Ingen instrumenter fundet'}
          />
          <button
            type="submit"
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
            disabled={saving}
          >
            {saving ? 'Gemmer...' : 'Gem Post'}
          </button>
        </Form>
      </Section>
    </main>
  );
}
