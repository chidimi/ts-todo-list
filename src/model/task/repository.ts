import { ITask } from "./task";

/**
 * タスクを管理するリポジトリ
 */
export class Repository{
    private tasks: ITask[];

    constructor(){
        this.tasks = [
            {
                id: 1,
                text: "task1",
                done: false,
            },
            {
                id: 2,
                text: "task2",
                done: false,
            },
        ];
    }

    /**
     * タスクを追加する
     * @param task 追加するタスク
     * @returns 裁判されたタスク
     */
    public AddTask(task: ITask): number {
        if(task.done === undefined){
            task.done = false;
        }
        task.id = this.tasks[this.tasks.length - 1].id + 1;
        this.tasks.push(task);
        return task.id;
    }

    /**
     * タスクの一覧を取得する
     * @returns タスクリスト
     */
    public ListTasks(): ITask[] {
        return this.tasks.filter((task) => !task.done);
    }

    /**
     * タスクを完了にする
     * @param id 完了にするタスクid
     */
    public DoneTask(id: number){
        this.tasks.forEach((task) => {
            if(task.id === id){
                task.done = true;
            }
        });
    }
}


