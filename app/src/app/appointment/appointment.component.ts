import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../shared/appointment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  
  public errorMsg: string;
  public successMsg: string;
  public appointmentDate: string;
  public name: string;
  public email: string;

  appointmentForm = new FormGroup({
    date: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
  }

  createAppointment(){
    console.log(this.appointmentForm.value);
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment:Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Boocked Successfully for ${appointmentDate}`;

      },
      (error:ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }
  

}
