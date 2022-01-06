import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "": () => {},
    };
  }

  template(): string {
    return `
      <div>
        <h1>User Detais</h1>
        <div>User name: ${this.model.get("name")}</div>
        <div>User age: ${this.model.get("age")}</div>
        <div>User id: ${this.model.get("id")}</div>
      </div>
    `;
  }
}
