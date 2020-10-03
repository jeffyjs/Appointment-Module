import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../shared/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit() {
    this.appointmentService.getAppointment()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancleAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointment())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled appointment';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}