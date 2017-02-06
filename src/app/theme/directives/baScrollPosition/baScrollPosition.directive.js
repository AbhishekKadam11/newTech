"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BaScrollPosition = (function () {
    function BaScrollPosition() {
        this.scrollChange = new core_1.EventEmitter();
    }
    BaScrollPosition.prototype.ngOnInit = function () {
        this.onWindowScroll();
    };
    BaScrollPosition.prototype.onWindowScroll = function () {
        var isScrolled = window.scrollY > this.maxHeight;
        if (isScrolled !== this._isScrolled) {
            this._isScrolled = isScrolled;
            this.scrollChange.emit(isScrolled);
        }
    };
    __decorate([
        core_1.Input()
    ], BaScrollPosition.prototype, "maxHeight");
    __decorate([
        core_1.Output()
    ], BaScrollPosition.prototype, "scrollChange");
    __decorate([
        core_1.HostListener('window:scroll')
    ], BaScrollPosition.prototype, "onWindowScroll");
    BaScrollPosition = __decorate([
        core_1.Directive({
            selector: '[baScrollPosition]'
        })
    ], BaScrollPosition);
    return BaScrollPosition;
}());
exports.BaScrollPosition = BaScrollPosition;
//# sourceMappingURL=baScrollPosition.directive.js.map