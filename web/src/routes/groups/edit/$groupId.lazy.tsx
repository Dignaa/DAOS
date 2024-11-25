import * as React from 'react'
import { useNavigate, createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect, FormEvent } from 'react';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import buttonStyles from '../../../components/buttonStyles.module.css';
import Form from '../../../components/Form';
import { useAuth } from '../../../contexts/AuthContext';

export const Route = createLazyFileRoute('/groups/edit/$groupId')({
  component: EditGroup,
})


export interface Group {
  _id: string;
  name?: string; // Required field
  imageUrl?: string; // Optional field
  description?: string; // Optional field
  address?: string; // Optional field
  link?: string; // Optional field
  noOfActiveMembers?: number; // Optional field
  adminId?: string; // Optional field (assuming ObjectId is serialized as a string)
  userIds?: string[]; // Optional array of strings (ObjectId serialized as strings)
}

export default function EditGroup() {
  const { groupId } = Route.useParams();

  const [group, setGroup] = useState<Group | null>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  // Redirect if no session exists
  if (!session) {
    window.location.href = '/signin';
  }

  useEffect(() => {
      fetch(`http://localhost:3000/groups/${groupId}`, {
          headers: { Authorization: 'Bearer ' + session },
        }).then(response => {
          return response.json();
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.message);
          }
          setGroup(data);
        }).finally(() => {
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, [session]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroup((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === 'noOfActiveMembers' ? Number(value) : value, // Convert to number if necessary
          }
        : null
    );  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    fetch(`http://localhost:3000/groups/${group?._id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      }
    ).then(response => {
      return response.json();
    }).then(data => {
      if (data.error) {
        throw new Error(JSON.stringify(data.message));
      }
    }).finally(() => {
      setSaving(false);
      navigate({
        to: `/groups/${group?._id}`,
      });
    })
    .catch(error => {
      setLoading(false);
      throw new Error(error.message);
    });
  }

  if (loading) {
    return (
      <Section>
        <h1>Loading Group...</h1>
        <p>Please wait while we fetch your group data.</p>
      </Section>
    );
  }

  if (!group) return <p>Unable to load group.</p>;

  return (
    <main>
      <Section>
        <h1>Rediger Profil</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              label="Group Name"
              type="text"
              name="name"
              value={group.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Image URL"
              type="text"
              name="imageUrl"
              value={group.imageUrl}
              onChange={handleChange}
            />
            <Input
              label="Description"
              type="text"
              name="description"
              value={group.description}
              onChange={handleChange}
            />
            <Input
              label="Address"
              type="text"
              name="address"
              value={group.address}
              onChange={handleChange}
            />
            <Input
              label="Link"
              type="text"
              name="link"
              value={group.link}
              onChange={handleChange}
            />
            <Input
              label="Number of Active Members"
              type="number"
              name="noOfActiveMembers"
              value={group.noOfActiveMembers}
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
              disabled={saving}>
            {saving ? 'Gemmer...' : 'Gem Profil'}
          </button>
          </Form>
      </Section>
    </main>
  );
}

