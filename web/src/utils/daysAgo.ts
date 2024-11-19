export default function daysAgo(date: string): number {
  const createdDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdDate.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}
