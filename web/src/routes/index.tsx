import { createFileRoute } from '@tanstack/react-router';
import Section from '../components/Section';
import Select from 'react-select';
import PostGrid from '../components/PostGrid';

import '../index.css';
import typographyStyles from '../components/typographyStyles.module.css';
import instruments from '../assets/instruments';

interface Post {
  id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

interface SelectOption {
  value: string;
  label: string;
}

export const Route = createFileRoute('/')({
  component: Index,
});

const posts: Post[] = [
  {
    id: '1',
    title: 'Guitarist Looking for Bandmates',
    user: 'JohnDoe',
    instrument: 'Guitar',
    date: '2023-11-01T14:30:00',
    address: 'New York, NY',
  },
  {
    id: '2',
    title: 'Pianist Available for Jazz Gigs',
    user: 'JazzCat',
    instrument: 'Piano',
    date: '2023-10-25T17:00:00',
    address: 'Chicago, IL',
  },
  {
    id: '3',
    title: 'Drummer Seeking Rock Band',
    user: 'BeatMaster99',
    instrument: 'Drums',
    date: '2023-09-20T15:45:00',
    address: 'Los Angeles, CA',
  },
  {
    id: '4',
    title: 'Violinist for Classical Ensembles',
    user: 'ViolaViolin',
    instrument: 'Violin',
    date: '2023-10-18T10:00:00',
    address: 'Austin, TX',
  },
  {
    id: '5',
    title: 'Bass Player Available for Gigs',
    user: 'BassMan',
    instrument: 'Bass Guitar',
    date: '2023-08-30T09:30:00',
    address: 'Seattle, WA',
  },
  {
    id: '6',
    title: 'Trumpet Player Looking to Jam',
    user: 'HornGuru',
    instrument: 'Trumpet',
    date: '2023-11-02T20:15:00',
    address: 'Miami, FL',
  },
  {
    id: '7',
    title: 'Flutist Seeking Accompanist',
    user: 'FluteDreamer',
    instrument: 'Flute',
    date: '2023-09-10T14:00:00',
    address: 'San Francisco, CA',
  },
  {
    id: '8',
    title: 'Cellist for Chamber Music Group',
    user: 'CelloSoul',
    instrument: 'Cello',
    date: '2023-07-22T16:00:00',
    address: 'Boston, MA',
  },
  {
    id: '9',
    title: 'Saxophonist Available for Jazz Sessions',
    user: 'SaxyPlayer',
    instrument: 'Saxophone',
    date: '2023-10-05T12:30:00',
    address: 'Philadelphia, PA',
  },
  {
    id: '10',
    title: 'Singer Looking for Guitar Accompanist',
    user: 'VocalQueen',
    instrument: 'Vocals',
    date: '2023-11-03T19:00:00',
    address: 'Nashville, TN',
  },
];
const options: SelectOption[] = instruments.map((instrument: string) => ({
  value: instrument,
  label: instrument,
}));

function Index() {
  return (
    <main>
      <Section>
        <div>
          <h1 className={typographyStyles.red}>
            Stedet hvor amatørmusikere finder hinanden og spiller sammen
          </h1>
          <Select
            options={options}
            placeholder="Vælg instrument"
            noOptionsMessage={() => 'Ingen instrumenter fundet'}
          />
        </div>
        <div>
          <img src="/illustrations/hero.svg" alt="" />
        </div>
      </Section>
      <Section>
        <div>
          <h2>Seneste opslag</h2>
          <a className={typographyStyles.red} href="/posts">
            Se alle opslag
          </a>
        </div>
      </Section>
      <Section>
        <PostGrid posts={posts} />
      </Section>
    </main>
  );
}
