import { ExecutionInfo } from "../lib/cql/ExecutionInfo"
import { DriverError } from "./DriverError"

export class DriverTimeoutError extends DriverError {
	constructor(message: string, executionInfo?: ExecutionInfo) {
		super(message, executionInfo)
	}
}
