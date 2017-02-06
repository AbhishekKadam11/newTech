"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var BaPictureUploader = (function () {
    function BaPictureUploader(renderer, _uploader) {
        this.renderer = renderer;
        this._uploader = _uploader;
        this.defaultPicture = '';
        this.picture = '';
        this.uploaderOptions = {};
        this.canDelete = true;
        this.onUpload = new core_1.EventEmitter();
        this.onUploadCompleted = new core_1.EventEmitter();
        this.uploadInProgress = false;
    }
    BaPictureUploader.prototype.ngOnInit = function () {
        var _this = this;
        if (this._canUploadOnServer()) {
            setTimeout(function () {
                _this._uploader.setOptions(_this.uploaderOptions);
            });
            this._uploader._emitter.subscribe(function (data) {
                _this._onUpload(data);
            });
        }
        else {
            console.warn('Please specify url parameter to be able to upload the file on the back-end');
        }
    };
    BaPictureUploader.prototype.onFiles = function () {
        var files = this._fileUpload.nativeElement.files;
        if (files.length) {
            var file = files[0];
            this._changePicture(file);
            if (this._canUploadOnServer()) {
                this.uploadInProgress = true;
                this._uploader.addFilesToQueue(files);
            }
        }
    };
    BaPictureUploader.prototype.bringFileSelector = function () {
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    };
    BaPictureUploader.prototype.removePicture = function () {
        this.picture = '';
        return false;
    };
    BaPictureUploader.prototype._changePicture = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            _this.picture = event.target.result;
        }, false);
        reader.readAsDataURL(file);
    };
    BaPictureUploader.prototype._onUpload = function (data) {
        if (data['done'] || data['abort'] || data['error']) {
            this._onUploadCompleted(data);
        }
        else {
            this.onUpload.emit(data);
        }
    };
    BaPictureUploader.prototype._onUploadCompleted = function (data) {
        this.uploadInProgress = false;
        this.onUploadCompleted.emit(data);
    };
    BaPictureUploader.prototype._canUploadOnServer = function () {
        return !!this.uploaderOptions['url'];
    };
    __decorate([
        core_1.Input()
    ], BaPictureUploader.prototype, "defaultPicture");
    __decorate([
        core_1.Input()
    ], BaPictureUploader.prototype, "picture");
    __decorate([
        core_1.Input()
    ], BaPictureUploader.prototype, "uploaderOptions");
    __decorate([
        core_1.Input()
    ], BaPictureUploader.prototype, "canDelete");
    __decorate([
        core_1.ViewChild('fileUpload')
    ], BaPictureUploader.prototype, "_fileUpload");
    BaPictureUploader = __decorate([
        core_1.Component({
            selector: 'ba-picture-uploader',
            styles: [require('./baPictureUploader.scss')],
            template: require('./baPictureUploader.html'),
            providers: [ng2_uploader_1.Ng2Uploader]
        })
    ], BaPictureUploader);
    return BaPictureUploader;
}());
exports.BaPictureUploader = BaPictureUploader;
//# sourceMappingURL=baPictureUploader.component.js.map
