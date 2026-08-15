import { addZone, removeZone } from '@lib/server';

export class TaskManager {
  protected static instance: TaskManager;
  protected static taskProgress: Map<number, number> = new Map();

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  initialized = false;

  constructor() {
    //
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
  }

  startTask(serverId: number) {
    TaskManager.taskProgress.set(serverId, 0);

    addZone({
      _type: 'sphere',
      name: 'research_job_task_start',
      coords: { x: -366.51, y: 797.32, z: 115.22 },
      radius: 4.5,
      onEnter: (serverId: number) => {
        console.log(`this.progressTask(${serverId}) called from research_job_task_start zone`);
        this.progressTask(serverId);
      },
    });

    addZone({
      _type: 'sphere',
      name: 'research_job_task_end',
      coords: { x: -325.87, y: 772.27, z: 116.44 },
      radius: 2.0,
      onEnter: () => {
        this.progressTask(serverId);
      },
    });
  }

  progressTask(serverId: number) {
    const progress = TaskManager.taskProgress.get(serverId);

    console.log(`Player ${serverId} is at progress stage: ${progress}`);

    if (progress === 0) {
      TaskManager.taskProgress.set(serverId, 1);
      console.log(`Player ${serverId} has progressed to stage 1 of the task.`);
    } else if (progress === 1) {
      TaskManager.taskProgress.set(serverId, 2);
      console.log(`Player ${serverId} has completed the task.`);
      this.endTask();
    }
  }

  private endTask() {
    removeZone('research_job_task_start');
  }
}

const taskManager = TaskManager.getInstance();

export default taskManager;
