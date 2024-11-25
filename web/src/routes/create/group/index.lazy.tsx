import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Section from '../../../components/Section';
import buttonStyles from '../../../components/buttonStyles.module.css';
import { FormEvent } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface Error {
  field: string;
  message: string;
}

export const Route = createLazyFileRoute('/create/group/')({
  component: CreateGroup,
});

function CreateGroup() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const createNewGroup = (event: FormEvent) => {
    event.preventDefault();

  const form = document.querySelector('form')!;
  const formData = new FormData(form);
  const data: Record<string, unknown> = Object.fromEntries(formData.entries());

 if (data.noOfActiveMembers !== undefined) {
    data.noOfActiveMembers = Number(data.noOfActiveMembers);
  }

    for (const key in data) {
      if (data[key] === '') {
        delete data[key];
      }
    }

    fetch('http://localhost:3000/groups/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) {
            return Promise.reject(data);
          }
          return data;
        });
      })
      .then(data => {
        navigate({
          to: '/groups/$groupId',
          params: { groupId: data._id },
        });
      })
      .catch(errors => {
        console.error(errors);
        document.querySelectorAll('[data-error]').forEach(node => {
          node.removeAttribute('data-error');
        });
        errors.message.map((error: Error) => {
          const node = document.querySelector(`input[name="${error.field}"]`);
          node?.parentElement!.setAttribute('data-error', error.message);
        });
      });
  };

  return (
    <main>
      <Section>
        <h1>Opret ensemble</h1>
        <Form onSubmit={createNewGroup}>
          <Input label="Navn" type="text" name="name" required />
          <Input label="Billed URL" type="text" name="imageUrl" />
          <Input label="Beskrivelse" type="text" name="description" />
          <Input label="Lokation" type="text" name="address" />
          <Input label="Hjemmeside" type="text" name="link" />
          <Input
            label="Antal nuværnede musikere"
            type="number"
            name="noOfActiveMembers"
          />
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Opret ensemble
          </button>
        </Form>
      </Section>
    </main>
  );
}
