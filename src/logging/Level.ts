import { IllegalArgumentError } from "../errors/IllegalArgumentError"
import { EventConstants } from "./EventConstants"

export class Level {

    static ERROR = new this(EventConstants.ERROR_INT, "ERROR")
    static WARN = new this(EventConstants.WARN_INT, "WARN")
    static INFO = new this(EventConstants.INFO_INT, "INFO")
    static DEBUG = new this(EventConstants.DEBUG_INT, "DEBUG")
    static TRACE = new this(EventConstants.TRACE_INT, "TRACE")

    levelInt: number
    levelStr: string

    constructor(i: number, s: string) {
        this.levelInt = i
        this.levelStr = s
    }

    toString() {
        return this.levelStr;
    }

    toInt() {
        return this.levelInt
    }

    static intToLevel(levelInt: number): Level {
        switch (levelInt) {
        case (EventConstants.TRACE_INT):
            return Level.TRACE;
        case (EventConstants.DEBUG_INT):
            return Level.DEBUG;
        case (EventConstants.INFO_INT):
            return Level.INFO;
        case (EventConstants.WARN_INT):
            return Level.WARN;
        case (EventConstants.ERROR_INT):
            return Level.ERROR;
        default:
            throw new IllegalArgumentError("Level integer [" + levelInt + "] not recognized.");
        }
    }
}