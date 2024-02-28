import { ProtocolConstants } from "@cassandrajs/protocol"
import { ProtocolVersion } from "./ProtocolVersion"

export class DefaultProtocolVersion extends ProtocolVersion {

    /** Version 3, supported by Cassandra 2.1 and above. */
    static V3 = new this(ProtocolConstants.Version.V3, false)

    /** Version 4, supported by Cassandra 2.2 and above. */
    static V4 = new this(ProtocolConstants.Version.V4, false)

    /** Version 5, supported by Cassandra 4.0 and above. */
    static V5 = new this(ProtocolConstants.Version.V5, false)

    /**
     * Version 6, currently supported as a beta preview in Cassandra 4.0 and above.
     * 
     * @warning Do not use this in production.
     * 
     * @see ProtocolVersion#isBeta()
     */
    static V6 = new this(ProtocolConstants.Version.V6, true)

    private code: number
    private beta: boolean

    constructor(code: number, beta: boolean) {
        super()
        this.code = code
        this.beta = beta
    }

    public getCode(): number {
        return this.code
    }

    public isBeta(): boolean {
        return this.beta
    }

    static values(): ProtocolVersion[] {
        return [...super.values(), this.V3, this.V4, this.V5, this.V6]
    }
}