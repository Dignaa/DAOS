import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Section from '../../../components/Section';
import buttonStyles from '../../../components/buttonStyles.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Select from 'react-select';
import instruments from '../../../assets/instruments';

interface Error {
  field: string;
  message: string;
}

export const Route = createLazyFileRoute('/create/post/')({
  component: CreatePost,
});

function CreatePost() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [userGroupOptions, setUserGroupOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user groups
  const getUserGroups = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/groups', {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }

      const groups = await response.json();

      if (!groups || groups.length === 0) {
        alert('Ingen grupper fundet. Du bliver omdirigeret til din profil.');
        navigate({ to: '/profile' });
      }

      return groups;
    } catch (error) {
      console.error('Error fetching groups:', error);
      alert('Der opstod en fejl. Du bliver omdirigeret til din profil.');
      navigate({ to: '/profile' });
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const groups = await getUserGroups();
      const options = groups.map(group => ({
        value: group._id,
        label: group.name,
      }));
      setUserGroupOptions(options);
      setLoading(false);
    })();
  }, []);

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

  const createNewPost = async (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    for (const key in data) {
      if (data[key] === '') {
        delete data[key];
      }
    }

    try {
      const response = await fetch('http://localhost:3000/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      navigate({
        to: '/posts/$postId',
        params: { postId: result._id },
      });
    } catch (errors: any) {
      console.error('Error creating post:', errors);
      document.querySelectorAll('[data-error]').forEach(node => {
        node.removeAttribute('data-error');
      });
      errors.message.forEach((error: Error) => {
        const node = document.querySelector(`input[name="${error.field}"]`);
        node?.parentElement!.setAttribute('data-error', error.message);
      });
    }
  };

  if (loading) {
    return (
      <main>
        <Section>
          <h1>Henter grupper</h1>
          <p>Vent venligst mens dine grupper hentes fra databasen...</p>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section>
        <h1>Opret opslag</h1>
        <Form onSubmit={createNewPost}>
          <Select
            required
            options={userGroupOptions}
            placeholder="Vælg instrument"
            noOptionsMessage={() => 'Ingen instrumenter fundet'}
          />
          <Input label="Titel" type="text" name="title" required />
          <Input label="Beskrivelse" type="text" name="description" required />
          <Select
            required
            name="instrument"
            options={instrumentOptions}
            placeholder="Vælg instrument"
            noOptionsMessage={() => 'Ingen instrumenter fundet'}
          />
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Opret opslag
          </button>
        </Form>
      </Section>
    </main>
  );
}
