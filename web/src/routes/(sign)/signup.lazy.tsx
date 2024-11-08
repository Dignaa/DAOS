import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Section from '../../components/Section';

interface Error {
  field: string;
}

export const Route = createLazyFileRoute('/(sign)/signup')({
  component: SignUp,
});

function SignUp() {
  const [seeking, setSeeking] = useState<boolean>(true);
  const navigate = useNavigate();

  const signUpUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const form = event.currentTarget.closest('form')!;
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
      .then(responseData => {
        localStorage.setItem('token', responseData.access_token);
        navigate({
          to: '/signin',
        });
      })
      .catch(errors => {
        errors.message.map((error: Error) => {
          const node = document.querySelector(`input[name="${error.field}"]`);
          node?.classList.add('error');
        });
      });
  };

  return (
    <main>
      <Section>
        <form>
          <label>
            Fulde Navn
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Adgangskode
            <input type="password" name="password" required />
          </label>
          <label>
            Søger efter ensamble
            <input
              type="radio"
              name="seeking"
              value="true"
              checked={seeking === true}
              onChange={() => setSeeking(true)}
              required
            />
          </label>
          <label>
            Søger ikke efter ensamble
            <input
              type="radio"
              name="seeking"
              value="false"
              checked={seeking === false}
              onChange={() => setSeeking(false)}
              required
            />
          </label>
          <button onClick={signUpUser}>Opret bruger</button>
        </form>
      </Section>
    </main>
  );
}
