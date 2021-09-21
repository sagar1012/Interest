import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestComponent } from './interest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    InterestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
})
export class InterestModule {
  static forRoot(): ModuleWithProviders<InterestModule> {
    return {
      ngModule: InterestModule,
      providers: [
        ApiService,
      ]
    };
  }
}
