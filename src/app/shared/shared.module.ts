import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class SharedModule { }