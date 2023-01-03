import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CalendarParams } from '../App';

export function useYear() {
  const { year = `${new Date().getFullYear()}` } = useParams<CalendarParams>()
  const [parsedYear, setYear] = useState<number>(Number(year))

  useEffect(() => {
    setYear(Number(year))
  }, [year])

  return parsedYear
}
