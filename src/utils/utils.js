import moment from 'moment';

export function generateCalendar(year) {
  let calendar = [];
  let date = moment({ year, month: 0 , day: 1});

  for (let i = 0; i < 12; i++) {
    let month = {
      id: `${year}${date.format('MM')}`,
      title: date.format('MMM'),
      days: []
    };

    // add days
    while (date.get('month') === i) {
      month.days.push({
        id: `${year}${date.format('MM')}${date.format('DD')}`,
        date: date.format('DD'),
        dayTitle: date.format('ddd'),
        events: []
      });
      date.add(1, 'day');
    }

    calendar.push(month);
  }

  return calendar;
}