import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Section from '../../components/Section';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { FormEvent } from 'react';
import buttonStyles from '../../components/buttonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface Session {
  token: string;
  expires: number;
}

export const Route = createLazyFileRoute('/(sign)/signin')({
  component: SignIn,
});

function SignIn() {
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const signInUser = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/auth/signin', {
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
        const session: Session = {
          token: responseData.access_token, // Access token from the API response
          expires: Date.now() + 86400000, // Set expiry to 24 hours from now
        };
        setSession(session);
        /*window.location.href = '/';
        navigate({
          to: '/',
        });*/
      })
      .catch(() => {
        alert('Forkert email eller adganskode!');
      });
  };

  return (
    <main>
      <Section>
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
