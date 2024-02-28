import { Marker } from "./Marker"

export abstract class Logger {
    static ROOT_LOGGER_NAME: string = "ROOT"

    abstract getName(): string

    abstract debug(...args: any[]): void

    abstract error(...args: any[]): void

    abstract info(...args: any[]): void

    abstract trace(...args: any[]): void

    abstract warn(...args: any[]): void

    abstract isDebugEnabled(marker?: Marker): boolean

    abstract isErrorEnabled(marker?: Marker): boolean

    abstract isInfoEnabled(marker?: Marker): boolean

    abstract isTraceEnabled(marker?: Marker): boolean

    abstract isWarnEnabled(marker?: Marker): boolean
}