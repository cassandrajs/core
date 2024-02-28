import { ExecutionInfo } from "../lib/cql/ExecutionInfo"
import { DriverError } from "./DriverError"

export class RequestThrottlingError extends DriverError {
	constructor(message: string, executionInfo?: ExecutionInfo) {
		super(message, executionInfo)
	}
}
