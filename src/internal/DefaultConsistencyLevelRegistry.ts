import { ConsistencyLevel } from "../api/ConsistencyLevel"
import { DefaultConsistencyLevel } from "../api/DefaultConsistencyLevel"
import { ConsistencyLevelRegistry } from "./ConsistencyLevelRegistry"

export class DefaultConsistencyLevelRegistry extends ConsistencyLevelRegistry {

    static VALUES = [...DefaultConsistencyLevel.values()]
    static NAME_TO_CODE = Object.fromEntries(Object.entries(DefaultConsistencyLevel).filter(val => typeof val[1] == "object" && val[1] instanceof DefaultConsistencyLevel).map(val => [val[0], (val[1] as DefaultConsistencyLevel).getProtocolCode()]))

    codeToLevel(code: number): ConsistencyLevel {
        return DefaultConsistencyLevel.fromCode(code)
    }

    nameToCode(name: string): number {
        return DefaultConsistencyLevelRegistry.NAME_TO_CODE[name]
    }

    nameToLevel(name: string): ConsistencyLevel {
        return DefaultConsistencyLevel[name];
    }

    getValues(): Iterable<ConsistencyLevel> {
        return DefaultConsistencyLevelRegistry.VALUES
    }

}