import { Routes } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { ValueComponent } from "./value/value.component";
import { CityDetailComponent } from "./city/city-detail/city-detail.component";

export const appRoutes: Routes = [
    { path: "city", component: CityComponent },
    { path: "value", component: ValueComponent },
    { path: "cityDetail/:cityId", component: CityDetailComponent },
    { path: "**", redirectTo: "city", pathMatch: "full" }
]