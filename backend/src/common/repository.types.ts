export type UpdateEntity<E> = Partial<Omit<E, "id">> & { id: Id };
