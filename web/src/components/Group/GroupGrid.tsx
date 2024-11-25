import styles from './../Grid.module.css';
import GroupCard from './GroupCard';

// GroupProps interface for individual group data
interface GroupProps {
  _id: string;
  name: string;
  imageUrl?: string;
}

// Props for the GroupGrid component
interface GroupGridProps {
  groups: GroupProps[];
}

// GroupGrid component definition
export default function GroupGrid({ groups }: GroupGridProps) {
  return (
    <ul className={styles.grid}>
      {groups.map(group => (
        <GroupCard key={group._id} {...group} />
      ))}
    </ul>
  );
}
