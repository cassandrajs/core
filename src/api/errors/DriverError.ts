import { ExecutionInfo } from "../cql/ExecutionInfo"

export class DriverError extends Error {
	executionInfo: ExecutionInfo

	constructor(message: string, executionInfo?: ExecutionInfo) {
		super(message)
		this.executionInfo = executionInfo
	}
}
