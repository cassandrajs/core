import { ExecutionInfo } from "../lib/cql/ExecutionInfo"
import { AllNodesFailedError } from "./AllNodesFailedError"

export class NoNodeAvailableError extends AllNodesFailedError {
	constructor(executionInfo?: ExecutionInfo) {
		super("No node was available to execute the query", executionInfo, [])
	}
}
