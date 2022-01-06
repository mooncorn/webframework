import { AxiosPromise, AxiosResponse } from "axios";
import { Identifiable } from "./ApiSync";
import { Callback } from "./User";

export interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends Identifiable> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set = (update: T) => {
    this.attributes.set(update);
    this.events.trigger("change");
  };

  fetch = (): void => {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync
      .fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
      .catch(() => {
        this.trigger("fetch-error");
      });
  };

  save = (): void => {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("save-error");
      });
  };
}
