
import express from "express";
import bodyParser from "body-parser";
import { ITask } from "../model/task/task";
import { Repository } from "../model/task/repository";

/**
 * API setting
 */
export interface IConfig {
    ListenHost: string;
    WebRoot: string;
}

/**
 * API
 */
export class API{
    private app: express.Express;
    private repository: Repository;
    private conf: IConfig;

    constructor(conf: IConfig) {
        this.repository = new Repository();
        this.app = express();
        this.conf = conf;
        this.routing();
    }

    public Run = () => {
        this.app.listen( this.conf.ListenHost);
    }

    public routing() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.get("/api/tasks", this.list);
        this.app.post("/api/tasks", this.create);

        this.app.use("/", express.static(this.conf.WebRoot));
    }

    private list = (req: express.Request, res: express.Response) => {
        const tasks = this.repository.ListTasks();
        res.json(tasks);
    }

    private create = (req:express.Request, res: express.Response) => {
        const task: ITask = req.body;
        const id = this.repository.AddTask(task);
        res.json({ id });
    }
}


