/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule } from '../icon/icon.module';
import { NbAccordionComponent } from './accordion.component';
import { NbAccordionItemComponent } from './accordion-item.component';
import { NbAccordionItemHeaderComponent } from './accordion-item-header.component';
import { NbAccordionItemBodyComponent } from './accordion-item-body.component';
const NB_ACCORDION_COMPONENTS = [
    NbAccordionComponent,
    NbAccordionItemComponent,
    NbAccordionItemHeaderComponent,
    NbAccordionItemBodyComponent,
];
let NbAccordionModule = class NbAccordionModule {
};
NbAccordionModule = __decorate([
    NgModule({
        imports: [CommonModule, NbIconModule],
        exports: [...NB_ACCORDION_COMPONENTS],
        declarations: [...NB_ACCORDION_COMPONENTS],
        providers: [],
    })
], NbAccordionModule);
export { NbAccordionModule };
//# sourceMappingURL=accordion.module.js.map