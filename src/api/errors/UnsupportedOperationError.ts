import { ExecutionInfo } from "../cql/ExecutionInfo"
import { DriverError } from "./DriverError"

export class UnsupportedOperationError extends DriverError {
	constructor(message: string, executionInfo?: ExecutionInfo) {
		super(message, executionInfo)
	}
}
