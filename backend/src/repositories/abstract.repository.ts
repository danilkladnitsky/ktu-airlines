import { UpdateEntity } from "@common/repository.types";

export abstract class AbstractRepository<E, R> {
    abstract save(entity: E): Promise<R>
    abstract get(id: Id): Promise<R>
    abstract update(entity: UpdateEntity<E>): Promise<UpdateEntity<R>>
    abstract delete?(id: Id): Promise<boolean>
}