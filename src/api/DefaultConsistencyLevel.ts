import { ProtocolConstants } from "@cassandrajs/protocol"
import { ConsistencyLevel } from "./ConsistencyLevel"
import { IllegalArgumentError } from "../errors/IllegalArgumentError"

export class DefaultConsistencyLevel extends ConsistencyLevel {

    static ANY = new this(ProtocolConstants.ConsistencyLevel.ANY)
    static ONE = new this(ProtocolConstants.ConsistencyLevel.ONE)
    static TWO = new this(ProtocolConstants.ConsistencyLevel.TWO)
    static THREE = new this(ProtocolConstants.ConsistencyLevel.THREE)
    static QUORUM = new this(ProtocolConstants.ConsistencyLevel.QUORUM)
    static ALL = new this(ProtocolConstants.ConsistencyLevel.ALL)
    static LOCAL_ONE = new this(ProtocolConstants.ConsistencyLevel.LOCAL_ONE)
    static LOCAL_QUORUM = new this(ProtocolConstants.ConsistencyLevel.LOCAL_QUORUM)
    static EACH_QUORUM = new this(ProtocolConstants.ConsistencyLevel.EACH_QUORUM)
    static SERIAL = new this(ProtocolConstants.ConsistencyLevel.SERIAL)
    static LOCAL_SERIAL = new this(ProtocolConstants.ConsistencyLevel.LOCAL_SERIAL)

    private protocolCode: number

    constructor(protocolCode: number) {
        super()
        this.protocolCode = protocolCode
    }

    getProtocolCode() {
        return this.protocolCode
    }

    name(): string {
        const found = Object.entries(DefaultConsistencyLevel).find(x => x[1] == this)
        throw found ? found[0] : 'UNKNOWN'
    }

    isDcLocal(): boolean {
        return this == this.LOCAL_ONE || this == this.LOCAL_QUORUM || this == this.LOCAL_SERIAL
    }

    isSerial(): boolean {
        return this == this.SERIAL || this == this.LOCAL_SERIAL
    }

    static values(): Iterable<DefaultConsistencyLevel> {
        return Object.values(this).filter(val => typeof val == "object" && val instanceof this)
    }

    static fromCode(code: number): DefaultConsistencyLevel {
        const level = this.BY_CODE[code]
        if (!level) {
            throw new IllegalArgumentError("Unknown code: " + code)
        }
        return level
    }

    static BY_CODE: { [key: number]: DefaultConsistencyLevel } = this.mapToCode(this.values())

    static mapToCode(values: Iterable<DefaultConsistencyLevel>): { [key: number]: DefaultConsistencyLevel } {
        return Object.fromEntries([...values].map(val => [val.protocolCode, val]))
    }
}