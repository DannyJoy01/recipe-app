import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level.toLocaleUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Log messages to the console
        new transports.File({filename: "logs/error.log", level: "error"}), // Log error messages to error.log
        new transports.File({filename: "logs/combined.log"}), // Log all messages to combined.log
    ],
});

export default logger;
