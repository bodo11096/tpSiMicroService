import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto p-4">
        <header class="bg-white shadow-lg rounded-lg mb-6">
          <div class="px-6 py-4">
            <h1 class="text-2xl font-bold text-gray-800">ISJ Student Management</h1>
            <nav class="mt-4">
              <ul class="flex space-x-6">
                <li>
                  <a routerLink="/students" 
                     routerLinkActive="text-blue-600 font-semibold" 
                     class="text-gray-600 hover:text-blue-600 transition-colors">
                    Students
                  </a>
                </li>
                <li>
                  <a routerLink="/inscriptions" 
                     routerLinkActive="text-blue-600 font-semibold" 
                     class="text-gray-600 hover:text-blue-600 transition-colors">
                    Inscriptions
                  </a>
                </li>
                <li>
                  <a routerLink="/absences" 
                     routerLinkActive="text-blue-600 font-semibold" 
                     class="text-gray-600 hover:text-blue-600 transition-colors">
                    Absences
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main class="bg-white rounded-lg shadow-lg p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'ISJ Student Management';
}