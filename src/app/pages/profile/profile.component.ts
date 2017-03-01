import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {ProfileService} from './profile.service';
import {MD_SELECT_DIRECTIVES, MdSelectDispatcher} from '../../../../node_modules/md-select';
import {Ng2Uploader} from 'ng2-uploader/ng2-uploader';


@Component({
  selector: 'standard-inputs',
  directives: [MD_SELECT_DIRECTIVES],
  providers: [ProfileService, MdSelectDispatcher, Ng2Uploader],
  template: require('./profile.html'),
  styles: [require('../../theme/components/baPictureUploader/baPictureUploader.scss')],

})


export class Profile {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public uploaderOptions: any = {
    url: 'http://localhost:8080/api/upload'
  };

 // @Input() defaultPicture:string = '';
  // @Input() picture:string = '';

 // @Input() uploaderOptions:any = {};
  @Input() canDelete:boolean = true;

  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload') protected _fileUpload:ElementRef;

  public uploadInProgress:boolean = false;

  private disabled: boolean = false;

  private states: Array<any> = [];
  private cities: Array<any> = [];

  private city: string = '';
  public profile = {};  //model
  private savedSuccess: boolean = false;
  private saveUnsuccess: boolean = false;
  public picture:any;
  private selectedState: string;
  private selectedCity: string;

  constructor(private profileService: ProfileService, private renderer:Renderer, protected _uploader:Ng2Uploader) {



    this.profileService.getstates().subscribe((result) => {
      result.forEach((data) => {
        if (data.sid) {
          this.states.push({
            value: data._id,
            name: data.statename,
          });
        }
        // if (data.cid) {
        //   this.cities.push({
        //     value: data.cid,
        //     name: data.cityname,
        //     id: data._id
        //   });
        // }
      });
    });

    this.profileService.getBasicDetails().subscribe((result) => {
      this.profile = result.userData;
      this.picture = result.userData.image;
    });
   // this.selectedState= '58316208cfa8bd0530f4a1ee';
  }

  public ngOnInit():void {
    if (this._canUploadOnServer()) {
      setTimeout(() => {
        this._uploader.setOptions(this.uploaderOptions);
      });

      this._uploader._emitter.subscribe((data) => {
        this._onUpload(data);
      });
    } else {
      console.warn('Please specify url parameter to be able to upload the file on the back-end');
    }

  }

  public onFiles():void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);
      if (this._canUploadOnServer()) {
        this.uploadInProgress = true;
        this._uploader.addFilesToQueue(files);
      }
    }
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture():boolean {
    this.picture = '';
    return false;
  }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  public _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
    this.profile['imageid'] = data.response;
  }

  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

  //------------------------------------
  private change(value: any) {

    if(value.value){
      this.profileService.getcities(value.value).subscribe((result) => {
        result.forEach((data) => {

            this.cities.push({
              value: data._id,
              name: data.cityname,
            });
        })
      });
    }


  }


  private setProfile(profile) {
    profile.image = '';
    this.profileService.setprofileData(profile)
      .subscribe((result) => {
        this.savedSuccess = true;
        setTimeout(() => {
          this.savedSuccess = false;
        }, 3000);

      },(err)=> {
        this.saveUnsuccess = true;
        setTimeout(() => {
          this.saveUnsuccess = false;
        }, 3000);

      });


  }

  public onChange(value: any): void {
  }



}


