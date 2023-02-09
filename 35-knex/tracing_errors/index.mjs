import express from 'express';
import PinoHttp from 'pino-http';
const app = express();
const { LOG_LEVEL = "info", NODE_ENV = "development" } = process.env;
import { nanoid } from 'nanoid'
const prettyPrint = {
    target: 'pino-pretty',
    options: {
        colorize: true,
    }
}

const loggerMiddleWare = PinoHttp({
    level: LOG_LEVEL,
    genReqId: (req) => req.get("x-request-id") || nanoid(),
    transport: NODE_ENV === "development" ? prettyPrint : false
});

app.use(loggerMiddleWare)

app.get("/sum/:left/:right", (req, res, _next) => {
    const { left, right } = req.params
    const methodName = "sum";
    req.log.debug({ methodName });

    const result = Number(left) + Number(right);

    res.json(result);
    req.log.trace({ methodName, return: true, data: result });
})

// app.use((req, res, _next) => {
//     req.log.info("Doing work")
//     next()
// })

app.listen(5000)