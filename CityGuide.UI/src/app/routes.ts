import { Routes } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { ValueComponent } from "./value/value.component";
import { CityDetailComponent } from "./city/city-detail/city-detail.component";
import { CityAddComponent } from "./city/city-add/city-add.component";
import { RegisterComponent } from "./register/register.component";

export const appRoutes: Routes = [
    { path: "city", component: CityComponent },
    { path: "register", component: RegisterComponent },
    { path: "cityadd", component: CityAddComponent },
    { path: "cityDetail/:cityId", component: CityDetailComponent },
    { path: "value", component: ValueComponent },
    { path: "**", redirectTo: "city", pathMatch: "full" }
]