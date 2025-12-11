import { Auth, define, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import type { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

import { LandingView } from "./views/landing-view.ts";
import { HeaderElement } from "./components/header.ts";
import { TransportationViewElement } from "./views/transportation-view";
import { RestaurantsViewElement } from "./views/restaurants-view";
import { SightseeingViewElement } from "./views/sightseeing-view";
import { PackingViewElement } from "./views/packing-view";
import { BudgetViewElement } from "./views/budget-view";
import { TravelerViewElement } from "./views/traveler-view";
import { LoginPage } from "./auth/login-page";
import { TravelerEditElement } from "./views/profile-edit";

const routes = [
  {
    path: "/app/transportation",
    view: () => html` <transportation-view></transportation-view> `,
  },
  {
    path: "/app/restaurants",
    view: () => html` <restaurants-view></restaurants-view> `,
  },
  {
    path: "/app/sightseeing",
    view: () => html` <sightseeing-view></sightseeing-view> `,
  },
  {
    path: "/app/packing",
    view: () => html` <packing-view></packing-view> `,
  },
  {
    path: "/app/budget",
    view: () => html` <budget-view></budget-view> `,
  },
  {
    path: "/app/traveler/:userid/edit",
    view: (params: Switch.Params) => html`
      <traveler-edit userid=${params.userid}></traveler-edit>
    `,
  },
  {
    path: "/app/traveler/:userid",
    view: (params: Switch.Params) => html`
      <traveler-view userid=${params.userid}></traveler-view>
    `,
  },
  {
    path: "/login",
    view: () => html`<login-page></login-page>`,
  },
  {
    path: "/app",
    view: () => html` <landing-view></landing-view> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

// Define all custom elements
define({
  "traveler-edit": TravelerEditElement,
  "login-page": LoginPage,
  "landing-view": LandingView,
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,

  "mu-store": class MiniatureStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "miniature:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "miniature:history", "miniature:auth");
    }
  },
  "app-header": HeaderElement,
  "transportation-view": TransportationViewElement,
  "restaurants-view": RestaurantsViewElement,
  "sightseeing-view": SightseeingViewElement,
  "packing-view": PackingViewElement,
  "budget-view": BudgetViewElement,
  "traveler-view": TravelerViewElement,
});

// Dark mode toggle functionality
document.body.addEventListener("dark-mode:toggle", (event) => {
  const page = event.currentTarget as HTMLElement;
  const checked = (event as CustomEvent).detail.checked;
  page.classList.toggle("dark-mode", checked);
});

declare global {
  interface Window {
    toggleDarkMode: (target: HTMLElement, checked: boolean) => void;
  }
}

window.toggleDarkMode = function (target: HTMLElement, checked: boolean) {
  const customEvent = new CustomEvent("dark-mode:toggle", {
    bubbles: true,
    detail: { checked },
  });
  target.dispatchEvent(customEvent);
};
