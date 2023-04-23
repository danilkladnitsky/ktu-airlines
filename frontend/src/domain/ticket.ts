export type AirTicket = {
    tourOperator: string,
    active: boolean,
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
    tourOperator: '[ktu].beda',
    active: true,
    tripStart: {
      placeFromDate: '7:30',
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
    tourOperator: 'suir.airlines',
    active: false,
    tripStart: {
      placeFromDate: '2:30',
      placeToDate: '3:00',
      day: '5 мая',
    },
    tripEnd: {
      placeFromDate: '05:30',
      placeToDate: '05:45',
      day: '6 мая',
    },
  }];
