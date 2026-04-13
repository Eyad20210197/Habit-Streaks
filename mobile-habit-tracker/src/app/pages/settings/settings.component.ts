import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  hasData = false;

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.habitService.habits$.subscribe(data => {
      this.hasData = data.length > 0;
    });
  }

  resetData() {
    if(confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      this.habitService.resetData();
    }
  }
}
