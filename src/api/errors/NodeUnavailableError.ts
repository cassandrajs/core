import { DriverError } from "./DriverError"

export class NodeUnavailableError extends DriverError {
	node: string

	constructor(node: string) {
		super("No connection was available to " + node)
		this.node = node
	}
}
