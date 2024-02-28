import { ProtocolFeature } from "./ProtocolFeature"

export class DefaultProtocolFeature extends ProtocolFeature {
    /**
     * The ability to leave variables unset in prepared statements.
     *
     * @see <a href="https://issues.apache.org/jira/browse/CASSANDRA-7304">CASSANDRA-7304</a>
     */
    static UNSET_BOUND_VALUES = new this()

    /**
     * The ability to override the keyspace on a per-request basis.
     *
     * @see <a href="https://issues.apache.org/jira/browse/CASSANDRA-10145">CASSANDRA-10145</a>
     */
    static PER_REQUEST_KEYSPACE = new this()

    /**
     * Support for smallint and tinyint types.
     *
     * @see <a href="https://jira.apache.org/jira/browse/CASSANDRA-8951">CASSANDRA-8951</a>
     */
    static SMALLINT_AND_TINYINT_TYPES = new this()

    /**
     * Support for the date type.
     *
     * @see <a href="https://jira.apache.org/jira/browse/CASSANDRA-7523">CASSANDRA-7523</a>
     */
    static DATE_TYPE = new this()

    /**
     * The ability to set a custom "now" time on statements (for testing purposes).
     *
     * @see <a href="https://issues.apache.org/jira/browse/CASSANDRA-14664">CASSANDRA-14664</a>
     */
    static NOW_IN_SECONDS = new this()

    /**
     * The new protocol framing format introduced in Cassandra 4: wrapping multiple frames into a
     * single "segment" to checksum (and possibly compress) them together.
     *
     * @see <a href="https://issues.apache.org/jira/browse/CASSANDRA-15299">CASSANDRA-15299</a>
     */
    static MODERN_FRAMING = new this()
}