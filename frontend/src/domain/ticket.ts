
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
      placeFromDate: '07:30',
      placeToDate: '10:00',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '10:30',
      placeToDate: '12:10',
      day: '6 мая',
    },
  },
  {
    feature: 'Нужна запись',
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
      placeToDate: '02:30',
      day: '6 мая',
    },
  },
  {
    feature: 'Нужна виза',
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
    feature: 'Без пересадок',
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
