var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, pairwise, startWith, map } from 'rxjs/operators';
import { getPathPartOfUrl } from '../menu/url-matching-helpers';
/**
 * This service determines whether we should scroll the layout back to top.
 * This occurs when the page is changed, so when current url PATH is not equal to the previous one.
 *
 *  TODO: this is most likely a temporary solutions as recently Angular introduces ViewportScroll
 *  and scroll restoration process
 */
let NbRestoreScrollTopHelper = class NbRestoreScrollTopHelper {
    constructor(router) {
        this.router = router;
    }
    shouldRestore() {
        return this.router.events
            .pipe(startWith(null), filter(event => event === null || event instanceof NavigationEnd), pairwise(), map(([prev, current]) => this.pageChanged(prev, current)), filter(res => !!res));
    }
    pageChanged(prev, current) {
        return !prev || getPathPartOfUrl(prev.url) !== getPathPartOfUrl(current.url);
    }
};
NbRestoreScrollTopHelper = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router])
], NbRestoreScrollTopHelper);
export { NbRestoreScrollTopHelper };
//# sourceMappingURL=restore-scroll-top.service.js.map