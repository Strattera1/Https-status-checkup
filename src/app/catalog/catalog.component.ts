import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Observable, catchError, empty, interval, timeInterval, timeout, timestamp } from 'rxjs';
import { UrlService } from '../services/url.service';
import { UrlData } from '../models/urldata';
import { Tensor } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import { LoggerService } from '../logger/logger.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})


export class CatalogComponent implements OnInit, OnDestroy {
  jsonData: any[] = [];
  urlsData: UrlData[] = [];
  private interval: any;
  public isTimeOut: boolean = false;
  private timeout: any;
  


 


    getStatusClass(item: any) {
      
    
      var now = new Date();
      
      if (this.moreThanTwoMinutesPassed(item?.updated,now ) ){
        return 'status-null';
      } 
      
    

       switch (item.httpstatus) {
        case 200:
          return 'status-200';
        case 404:
          return 'status-404';
        case 500:
          return 'status-500';
        case 401:
          return 'status-401';
  
        case 504:
          return 'status-504';
  
        case 403:
          return 'status-403';
        case 509:
          return 'status-509';
        case 530:
          return "status-530";
  
        case 410:
          return "status-410";
  
        case null:
        return 'status-null';
        default:
          return '';
          
      }
      
    }
  
  constructor (private catalogService : CatalogService, private urlservice: UrlService, private loggerservice: LoggerService) {

  }
  

  ngOnInit() {
    this.urlDataLoad();

    this.interval = setInterval(() => {
      this.updatedHttpStatusCheck();
    }, 60000 );


    
  }
 

  moreThanTwoMinutesPassed(updatedTime: Date, timeNow: Date) {

    if (updatedTime == null || timeNow == null)
    return true
    // Calculate the time difference in milliseconds
    const timeDifference = timeNow.getTime() - updatedTime.getTime();
    return timeDifference > 120000;
    
      
  }
   


  
  updatedHttpStatusCheck () {
    for (var i = 0; i <this.urlsData.length; i++) {
      var item = this.urlsData[i];

      if (item.url != null) {
        this.urlservice.updatedHttpStatusCheck(item).subscribe(response => 
          console.log(response));
      }
    }
  }


  urlDataLoad() {
    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => {
    //   this.isTimeOut = true;
    // }, 120000);

    this.catalogService.getJsonData().subscribe(testdata => {
      this.jsonData = testdata;
      const promises = testdata.map(element => this.getUrl(element));

      console.log(promises)
      Promise.all(promises).then((urlData: UrlData[]) => {
        this.urlsData = urlData;

        
      });
    });
    
  }
  stopInterval () {
    clearInterval(this.interval)
    }
  


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      
      
    }

  }


  
  goToLink(url: string) {
    window.open(url, "_blank");
}


  getUrl(item:any): Promise<UrlData> {
    console.log(item)
    return new Promise((resolve, reject) => {
      this.urlservice.getHttpStatus(item.url).subscribe(
        (data: any) => {
          console.log(data)
          const urlmodel: UrlData = {
            name: item.name,
            url:  item.url ,
            timestamp:  new Date,
            httpstatus: data,
            updated:new Date,
          };
          item.updated = new Date();

          console.log(urlmodel);
          resolve(urlmodel);
        },
        (error) => {
          const urlmodel: UrlData = {
            name: item.name,
            url: item.url,
             updated: new Date(),
            httpstatus: error.status,
            timestamp: new Date, 
          };
          
          resolve(urlmodel)

        }
      );
    });
  }

  
}






