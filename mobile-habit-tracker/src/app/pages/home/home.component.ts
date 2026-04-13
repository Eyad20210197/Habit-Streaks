import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { HeaderComponent } from '../../components/header/header.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { HabitCardComponent } from '../../components/habit-card/habit-card.component';
import { AddHabitModalComponent } from '../../components/add-habit-modal/add-habit-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProgressBarComponent, HabitCardComponent, AddHabitModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  habits: Habit[] = [];
  progressPercentage = 0;
  isModalOpen = false;
  today = new Date();
  completedToday = 0;

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.habitService.habits$.subscribe(data => {
      this.habits = data;
      this.calculateWeekly();
      this.calculateToday();
    });
  }

  calculateToday() {
    const todayStr = this.habitService.getTodayStr();
    this.completedToday = this.habits.filter(h => h.completedDates.includes(todayStr)).length;
  }

  calculateWeekly() {
    if(!this.habits.length) {
      this.progressPercentage = 0;
      return;
    }
    
    // Strict logic for last 7 days window (including today)
    const todayNum = new Date();
    todayNum.setHours(0,0,0,0);
    
    let totalPossible = this.habits.length * 7;
    let completedInWindow = 0;

    const sevenDaysAgo = new Date(todayNum);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    this.habits.forEach(h => {
      h.completedDates.forEach(dStr => {
        // dStr is YYYY-MM-DD
        const d = new Date(dStr + 'T00:00:00');
        if(d >= sevenDaysAgo && d <= todayNum) {
          completedInWindow++;
        }
      });
    });

    this.progressPercentage = Math.round((completedInWindow / totalPossible) * 100);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleHabit(id: string) {
    this.habitService.toggleCompletion(id);
  }
}
