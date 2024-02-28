import { SimpleLogger } from "./SimpleLogger"

export class LoggerFactory {
    static getLogger(nameOrClazz: string | { new(): void }) {
        if(typeof nameOrClazz !== "string" && nameOrClazz.name) {
            nameOrClazz = nameOrClazz.name
        }

        if(typeof nameOrClazz !== "string" && typeof nameOrClazz.toString == "function") {
            nameOrClazz = nameOrClazz.toString()
        }

        if(typeof nameOrClazz !== "string") {
            nameOrClazz = `${nameOrClazz}`
        }

        return new SimpleLogger(nameOrClazz)
    }
}