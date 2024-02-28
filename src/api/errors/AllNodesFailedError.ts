import { ExecutionInfo } from "../lib/cql/ExecutionInfo"
import { DriverError } from "./DriverError"
import { NoNodeAvailableError } from "./NoNodeAvailableError"

export class AllNodesFailedError extends DriverError {
	errors: any[]

	constructor(message: string, executionInfo?: ExecutionInfo, errors?: any[]) {
		super(message, executionInfo)
		this.errors = [...errors]
	}

	static fromErrors(errors): AllNodesFailedError | NoNodeAvailableError {
		if (errors == null || errors.isEmpty()) {
			return new NoNodeAvailableError()
		} else {
			return new AllNodesFailedError(
				`All ${errors.size} node(s) tried for the query failed`,
				undefined,
				errors
			)
		}
	}
}
