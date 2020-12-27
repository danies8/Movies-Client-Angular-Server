import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';


import { CriteriaComponent } from './criteria/criteria.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    
  ],
  declarations: [
    CriteriaComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    CriteriaComponent,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    
  ]
})
export class SharedModule { }
