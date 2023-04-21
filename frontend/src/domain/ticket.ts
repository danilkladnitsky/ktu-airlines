export type AirTicket = {
    tourOperator: string,
    active: boolean,
    tripStart: {
        placeFrom: string,
        placeTo: string,
        placeFromDate: string,
        placeToDate: string
    },
    tripEnd: {
        placeFrom: string,
        placeTo: string,
        placeFromDate: string,
        placeToDate: string
    }
}
