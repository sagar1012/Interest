import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  interest = [
    'Angular',
    'React',
    'Vue',
    'Flutter',
    'Node.JS',
    '.Net',
  ];
  interestList: any = [];
  isEdit: boolean = false;
  documentId: any;
  ismultiSpace: boolean = false;
  currentPage: any = 1;
  totalpage: any;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      interest: [[], Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getInterest();
  }

  get f() { return this.registerForm.controls; }

  getInterest(item?: any, value?: any) {

    var body: any = {};
    if (item == 'sort') {
      body = {
        sortBy: value
      }
    }
    if (item == 'pagination') {
      if (value == 'previous') {
        if (this.currentPage > 1)
          this.currentPage = this.currentPage - 1;

        body = {
          pageNumber: this.currentPage
        }
      }
      if (value == 'next') {
        if (this.currentPage >= 0)
          this.currentPage = this.currentPage + 1;
        body = {
          pageNumber: this.currentPage
        }
      }
    }
    if (item == 'filter') {
      body = {
        statusKey: 'fullName',
        statusValue: value && value.target ? value.target.value : ''
      }
    }
    this.apiService
      .post(
        "interest/get", body
      )
      .subscribe((response) => {
        if (response.status) {
          this.interestList = response.message.data;
          if (response.message.meta && response.message.meta.pagination)
            this.totalpage = response.message.meta.pagination.total_pages;
        }
      });
  }

  hasWhiteSpace(s: any) {
    if ((s.split(" ").length - 1) > 1) {
      this.ismultiSpace = true;
    } else {
      this.ismultiSpace = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.hasWhiteSpace(this.registerForm.value.fullName);
    if (this.registerForm.invalid || this.ismultiSpace) {
      return;
    }
    if (!this.isEdit) {
      this.apiService
        .post(
          "interest/add", this.registerForm.value
        )
        .subscribe((response) => {
          if (response.status) {
            this.toastr.success('Added Successfully!');

            this.getInterest();
            this.onReset();
            document.getElementById('closeBtn')?.click();
          }
        });
    } else {
      const body = {
        fullName: this.registerForm.value.fullName,
        gender: this.registerForm.value.gender,
        interest: this.registerForm.value.interest,
        email: this.registerForm.value.email,
        documentId: this.documentId
      }
      this.apiService
        .put(
          "interest/update", body
        )
        .subscribe((response) => {
          if (response.status) {
            this.toastr.success('Update Successfully!');
            this.getInterest();
            this.onReset();
            document.getElementById('closeBtn')?.click();
          }
        });
    }
  }

  delete(id?: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService
          .delete(
            "interest/delete", { documentId: id }
          )
          .subscribe((response) => {
            if (response.status) {
              this.toastr.success('Record delete successfully!');
              this.getInterest();
            }
          });
      }
    })
  }

  edit(data?: any) {
    this.isEdit = true;
    this.documentId = data._id;
    this.registerForm.setValue({
      fullName: data.fullName,
      gender: data.gender,
      interest: data.interest,
      email: data.email,
    });
  }

  openModal() {
    this.isEdit = false;

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }



}
