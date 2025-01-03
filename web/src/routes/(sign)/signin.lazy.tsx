import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Section from '../../components/Section';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { FormEvent } from 'react';
import buttonStyles from '../../components/buttonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';

export const Route = createLazyFileRoute('/(sign)/signin')({
  component: SignIn,
});

function SignIn() {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const signInUser = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`${apiUrl}/auth/signin`, {
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
      .then(responseData => {
        setSession(responseData.access_token);
        navigate({
          to: '/',
        });
      })
      .catch(() => {
        alert('Forkert email eller adganskode!');
      });
  };

  return (
    <main>
      <Section>
        <h1>Login</h1>
        <Form onSubmit={signInUser}>
          <Input label="Email" type="email" name="email" required />
          <Input label="Adgangskode" type="password" name="password" required />
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Login
          </button>
        </Form>
      </Section>
    </main>
  );
}
