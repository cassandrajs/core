import { IllegalStateError } from "../errors/IllegalStateError"
import { AbstractLogger } from "./AbstractLogger"
import { EventConstants } from "./EventConstants"
import { Level } from "./Level"
import { Marker } from "./Marker"

export interface SimpleLoggerConfig {
    level: number
    showDateTime: boolean
    levelInBrackets: boolean
    showLogName: boolean
    dateFormatter: { format: (date: Date) => string }
}

export class SimpleLogger extends AbstractLogger {

    static SP = ' '

    static DEFAULT_CONFIG: SimpleLoggerConfig = {
        level: EventConstants.INFO_INT,
        showDateTime: false,
        levelInBrackets: true,
        showLogName: true,
        dateFormatter: { format: (date: Date) => date.toISOString() }
    }

    currentLogLevel: number = EventConstants.INFO_INT
    config: SimpleLoggerConfig

    constructor(name: string, config?: Partial<SimpleLoggerConfig>) {
        super()
        this.name = name
        this.config = { ...SimpleLogger.DEFAULT_CONFIG, ...config }
        this.currentLogLevel = config.level || EventConstants.INFO_INT
    }

    handleNormalizedLoggingCall(level: Level, ...args: any[]): void {
        const now = new Date()
        let header = '';

        // Date

        if(this.config.showDateTime) {
            header += this.config.dateFormatter && this.config.dateFormatter.format ? this.config.dateFormatter.format(now) : now.toLocaleTimeString()
            header += SimpleLogger.SP
        }

        // Level

        if(this.config.levelInBrackets) {
            header += '['
        }

        header += this.renderLevel(level.toInt());

        if(this.config.levelInBrackets) {
            header += ']'
        }

        header += SimpleLogger.SP

        // Logger name

        if(this.config.showLogName) {
            header += `${this.name} - `
        }

        // Message
        console.log(header, args)
    }

    isDebugEnabled(marker?: Marker): boolean {
        return this.isLevelEnabled(EventConstants.DEBUG_INT)
    }

    isErrorEnabled(marker?: Marker): boolean {
        return this.isLevelEnabled(EventConstants.ERROR_INT)
    }

    isInfoEnabled(marker?: Marker): boolean {
        return this.isLevelEnabled(EventConstants.INFO_INT)
    }

    isTraceEnabled(marker?: Marker): boolean {
        return this.isLevelEnabled(EventConstants.TRACE_INT)
    }

    isWarnEnabled(marker?: Marker): boolean {
        return this.isLevelEnabled(EventConstants.WARN_INT)
    }

    private isLevelEnabled(logLevel: number) {
        return (logLevel >= this.currentLogLevel);
    }

    private renderLevel(levelInt: number) {
        switch (levelInt) {
            case EventConstants.TRACE_INT:
                return "TRACE";
            case EventConstants.DEBUG_INT:
                return("DEBUG");
            case EventConstants.INFO_INT:
                return "INFO";
            case EventConstants.WARN_INT:
                return "WARN";
            case EventConstants.ERROR_INT:
                return "ERROR";
        }
        throw new IllegalStateError("Unrecognized level ["+levelInt+"]");
    }
}