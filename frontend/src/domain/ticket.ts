
export type AirTicket = {
  tourOperator: string,
  active: boolean,
  thumbnail: string,
  feature: string,
  tripStart: {
      placeFromDate: string,
      placeToDate: string
      day: string;
  },
  tripEnd: {
      placeFromDate: string,
      placeToDate: string
      day: string;
  }
}

export const TICKETS: AirTicket[] = [
  {
    feature: 'Самый быстрый',
    tourOperator: 'Kturkish Airlines',
    active: true,
    thumbnail: '/operators/kturkish.png',
    tripStart: {
      placeFromDate: '09:00',
      placeToDate: '11:00',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '11:00',
      placeToDate: '14:10',
      day: '6 мая',
    },
  },
  {
    feature: 'Мест нет',
    tourOperator: 'Барсус',
    active: false,
    thumbnail: '/operators/barsus.png',
    tripStart: {
      placeFromDate: '08:20',
      placeToDate: '17:10',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '18:40',
      placeToDate: '21:30',
      day: '6 мая',
    },
  },
  {
    feature: 'Мест нет',
    tourOperator: 'itmavia',
    active: false,
    thumbnail: '/operators/itmavia.png',
    tripStart: {
      placeFromDate: '11:40',
      placeToDate: '16:50',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '08:20',
      placeToDate: '11:40',
      day: '6 мая',
    },
  },
  {
    feature: 'Мест нет',
    tourOperator: 'ktubeda',
    active: false,
    thumbnail: '/operators/ktubeda.png',
    tripStart: {
      placeFromDate: '16:50',
      placeToDate: '18:20',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '13:10',
      placeToDate: '17:10',
      day: '6 мая',
    },
  },
];
