// TravelerEditElement.ts (or similar)
import { define, Form, View, History } from "@calpoly/mustang";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { Model } from "../model";
import { Msg } from "../messages";
import { Traveler } from "server/models";

export class TravelerEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property()
  userid?: string;

  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  render() {
    return html`
      <main class="page">
        <mu-form
          .init=${this.profile}
          @mu-form:submit=${this.handleSubmit}>
          <!-- Your form fields here -->
          <label>
            <span>Name:</span>
            <input name="name" />
          </label>
          <!-- More fields... -->
          <button type="submit">Save</button>
        </mu-form>
      </main>
    `;
  }

handleSubmit(event: Form.SubmitEvent<Traveler>) {
  if (!this.userid) {
    console.error("No userid available");
    return;
  }
  
  this.dispatchMessage([
    "profile/save",
    {
      userid: this.userid, // TypeScript knows it's defined here
      profile: event.detail
    },
    {
      onSuccess: () =>
        History.dispatch(this, "history/navigate", {
          href: `/app/traveler/${this.userid}`
        }),
      onFailure: (error: Error) =>
        console.log("ERROR:", error)
    }
  ]);
}

}