import { DefaultConsistencyLevel } from "./DefaultConsistencyLevel"

export abstract class ConsistencyLevel {
    ANY = DefaultConsistencyLevel.ANY
    ONE = DefaultConsistencyLevel.ONE
    TWO = DefaultConsistencyLevel.TWO;
    THREE = DefaultConsistencyLevel.THREE;
    QUORUM = DefaultConsistencyLevel.QUORUM;
    ALL = DefaultConsistencyLevel.ALL;
    LOCAL_ONE = DefaultConsistencyLevel.LOCAL_ONE;
    LOCAL_QUORUM = DefaultConsistencyLevel.LOCAL_QUORUM;
    EACH_QUORUM = DefaultConsistencyLevel.EACH_QUORUM;
    SERIAL = DefaultConsistencyLevel.SERIAL;
    LOCAL_SERIAL = DefaultConsistencyLevel.LOCAL_SERIAL;

    /** The numerical value that the level is encoded to in protocol frames. */
    abstract getProtocolCode(): number;

    /** The textual representation of the level in configuration files. */
    abstract name(): string;

    /** Whether this consistency level applies to the local datacenter only. */
    abstract isDcLocal(): boolean;

    /**
     * Whether this consistency level is serial, that is, applies only to the "paxos" phase of a <a
     * href="https://docs.datastax.com/en/cassandra/3.0/cassandra/dml/dmlLtwtTransactions.html">lightweight
     * transaction</a>.
     *
     * <p>Serial consistency levels are only meaningful when executing conditional updates ({@code
     * INSERT}, {@code UPDATE} or {@code DELETE} statements with an {@code IF} condition).
     */
    abstract isSerial(): boolean;
}