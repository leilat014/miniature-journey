import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { LoginFormElement } from "./login-form";
import { Auth, define } from "@calpoly/mustang";

@customElement("login-page")
export class LoginPage extends LitElement {
  render() {
    return html`
      <section class="login-page">
        <h2>Sign In</h2>

        <login-form
          api="/auth/login"
          redirect="/app"
        >
          <label>
            Username
            <input name="username" type="text" />
          </label>

          <label>
            Password
            <input name="password" type="password" />
          </label>
        </login-form>
      </section>
    `;
  }

  static styles = css`
    .login-page {
      max-width: 400px;
      margin: 5rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
  `;
}


define({
  "mu-auth": Auth.Provider,
  "login-form": LoginFormElement,
});
