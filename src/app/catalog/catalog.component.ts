import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Observable, catchError, empty, interval, timeInterval, timeout, timestamp } from 'rxjs';
import { UrlService } from '../services/url.service';
import { UrlData } from '../models/urldata';
import { Tensor } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';


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
  
  //Machine learning part
  // private model: tf.Sequential;



 
  // Kom på hur jag ska använda mig av maskinläring i projektet. 
  // problemet är att min json fil är för enkel för att göra maskinlärning i. 
  // Ska prova någonting. Ska använda mig av NN om det går med det jag har, 

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
  
  constructor (private catalogService : CatalogService, private urlservice: UrlService) {
    //Comment out the machine learning part. 
    // this.model = tf.sequential();
    // this.model.add(tf.layers.dense({ units: 1, inputShape: [2], activation: 'sigmoid' }));
    // this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  }
  

  ngOnInit() {
    this.urlDataLoad();

    this.interval = setInterval(() => {
      this.updatedHttpStatusCheck();
    }, 60000 );

    // this.trainMachineLearningModel();

    
  }
  // Converting Json object to training for machine learning
  // trainMachineLearningModel() {
  //   const features = this.urlsData.map(item => ({
  //     urlLength: item.url!.length,
  //     hasKeyWord: item.url!.includes('News') ? 1:0,
  //   }));

  //   const labels = this.urlsData.map(item => (item.httpstatus == 200 ? 1:0));
  //   const xs = tf.tensor2d(features.map(feature => [feature.urlLength, feature.hasKeyWord]));;
  //   const ys = tf.tensor1d(labels);

  //   this.model.fit(xs,ys, { epochs:10}).then(() => {
  //     console.log('Machine learning model trained');
  //   });
  // }

  // machineLearningPredictions(newUrl: string) {
  //   const newFeatures = {
  //     urlLength: newUrl.length,
  //     hasKeyWord: newUrl.includes('News') ? 1 : 0,
  //   };
    
  //   const predication = this.model.predict(tf.tensor2d([[newFeatures.urlLength, newFeatures.hasKeyWord]]));
  //   const predicatedStatus = Array.isArray(predication) ? predication[0].dataSync()[0] > 0.5 : predication.dataSync()[0] > 0.5 ? 1 : 0;

  //   console.log('Predicated HTTP Status:', predicatedStatus);
  // };

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






