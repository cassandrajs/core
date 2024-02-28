import Long from "long"
import { IllegalArgumentError } from "../errors/IllegalArgumentError"
import { arrayEquals } from "../utils/arrayEquals"
import { HashObject } from "@cassandrajs/protocol"

export class Version {
    static serialVersionUID: Long = Long.fromNumber(1)

    static pattern: RegExp = /(\d+)\.(\d+)(\.\d+)?(\.\d+)?([~\-]\w[.\w]*(?:-\w[.\w]*)*)?(\+[.\w]+)?/

    static V2_1_0 = this.parse("2.1.0");
    static V2_2_0 = this.parse("2.2.0");
    static V3_0_0 = this.parse("3.0.0");
    static V4_0_0 = this.parse("4.0.0");
    static V5_0_0 = this.parse("5.0.0");
    static V6_7_0 = this.parse("6.7.0");
    static V6_8_0 = this.parse("6.8.0");

    static parse(version: string) {
        if (!version) return null

        const match = this.pattern.exec(version)

        if (match === null) {
            throw new IllegalArgumentError("Invalid version number: " + version)
        }

        try {
            const major = parseInt(match[1])
            const minor = parseInt(match[2])

            const patchString = match[3]
            const patch: number = patchString && patchString.length > 1 ? parseInt(patchString.substring(1)) : 0

            const dsePatchString = match[4]
            const dsePatch: number = dsePatchString && dsePatchString.length > 1 ? parseInt(dsePatchString.substring(1)) : -1

            const preReleaseString = match[5]
            const preReleases: string[] = preReleaseString && preReleaseString.length > 1 ? preReleaseString.substring(1).split("-") : null

            const buildString = match[6]
            const build = buildString && buildString.length > 1 ? buildString.substring(1) : null

            return new Version(major, minor, patch, dsePatch, preReleases, build)
        } catch (e) {
            throw new IllegalArgumentError("Invalid version number: " + version)
        }
    }

    private major: number
    private minor: number
    private patch: any
    private dsePatch: number
    private preReleases: string[]
    private build: string

    constructor(major: number, minor: number, patch: number, dsePatch: number, preReleases: string[], build: string) {
        this.major = major
        this.minor = minor
        this.patch = patch
        this.dsePatch = dsePatch
        this.preReleases = preReleases
        this.build = build
    }

    getMajor() {
        return this.major
    }

    getMinor() {
        return this.minor
    }

    getDSEPatch() {
        return this.dsePatch
    }

    getPreReleaseLabels(): string[] | null {
        return this.preReleases ? this.preReleases : null
    }

    getBuildLabel() {
        return this.build
    }

    nextStable() {
        return new Version(this.major, this.minor, this.patch, this.dsePatch, null, null)
    }

    compareTo(other: Version): number {
        if (this.major < other.major) {
            return -1
        }
        if (this.major > other.major) {
            return 1
        }

        if (this.minor < other.minor) {
            return -1
        }
        if (this.minor > other.minor) {
            return 1
        }

        if (this.patch < other.patch) {
            return -1
        }
        if (this.patch > other.patch) {
            return 1
        }

        if (this.dsePatch < 0) {
            if (other.dsePatch >= 0) {
                return -1
            }
        } else {
            if (other.dsePatch < 0) {
                return 1
            }

            // Both are >= 0
            if (this.dsePatch < other.dsePatch) {
                return -1
            }
            if (this.dsePatch > other.dsePatch) {
                return 1
            }
        }

        if (this.preReleases === null) {
            return other.preReleases === null ? 0 : 1
        }
        if (other.preReleases === null) {
            return -1
        }

        for (let i = 0; i < Math.min(this.preReleases.length, other.preReleases.length); i++) {
            // Assuming elements of preReleases are strings
            let cmp = this.preReleases[i].localeCompare(other.preReleases[i])
            if (cmp !== 0) {
                return cmp
            }
        }

        // Compare length of preReleases arrays
        return this.preReleases.length - other.preReleases.length
    }

    equals(other: any): boolean {
        if (other === this) {
            return true
        } else if (other instanceof Version) {
            return this.major === other.major
                && this.minor === other.minor
                && this.patch === other.patch
                && this.dsePatch === other.dsePatch
                && arrayEquals(this.preReleases, other.preReleases)
                && this.build === other.build
        } else {
            return false
        }
    }

    hashCode() {
        return HashObject([this.major, this.minor, this.patch, this.dsePatch, HashObject(this.preReleases), this.build])
    }

    toString() {
        let sb = `${this.major}.${this.minor}.${this.patch}`

        if (this.dsePatch >= 0) {
            sb += `.${this.dsePatch}`
        }

        if (this.preReleases) {
            for (const preRelease of this.preReleases) {
                sb += `-${preRelease}`
            }
        }

        if (this.build) {
            sb += `+${this.build}`
        }

        return sb
    }
}