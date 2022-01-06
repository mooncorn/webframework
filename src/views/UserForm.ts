import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap = (): { [key: string]: () => void } => {
    return {
      "click:#rand-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
      "click:#save": this.onUserSave,
    };
  };

  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  onSetNameClick = () => {
    const input = this.parent.querySelector("input");

    if (!input) {
      throw new Error("Input element not found");
    }

    const name = input.value;

    this.model.set({ name });
  };

  onUserSave = () => {
    this.model.save();
  };

  template = (): string => {
    return `
      <div>
        <input placeholder="${this.model.get("name")}"/>
        <button id="set-name">Change name</button>
        <button id="rand-age">Set random age</button>
        <button id="save">Save</button>
      </div>
    `;
  };
}
