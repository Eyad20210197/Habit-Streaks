import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habit } from '../../models/habit.model';
import { StreakHighlightDirective } from '../../directives/streak-highlight.directive';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule, StreakHighlightDirective],
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.scss'
})
export class HabitCardComponent {
  @Input() habit!: Habit;
  @Output() onToggle = new EventEmitter<void>();

  constructor(private habitService: HabitService) {}

  get isCompletedToday(): boolean {
    const today = this.habitService.getTodayStr();
    return this.habit.completedDates.includes(today);
  }
}
