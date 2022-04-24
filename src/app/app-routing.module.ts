import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsListComponent } from './events/events.list.component';
import { EventDetailsComponent } from './events/event.details.component';
import { EmployersListComponent } from './employers/employers.list.component';
import { EmployeeDetailsComponent } from './employers/employee.details.component';

const routes: Routes = [
{ path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'employers', component: EmployersListComponent },
  { path: 'employers/:id', component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
