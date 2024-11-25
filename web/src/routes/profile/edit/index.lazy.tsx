import { useState, useEffect, FormEvent } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import buttonStyles from '../../../components/buttonStyles.module.css';
import Form from '../../../components/Form';
import { useAuth } from '../../../contexts/AuthContext';

interface Profile {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  description?: string;
  avatarUrl?: string;
  address?: string;
  seeking: boolean;
  instruments?: string[];
}

export const Route = createLazyFileRoute('/profile/edit/')({
  component: EditProfile,
});

export default function EditProfile() {
  const [profile, setProfile] = useState<Profile | null>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeking, setSeeking] = useState(true);
  const { session } = useAuth();
  const navigate = useNavigate();

  // Redirect if no session exists
  if (!session) {
    window.location.href = '/signin';
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/profile', {
          headers: { Authorization: 'Bearer ' + session },
        });
        const data = await response.json();
        setProfile(data);
        setSeeking(data.seeking);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    // Convert seeking to a boolean
    profile!.seeking = seeking;

    try {
      const response = await fetch(
        `http://localhost:3000/users/${profile?._id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        }
      );

      if (!response.ok) throw new Error('Failed to update profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
      navigate({
        to: '/profile',
      });
    }
  };

  if (loading) {
    return (
      <Section>
        <h1>Loading Profile...</h1>
        <p>Please wait while we fetch your profile data.</p>
      </Section>
    );
  }

  if (!profile) return <p>Unable to load profile.</p>;

  return (
    <main>
      <Section>
        <h1>Rediger Profil</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Fulde Navn"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={profile.email}
            required
            onChange={handleChange}
          />
          <Input
            label="Mobilnummer"
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
          <Input
            label="Profilbeskrivelse"
            type="text"
            name="description"
            value={profile.description}
            onChange={handleChange}
          />
          <Input
            label="Profilbillede URL"
            type="text"
            name="avatarUrl"
            value={profile.avatarUrl}
            onChange={handleChange}
          />
          <Input
            label="Område"
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
          <Input
            label="Søger efter ensemble"
            type="radio"
            name="seeking"
            value={profile.seeking.toString()}
            checked={seeking === true}
            onChange={() => setSeeking(true)}
          />
          <Input
            label="Søger ikke efter ensemble"
            type="radio"
            name="seeking"
            value={profile.seeking.toString()}
            checked={seeking === false}
            onChange={() => setSeeking(false)}
          />
          <button
            type="submit"
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
            disabled={saving}
          >
            {saving ? 'Gemmer...' : 'Gem Profil'}
          </button>
        </Form>
      </Section>
    </main>
  );
}
