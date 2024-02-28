import { ExecutionInfo } from "../cql/ExecutionInfo"
import { DriverError } from "./DriverError"

export class UnsupportedProtocolVersionError extends DriverError {
	endPoint: string
	attemptedVersions: any[]

	constructor(
		endPoint: string,
		message: string,
		attemptedVersions: string[],
		executionInfo?: ExecutionInfo
	) {
		super(message, executionInfo)
		this.endPoint = endPoint
		this.attemptedVersions = attemptedVersions
	}

	static forNegotiation(
		endPoint,
		attemptedVersions
	): UnsupportedProtocolVersionError {
		return new UnsupportedProtocolVersionError(
			endPoint,
			`[${endPoint}] Protocol negotiation failed: could not find a common version (attempted: ${attemptedVersions}). ` +
				"Note that the driver does not support Cassandra 2.0 or lower.",
			[...attemptedVersions],
			null
		)
	}

	static forSingleAttempt(endPoint, attemptedVersion) {
		return new UnsupportedProtocolVersionError(
			endPoint,
			`[${endPoint}] Host does not support protocol version ${attemptedVersion}`,
			[attemptedVersion],
			null
		)
	}
}
