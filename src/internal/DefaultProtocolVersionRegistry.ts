import { LoggerFactory } from "../logging/LoggerFactory"
import { DefaultProtocolVersion } from "../api/DefaultProtocolVersion"
import { ProtocolVersion } from "../api/ProtocolVersion"
import { ProtocolVersionRegistry } from "./ProtocolVersionRegistry"

export class DefaultProtocolVersionRegistry implements ProtocolVersionRegistry {
    private static LOG = LoggerFactory.getLogger(DefaultProtocolVersionRegistry)

    private static allVersions: ProtocolVersion[] = [
        ...DefaultProtocolVersion.values()
    ]

    fromName(name: String): number {
        throw new Error("Method not implemented.")
    }
    highestNonBeta(): number {
        throw new Error("Method not implemented.")
    }
    downgrade(version: number): number {
        throw new Error("Method not implemented.")
    }
    highestCommon(nodes: Iterable<Node>): number {
        throw new Error("Method not implemented.")
    }
    supports(version: number, feature: number): boolean {
        throw new Error("Method not implemented.")
    }

}