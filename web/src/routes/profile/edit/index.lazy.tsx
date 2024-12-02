import { useState, useEffect, FormEvent } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import buttonStyles from '../../../components/buttonStyles.module.css';
import Form from '../../../components/Form';
import { useAuth } from '../../../contexts/AuthContext';
import Select, { SingleValue } from 'react-select';

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

interface SelectOption {
  value: string;
  label: string;
}

interface Instrument {
  type: string;
}

export const Route = createLazyFileRoute('/profile/edit/')({
  component: EditProfile,
});

export default function EditProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeking, setSeeking] = useState(true);
  const { session } = useAuth();
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState<SelectOption[]>([]);
  const [userInstruments, setUserinstruments] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] =
    useState<SingleValue<SelectOption>>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Redirect if no session exists
  if (!session) {
    navigate({
      to: '/signin',
    });
  }

  const fetchInstruments = () => {
    fetch(`${apiUrl}/instruments/`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
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
        console.error(errors);
      });
  };

  useEffect(() => {
    const fetchProfile = () => {
      fetch(`${apiUrl}/users/profile`, {
        headers: { Authorization: 'Bearer ' + session },
      })
        .then(response => response.json())
        .then(data => {
          setProfile(data);
          setUserinstruments(data.instruments || []);
          setSeeking(data.seeking);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProfile();
  }, [session]);

  useEffect(() => {
    fetchInstruments();
  }, []);

  const pushUserInstrument = (newInstrument: SingleValue<SelectOption>) => {
    if (newInstrument) {
      setUserinstruments(prev => [...prev, newInstrument.value]);
      setSelectedInstrument(null); // Clear the selected value
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    if (profile) {
      profile.seeking = seeking;
      profile.instruments = userInstruments;

      console.log(profile);

      fetch(`${apiUrl}/users/${profile._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        })
        .finally(() => {
          setSaving(false);
          navigate({
            to: '/profile',
          });
        });
    }
  };

  if (loading) {
    return (
      <main>
        <Section>
          <h1>Henter profil...</h1>
          <p>Vent venligst mens din profil hentes fra databasen...</p>
        </Section>
      </main>
    );
  }

  if (!profile) {
    return (
      <main>
        <Section>
          <h1>Fejl</h1>
          <p>Profil kunne ikke hentes fra databasen.</p>
        </Section>
      </main>
    );
  }

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
            value={profile.phoneNumber || ''}
            onChange={handleChange}
          />
          <Input
            label="Profilbeskrivelse"
            type="text"
            name="description"
            value={profile.description || ''}
            onChange={handleChange}
          />
          <Input
            label="Profilbillede URL"
            type="text"
            name="avatarUrl"
            value={profile.avatarUrl || ''}
            onChange={handleChange}
          />
          <Input
            label="Område"
            type="text"
            name="address"
            value={profile.address || ''}
            onChange={handleChange}
          />
          <Select
            name="instrument"
            options={instruments}
            placeholder="Vælg instrument"
            noOptionsMessage={() => 'Ingen instrumenter fundet'}
            value={selectedInstrument} // Bind the state to the Select input
            onChange={newInstrument => {
              setSelectedInstrument(newInstrument); // Update the state
              pushUserInstrument(newInstrument); // Add the instrument and reset
            }}
          />
          <ul>
            {userInstruments.map((instrument, index) => (
              <li key={index + instrument}>
                {instrument}
                <button
                  type="button"
                  onClick={() => {
                    setUserinstruments(prevInstruments =>
                      prevInstruments.filter((_, i) => i !== index)
                    );
                  }}
                >
                  -
                </button>
              </li>
            ))}
          </ul>

          <div>
            <Input
              label="Søger efter ensemble"
              type="radio"
              name="seeking"
              value="true"
              checked={seeking === true}
              onChange={() => setSeeking(true)}
            />
            <Input
              label="Søger ikke efter ensemble"
              type="radio"
              name="seeking"
              value="false"
              checked={seeking === false}
              onChange={() => setSeeking(false)}
            />
          </div>
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
