import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  currentMonth = '';
  previousMonthDays: string[] = [];
  calendarCells: { day: string, isToday: boolean, completionCount: number }[] = [];
  highestStreak = 0;
  completionRate = 0;
  habits: any[] = [];
  
  private currentDateStr = '';
  
  constructor(private habitService: HabitService) {}

  ngOnInit() {
    const today = new Date();
    this.currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    this.currentDateStr = this.habitService.getTodayStr();
    
    this.habitService.habits$.subscribe(habits => {
      this.habits = habits;
      this.generateCalendarCells(today);
      this.calculateStats();
    });
  }

  prevMonth() {}
  nextMonth() {}

  private generateCalendarCells(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    this.previousMonthDays = Array.from({length: firstDayIndex}, (_, i) => 
      String(daysInPrevMonth - firstDayIndex + i + 1)
    );
    
    this.calendarCells = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = (i === date.getDate() && date.getMonth() === new Date().getMonth() && year === new Date().getFullYear());
      const dStr = [year, (month + 1).toString().padStart(2,'0'), i.toString().padStart(2,'0')].join('-');
      
      let completionCount = 0;
      this.habits.forEach(h => {
        if(h.completedDates.includes(dStr)) completionCount++;
      });
      
      this.calendarCells.push({
        day: i.toString(),
        isToday,
        completionCount
      });
    }
  }

  private calculateStats() {
    if (!this.habits.length) return;
    
    this.highestStreak = Math.max(...this.habits.map(h => h.streak));
    
    let currentTotalCompletions = 0;
    this.habits.forEach(h => currentTotalCompletions += h.completedDates.length);
    
    // Simple naive completion rate logic since app install (or based on last 7 days normally, but static here for simplicity)
    const expected = this.habits.length * 7; 
    this.completionRate = Math.round(Math.min((currentTotalCompletions / expected) * 100, 100));
  }
}
