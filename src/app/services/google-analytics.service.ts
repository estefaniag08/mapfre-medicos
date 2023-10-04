import { Injectable } from '@angular/core';


declare var gtag;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: any,
    eventLabel: string = null,
    eventValue: number = null) {
      
      gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }
}
