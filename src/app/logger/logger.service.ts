import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logs: string[] = [];

  log(data: any) {
    const logEntry = `${new Date().toISOString()}: ${this.stringifyData(data)}`;
    this.logs.push(logEntry);

    console.log(logEntry);
  }
  saveLogsToFile () {
    const logAsText = this.logs.join('\n');
    const blob= new Blob([logAsText], { type: 'text/plain'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'logs.txt';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
  private stringifyData(data: any): string {
    if (typeof data === 'object') {
      // If the data is an object or array, stringify it
      return JSON.stringify(data, null, 2);
    } else {
      // If it's a simple type, just convert it to a string
      return String(data);
    }
  }
}
