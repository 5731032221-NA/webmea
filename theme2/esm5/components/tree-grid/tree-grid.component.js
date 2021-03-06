/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, HostBinding, Inject, Input, IterableDiffers, QueryList, } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { NB_DOCUMENT, NB_WINDOW } from '../../theme.options';
import { NbPlatform } from '../cdk/platform/platform-service';
import { NbDirectionality } from '../cdk/bidi/bidi-service';
import { NB_TABLE_TEMPLATE, NbTable } from '../cdk/table/table.module';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridRowComponent } from './tree-grid-row.component';
import { convertToBoolProperty } from '../helpers';
import { NbColumnsService } from './tree-grid-columns.service';
/**
 * Tree grid component that can be used to display nested rows of data.
 * Supports filtering and sorting.
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTreeGridModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTreeGridModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * As the most basic usage you need to define [nbTreeGridRowDef](docs/components/treegrid/api#nbtreegridrowdefdirective)
 * where you should pass columns to display in rows and
 * [nbTreeGridColumnDef](docs/components/treegrid/api#nbtreegridcolumndefdirective) - component containing cell
 * definitions for each column passed to row definition.
 * @stacked-example(Basic, tree-grid/tree-grid-basic.component)
 *
 * `NbTreeGridComponent`'s source input and `NbTreeGridDataSourceBuilder.create` expecting data to be an array of
 * objects with `data`, `children` and `expanded` properties. If your data doesn't match this interface, you can pass
 * getter functions for each property as arguments to `NbTreeGridDataSourceBuilder.create` method.
 * @stacked-example(Custom node structure, tree-grid/tree-grid-custom-node-structure.component)
 *
 * To use sorting you can add `nbSort` directive to table and subscribe to `sort` method. When user click on header,
 * sort event will be emitted. Event object contain clicked column name and desired sort direction.
 * @stacked-example(Sortable, tree-grid/tree-grid-sortable.component)
 *
 * You can use `Data Source Builder` to create `NbTreeGridDataSource` which would have toggle, sort and
 * filter methods. Then you can call this methods to change sort or toggle rows programmatically. Also `nbSort` and
 * `nbFilterInput` directives both support `NbTreeGridDataSource`, so you can pass it directly as an input and
 * directives will trigger sort, toggle themselves.
 * @stacked-example(Data Source Builder, tree-grid/tree-grid-showcase.component)
 *
 * You can create responsive grid by setting `hideOn` and `showOn` inputs of
 * [nbTreeGridColumnDef](docs/components/tree-grid/api#nbtreegridcolumndefdirective) directive.
 * When viewport reaches specified width grid hides or shows columns.
 * @stacked-example(Responsive columns, tree-grid/tree-grid-responsive.component)
 *
 * To customize sort or row toggle icons you can use `nbSortHeaderIcon` and `nbTreeGridRowToggle` directives
 * respectively. `nbSortHeaderIcon` is a structural directive and it's implicit context set to current direction.
 * Also context has three properties: `isAscending`, `isDescending` and `isNone`.
 * @stacked-example(Custom icons, tree-grid/tree-grid-custom-icons.component)
 *
 * By default, row to toggle happens when user clicks anywhere in the row. Also double click expands row deeply.
 * To disable this you can set `[clickToToggle]="false"` input of `nbTreeGridRow`.
 * @stacked-example(Disable click toggle, tree-grid/tree-grid-disable-click-toggle.component)
 *
 * @styles
 *
 * tree-grid-cell-border-width:
 * tree-grid-cell-border-style:
 * tree-grid-cell-border-color:
 * tree-grid-row-min-height:
 * tree-grid-cell-padding:
 * tree-grid-header-background-color:
 * tree-grid-header-text-color:
 * tree-grid-header-text-font-family:
 * tree-grid-header-text-font-size:
 * tree-grid-header-text-font-weight:
 * tree-grid-header-text-line-height:
 * tree-grid-footer-background-color:
 * tree-grid-footer-text-color:
 * tree-grid-footer-text-font-family:
 * tree-grid-footer-text-font-size:
 * tree-grid-footer-text-font-weight:
 * tree-grid-footer-text-line-height:
 * tree-grid-row-background-color:
 * tree-grid-row-even-background-color:
 * tree-grid-row-hover-background-color:
 * tree-grid-row-text-color:
 * tree-grid-row-text-font-family:
 * tree-grid-row-text-font-size:
 * tree-grid-row-text-font-weight:
 * tree-grid-row-text-line-height:
 * tree-grid-sort-header-button-background-color:
 * tree-grid-sort-header-button-border:
 * tree-grid-sort-header-button-padding:
 */
