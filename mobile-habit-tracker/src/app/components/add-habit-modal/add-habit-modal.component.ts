import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-add-habit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-habit-modal.component.html',
  styleUrl: './add-habit-modal.component.scss'
})
export class AddHabitModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  name: string = '';
  category: 'Health' | 'Work' | 'Personal' = 'Personal';
  icon: string = 'star';
  isLoading = false;

  icons = ['star', 'water_drop', 'menu_book', 'fitness_center', 'laptop_mac', 'self_improvement', 'restaurant', 'directions_run', 'palette'];
  categories: ('Health' | 'Work' | 'Personal')[] = ['Health', 'Work', 'Personal'];

  constructor(private habitService: HabitService) {}

  ngOnInit() {}

  save() {
    if (!this.name.trim()) return;
    this.isLoading = true;
    setTimeout(() => {
      this.habitService.addHabit(this.name, this.category, this.icon);
      this.isLoading = false;
      this.close.emit();
    }, 400); // UI visual delay padding
  }
}
