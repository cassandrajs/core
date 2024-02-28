import { ProtocolFeature } from "./ProtocolFeature"
import { ProtocolVersion } from "../api/ProtocolVersion"

export abstract class ProtocolVersionRegistry {
    /**
   * Look up a version by its {@link ProtocolVersion#name() name}. This is used when a version was
   * forced in the configuration.
   *
   * @throws IllegalArgumentException if there is no known version with this name.
   * @see DefaultDriverOption#PROTOCOL_VERSION
   */
    abstract fromName(name: String): ProtocolVersion

    /**
     * The highest, non-beta version supported by the driver. This is used as the starting point for
     * the negotiation process for the initial connection (if the version wasn't forced).
     */
    abstract highestNonBeta(): ProtocolVersion

    /**
     * Downgrade to a lower version if the current version is not supported by the server. This is
     * used during the negotiation process for the initial connection (if the version wasn't forced).
     *
     * @return empty if there is no version to downgrade to.
     */
    abstract downgrade(version: ProtocolVersion): ProtocolVersion | null

    /**
     * Computes the highest common version supported by the given nodes. This is called after the
     * initial {@link TopologyMonitor#refreshNodeList()} node refresh} (provided that the version was
     * not forced), to ensure that we proceed with a version that will work with all the nodes.
     *
     * @throws UnsupportedProtocolVersionException if no such version exists (the nodes support
     *     non-intersecting ranges), or if there was an error during the computation. This will cause
     *     the driver initialization to fail.
     */
    abstract highestCommon(nodes: Iterable<Node>): ProtocolVersion

    /** Whether a given version supports a given feature. */
    abstract supports(version: ProtocolVersion, feature: ProtocolFeature): boolean
}