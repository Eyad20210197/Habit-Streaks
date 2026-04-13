import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private readonly STORAGE_KEY = 'habits_data';
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  public habits$ = this.habitsSubject.asObservable();

  constructor() {
    this.loadState();
  }

  private loadState() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.habitsSubject.next(JSON.parse(data));
    } else {
      // Mock Data 
      const mock: Habit[] = [
        {
          id: '1',
          name: 'Drink Water',
          category: 'Health',
          icon: 'water_drop',
          completedDates: [],
          streak: 0,
          createdAt: new Date().toISOString()
        }
      ];
      this.habitsSubject.next(mock);
    }
  }

  private saveState(habits: Habit[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(habits));
    this.habitsSubject.next(habits);
  }

  addHabit(name: string, category: 'Health' | 'Work' | 'Personal', icon: string) {
    const habits = this.habitsSubject.getValue();
    const newHabit: Habit = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      category,
      icon,
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString()
    };
    this.saveState([...habits, newHabit]);
  }

  editHabit(id: string, name: string, category: 'Health' | 'Work' | 'Personal', icon: string) {
    const habits = this.habitsSubject.getValue().map(h => 
      h.id === id ? { ...h, name, category, icon } : h
    );
    this.saveState(habits);
  }

  deleteHabit(id: string) {
    const habits = this.habitsSubject.getValue().filter(h => h.id !== id);
    this.saveState(habits);
  }

  resetData() {
    this.saveState([]);
  }

  getTodayStr(): string {
    const d = new Date();
    return this.formatDate(d);
  }

  toggleCompletion(id: string) {
    const today = this.getTodayStr();
    const habits = this.habitsSubject.getValue().map(h => {
      if (h.id === id) {
        let dates = [...h.completedDates];
        if (dates.includes(today)) {
          dates = dates.filter(d => d !== today); // remove
        } else {
          dates.push(today); // add
        }
        dates.sort(); // keep sorted
        return {
          ...h,
          completedDates: dates,
          streak: this.calculateStreak(dates)
        };
      }
      return h;
    });
    this.saveState(habits);
  }

  private calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
    
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    const todayDateStr = this.getTodayStr();
    
    let current = new Date();
    current.setHours(0,0,0,0);
    
    let streak = 0;
    let expectedDate = new Date(current);
    
    if (sorted[0] === todayDateStr) {
      // Active today
    } else {
      expectedDate.setDate(expectedDate.getDate() - 1);
      const yesterdayStr = this.formatDate(expectedDate);
      if (sorted[0] !== yesterdayStr) {
        return 0; // Streak broken
      }
    }
    
    for (const d of sorted) {
      const expStr = this.formatDate(expectedDate);
      if (d === expStr) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  private formatDate(d: Date): string {
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}
