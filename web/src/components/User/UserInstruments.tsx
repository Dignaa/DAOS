import List from '../List/List';

interface Props {
  instruments: string[];
}

export default function UserInstruments({ instruments }: Props) {
  console.log(instruments);
  return (
    <div>
      <h2>
        {instruments.length === 1 ? 'Mit instrument' : 'Mine instrumenter'}
      </h2>
      {instruments.length !== 0 ? (
        <List items={instruments} />
      ) : (
        'Ingen instrumenter tilføjet endnu.'
      )}
    </div>
  );
}
