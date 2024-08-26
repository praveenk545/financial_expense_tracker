import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {
    transform(value: any): string {
        if (!value) return 'Invalid date';
    
        // Function to parse date from the given formats
        function parseDate(dateString: string): Date {
          // Try parsing in ISO format first
          let date = new Date(dateString);
          
          // If the date is invalid, try parsing custom format (MM-DD-YYYY)
          if (isNaN(date.getTime())) {
            const parts = dateString.split('-');
            if (parts.length === 3) {
              const month = parseInt(parts[0], 10) - 1; // Months are 0-based in JavaScript
              const day = parseInt(parts[1], 10);
              const year = parseInt(parts[2], 10);
              date = new Date(year, month, day);
            }
          }
    
          return date;
        }
    
        const now = new Date();
        const date = parseDate(value);
        
        // Check if the date is still invalid
        if (isNaN(date.getTime())) return 'Invalid date';
    
        const seconds = Math.floor((+now - +date) / 1000);
    
        if (seconds < 60) return 'Just now'; // less than 1 minute ago
    
        const intervals: { [key: string]: number } = {
          'year': 31536000,
          'month': 2592000,
          'week': 604800,
          'day': 86400,
          'hour': 3600,
          'minute': 60,
          'second': 1
        };
    
        for (const interval in intervals) {
          const intervalSeconds = intervals[interval];
          const count = Math.floor(seconds / intervalSeconds);
          if (count > 0) {
            return count === 1
              ? `${count} ${interval} ago`
              : `${count} ${interval}s ago`;
          }
        }
    
        return 'Just now'; // Fallback
      }}