var NbTreeGridComponent = /** @class */ (function (_super) {
    __extends(NbTreeGridComponent, _super);
    function NbTreeGridComponent(dataSourceBuilder, differs, changeDetectorRef, elementRef, role, dir, document, platform, window) {
        var _this = _super.call(this, differs, changeDetectorRef, elementRef, role, dir, document, platform) || this;
        _this.dataSourceBuilder = dataSourceBuilder;
        _this.window = window;
        _this.alive = true;
        _this.levelPadding = '';
        _this.equalColumnsWidthValue = false;
        _this.treeClass = true;
        _this.platform = platform;
        return _this;
    }
    NbTreeGridComponent_1 = NbTreeGridComponent;
    Object.defineProperty(NbTreeGridComponent.prototype, "source", {
        /**
         * The table's data
         * @param data
         * @type {<T>[] | NbTreeGridDataSource}
         */
        set: function (data) {
            if (!data) {
                return;
            }
            if (data instanceof NbTreeGridDataSource) {
                this._source = data;
            }
            else {
                this._source = this.dataSourceBuilder.create(data);
            }
            this.dataSource = this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridComponent.prototype, "equalColumnsWidth", {
        get: function () {
            return this.equalColumnsWidthValue;
        },
        /**
         * Make all columns equal width. False by default.
         */
        set: function (value) {
            this.equalColumnsWidthValue = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.checkDefsCount();
        var rowsChange$ = merge(this._contentRowDefs.changes, this._contentHeaderRowDefs.changes, this._contentFooterRowDefs.changes);
        rowsChange$.pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.checkDefsCount(); });
        if (this.platform.isBrowser) {
            this.updateVisibleColumns();
            var windowResize$ = fromEvent(this.window, 'resize').pipe(debounceTime(50));
            merge(rowsChange$, this._contentColumnDefs.changes, windowResize$)
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function () { return _this.updateVisibleColumns(); });
        }
    };
    NbTreeGridComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.alive = false;
    };
    NbTreeGridComponent.prototype.toggleRow = function (row, options) {
        this._source.toggleByIndex(this.getDataIndex(row), options);
    };
    NbTreeGridComponent.prototype.toggleCellRow = function (cell) {
        this.toggleRow(this.findCellRow(cell));
    };
    NbTreeGridComponent.prototype.getColumnWidth = function () {
        if (this.equalColumnsWidth) {
            return 100 / this.getColumnsCount() + "%";
        }
        return '';
    };
    NbTreeGridComponent.prototype.getCellLevel = function (cell, columnName) {
        var isFirstColumn = this.isFirstColumn(columnName);
        var row = isFirstColumn && this.findCellRow(cell);
        var level = row && this.getRowLevel(row);
        if (level || level === 0) {
            return level;
        }
        return NB_DEFAULT_ROW_LEVEL;
    };
    NbTreeGridComponent.prototype.getDataIndex = function (row) {
        var rowEl = row.elementRef.nativeElement;
        var parent = rowEl.parentElement;
        if (parent) {
            return Array.from(parent.children)
                .filter(function (child) { return child.hasAttribute('nbtreegridrow'); })
                .indexOf(rowEl);
        }
        return -1;
    };
    NbTreeGridComponent.prototype.getRowLevel = function (row) {
        return this._source.getLevel(this.getDataIndex(row));
    };
    NbTreeGridComponent.prototype.getColumns = function () {
        var columns = (this._contentHeaderRowDefs.length
            ? this._contentHeaderRowDefs.first
            : this._contentRowDefs.first).columns;
        return Array.from(columns || []);
    };
    NbTreeGridComponent.prototype.getColumnsCount = function () {
        return this.getColumns().length;
    };
    NbTreeGridComponent.prototype.isFirstColumn = function (columnName) {
        return this.getColumns()[0] === columnName;
    };
    NbTreeGridComponent.prototype.findCellRow = function (cell) {
        var cellRowElement = cell.elementRef.nativeElement.parentElement;
        return this.rows.toArray()
            .find(function (row) {
            return row.elementRef.nativeElement === cellRowElement;
        });
    };
    NbTreeGridComponent.prototype.checkDefsCount = function () {
        if (this._contentRowDefs.length > 1) {
            throw new Error("Found multiple row definitions");
        }
        if (this._contentHeaderRowDefs.length > 1) {
            throw new Error("Found multiple header row definitions");
        }
        if (this._contentFooterRowDefs.length > 1) {
            throw new Error("Found multiple footer row definitions");
        }
    };
    NbTreeGridComponent.prototype.updateVisibleColumns = function () {
        var width = this.window.innerWidth;
        var columnDefs = this._contentColumnDefs;
        var columnsToHide = columnDefs
            .filter(function (col) { return col.shouldHide(width); })
            .map(function (col) { return col.name; });
        var columnsToShow = columnDefs
            .filter(function (col) { return col.shouldShow(width); })
            .map(function (col) { return col.name; });
        if (!columnsToHide.length && !columnsToShow.length) {
            return;
        }
        var rowDefs = [
            this._contentHeaderRowDefs.first,
            this._contentRowDefs.first,
            this._contentFooterRowDefs.first,
        ].filter(function (d) { return !!d; });
        for (var _i = 0, rowDefs_1 = rowDefs; _i < rowDefs_1.length; _i++) {
            var rowDef = rowDefs_1[_i];
            for (var _a = 0, columnsToHide_1 = columnsToHide; _a < columnsToHide_1.length; _a++) {
                var column = columnsToHide_1[_a];
                rowDef.hideColumn(column);
            }
            for (var _b = 0, columnsToShow_1 = columnsToShow; _b < columnsToShow_1.length; _b++) {
                var column = columnsToShow_1[_b];
                rowDef.showColumn(column);
            }
        }
    };
    var NbTreeGridComponent_1;
    __decorate([
        Input('nbTreeGrid'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NbTreeGridComponent.prototype, "source", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbTreeGridComponent.prototype, "levelPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbTreeGridComponent.prototype, "equalColumnsWidth", null);
    __decorate([
        ContentChildren(NbTreeGridRowComponent),
        __metadata("design:type", QueryList)
    ], NbTreeGridComponent.prototype, "rows", void 0);
    __decorate([
        HostBinding('class.nb-tree-grid'),
        __metadata("design:type", Object)
    ], NbTreeGridComponent.prototype, "treeClass", void 0);
    NbTreeGridComponent = NbTreeGridComponent_1 = __decorate([
        Component({
            selector: 'table[nbTreeGrid]',
            template: NB_TABLE_TEMPLATE,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent_1 },
                NbColumnsService,
            ],
            styles: [":host{table-layout:fixed;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;overflow:auto}::ng-deep .nb-tree-grid-cell,::ng-deep .nb-tree-grid-header-cell,::ng-deep .nb-tree-grid-footer-cell{overflow:hidden}\n"]
        }),
        __param(4, Attribute('role')),
        __param(6, Inject(NB_DOCUMENT)),
        __param(8, Inject(NB_WINDOW)),
        __metadata("design:paramtypes", [NbTreeGridDataSourceBuilder,
            IterableDiffers,
            ChangeDetectorRef,
            ElementRef, String, NbDirectionality, Object, NbPlatform, Object])
    ], NbTreeGridComponent);
    return NbTreeGridComponent;
}(NbTable));
export { NbTreeGridComponent };
//# sourceMappingURL=tree-grid.component.js.map