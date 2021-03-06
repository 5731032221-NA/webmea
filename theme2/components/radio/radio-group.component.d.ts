import { AfterContentInit, EventEmitter, OnDestroy, QueryList, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NbRadioComponent } from './radio.component';
import { NbComponentStatus } from '../component-status';
/**
 * The `NbRadioGroupComponent` is the wrapper for `nb-radio` button.
 * It provides form bindings:
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Also, you can use `value` and `valueChange` for binding without forms.
 *
 * ```html
 * <nb-radio-group [(value)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Radio items name has to be provided through `name` input property of the radio group.
 *
 * ```html
 * <nb-radio-group name="my-radio-group">
 *   ...
 * </nb-radio-group>
 * ```
 *
 * You can change radio group status by setting `status` input.
 * @stacked-example(Statuses, radio/radio-statuses.component)
 *
 * Also, you can disable the whole group using `disabled` attribute.
 * @stacked-example(Disabled group, radio/radio-disabled-group.component)
 *
 * */
export declare class NbRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
    protected hostElement: ElementRef<HTMLElement>;
    protected platformId: any;
    protected document: any;
    protected alive: boolean;
    protected isTouched: boolean;
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    value: any;
    protected _value: any;
    name: string;
    protected _name: string;
    disabled: boolean;
    protected _disabled: boolean;
    /**
     * Radio buttons status.
     * Possible values are `primary` (default), `success`, `warning`, `danger`, `info`.
     */
    status: '' | NbComponentStatus;
    protected _status: '' | NbComponentStatus;
    radios: QueryList<NbRadioComponent>;
    valueChange: EventEmitter<any>;
    constructor(hostElement: ElementRef<HTMLElement>, platformId: any, document: any);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
    protected updateAndSubscribeToRadios(): void;
    protected updateNames(): void;
    protected updateValues(): void;
    protected updateDisabled(): void;
    protected subscribeOnRadiosValueChange(): void;
    protected propagateValue(value: any): void;
    protected subscribeOnRadiosBlur(): void;
    protected markTouched(): void;
    protected updateStatus(): void;
}
