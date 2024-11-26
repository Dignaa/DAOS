import * as React from 'react';
import { useNavigate, createLazyFileRoute } from '@tanstack/react-router';
import { useState, useEffect, FormEvent } from 'react';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import buttonStyles from '../../../components/buttonStyles.module.css';
import Form from '../../../components/Form';
import { useAuth } from '../../../contexts/AuthContext';
import Select from 'react-select';
import instruments from '../../../assets/instruments';

export const Route = createLazyFileRoute('/posts/edit/$postId')({
  component: EditPost,
});

interface Post {
  _id: string;
  description: string;
  instrument: string;
  title: string;
}

export default function EditPost() {
  const { postId } = Route.useParams();

  const [post, setPost] = useState<Post | null>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  // Redirect if no session exists
  if (!session) {
    window.location.href = '/signin';
  }

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

  interface SelectOption {
    value: string;
    label: string;
  }

  const instrumentOptions: SelectOption[] = instruments.map(
    (instrument: string) => ({
      value: instrument,
      label: instrument,
    })
  );

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
        <h1>Loading Post...</h1>
        <p>Please wait while we fetch the post data.</p>
      </Section>
    );
  }

  if (!post) return <p>Unable to load the post data.</p>;

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
            options={instrumentOptions}
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
