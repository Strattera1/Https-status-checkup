import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logs: string[] = [];

  log(message: string) {
    const logEntry = `${ new Date().toISOString()}: ${message}`;
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
  constructor() { }
}
