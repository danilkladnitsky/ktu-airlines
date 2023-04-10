import { UpdateEntity } from "@common/repository.types";

export abstract class AbstractRepository<E> {
    abstract save(entity: E): Promise<E>
    abstract get(id: Id): Promise<E>
    abstract update(entity: UpdateEntity<E>): Promise<UpdateEntity<E>>
    abstract delete?(id: Id): Promise<boolean>
}