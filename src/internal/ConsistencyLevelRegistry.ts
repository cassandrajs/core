import { ConsistencyLevel } from "../api/ConsistencyLevel"

export abstract class ConsistencyLevelRegistry {
    abstract codeToLevel(code: number): ConsistencyLevel

    abstract nameToCode(name: string): number

    abstract nameToLevel(name: string): ConsistencyLevel

    abstract getValues(): Iterable<ConsistencyLevel>
}