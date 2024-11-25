import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { FormEvent, useState } from 'react';
import Section from '../../components/Section';
import Input from '../../components/Input';
import buttonStyles from '../../components/buttonStyles.module.css';
import Form from '../../components/Form';

interface Error {
  field: string;
  message: string;
}

export const Route = createLazyFileRoute('/(sign)/signup')({
  component: SignUp,
});

function SignUp() {
  const [seeking, setSeeking] = useState<boolean>(true);
  const navigate = useNavigate();

  const signUpUser = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convert 'true' and 'false' strings to booleans in the data object
    for (const key in data) {
      if (data[key] === 'true' || data[key] === 'false') {
        data[key] = JSON.parse(data[key] as string);
      }
    }

    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      .then(() => {
        navigate({
          to: '/signin',
        });
      })
      .catch(errors => {
        console.log(errors);
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
        <h1>Opret bruger</h1>
        <Form onSubmit={signUpUser}>
          <Input label="Fulde Navn" type="text" name="name" required />
          <Input label="Email" type="email" name="email" required />
          <Input label="Adgangskode" type="password" name="password" required />
          <div>
            <Input
              label="Søger efter ensamble"
              type="radio"
              name="seeking"
              value="true"
              checked={seeking === true}
              onChange={() => setSeeking(true)}
              required
            />
            <Input
              label="Søger ikke efter ensamble"
              type="radio"
              name="seeking"
              value="false"
              checked={seeking === false}
              onChange={() => setSeeking(false)}
              required
            />
          </div>
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Opret bruger
          </button>
        </Form>
      </Section>
    </main>
  );
}
