"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var baChartistChart_loader_ts_1 = require('./baChartistChart.loader.ts');
var BaChartistChart = (function () {
    function BaChartistChart() {
        this.onChartReady = new core_1.EventEmitter();
    }
    BaChartistChart.prototype.ngAfterViewInit = function () {
        this.chart = new baChartistChart_loader_ts_1.Chartist[this.baChartistChartType](this._selector.nativeElement, this.baChartistChartData, this.baChartistChartOptions, this.baChartistChartResponsive);
        this.onChartReady.emit(this.chart);
    };
    BaChartistChart.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.chart.update(this.baChartistChartData, this.baChartistChartOptions);
        }
    };
    BaChartistChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.detach();
        }
    };
    __decorate([
        core_1.Input()
    ], BaChartistChart.prototype, "baChartistChartType");
    __decorate([
        core_1.Input()
    ], BaChartistChart.prototype, "baChartistChartData");
    __decorate([
        core_1.Input()
    ], BaChartistChart.prototype, "baChartistChartOptions");
    __decorate([
        core_1.Input()
    ], BaChartistChart.prototype, "baChartistChartResponsive");
    __decorate([
        core_1.Input()
    ], BaChartistChart.prototype, "baChartistChartClass");
    __decorate([
        core_1.Output()
    ], BaChartistChart.prototype, "onChartReady");
    __decorate([
        core_1.ViewChild('baChartistChart')
    ], BaChartistChart.prototype, "_selector");
    BaChartistChart = __decorate([
        core_1.Component({
            selector: 'ba-chartist-chart',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('chartist/dist/chartist.css'), require('./baChartistChart.scss')],
            template: require('./baChartistChart.html'),
            providers: []
        })
    ], BaChartistChart);
    return BaChartistChart;
}());
exports.BaChartistChart = BaChartistChart;
//# sourceMappingURL=baChartistChart.component.js.map