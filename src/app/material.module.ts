import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule { }