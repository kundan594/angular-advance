# TaskFlow: Scalable Task Management with NgRx & Signals

A comprehensive Angular application demonstrating different state management approaches, from basic services to advanced NgRx patterns.

## 🎯 Project Overview

TaskFlow is designed to teach Angular state management concepts through a practical, real-world task management application. The project evolves through three modules, each demonstrating different state management techniques.

## 📚 Modules

### Module 1: Service-based State Management ✅
- **Status**: Complete
- **Approach**: BehaviorSubject in services
- **Key Concepts**:
  - Local vs Global state
  - Component communication via services
  - Reactive state management with RxJS
  - CRUD operations

### Module 2: NgRx Setup & Core Concepts ✅
- **Status**: Complete
- **Approach**: Full NgRx implementation
- **Key Concepts**:
  - Actions, Reducers, and Selectors
  - @ngrx/entity for normalized state
  - Effects for async operations
  - Redux DevTools integration
  - Memoized selectors for performance

### Module 3: Advanced State Techniques ⏳
- **Status**: Planned
- **Approach**: Advanced NgRx + Angular Signals
- **Key Concepts**:
  - Feature modules and lazy loading
  - Advanced selectors and filtering
  - Angular Signals integration
  - Performance optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v19)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd pmd

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:4200`

## 🏗️ Architecture

### Current Implementation (Module 2: NgRx)

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main container
│   │   ├── task-form/          # Task creation form
│   │   └── task-list/          # Task display list
│   ├── models/
│   │   └── task.model.ts       # Task interfaces
│   ├── services/
│   │   ├── task.service.ts     # Legacy service (Module 1)
│   │   └── task.facade.ts      # NgRx facade service
│   ├── store/
│   │   ├── actions/
│   │   │   └── task.actions.ts # NgRx actions
│   │   ├── effects/
│   │   │   └── task.effects.ts # NgRx effects
│   │   ├── reducers/
│   │   │   └── task.reducer.ts # NgRx reducer
│   │   └── selectors/
│   │       └── task.selectors.ts # NgRx selectors
│   └── app.config.ts           # App configuration
```

### State Management Flow

1. **Actions**: Components dispatch actions
2. **Effects**: Handle async operations (API calls)
3. **Reducers**: Update state based on actions
4. **Selectors**: Components subscribe to state changes

## 🛠️ Key Features

### Task Management
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Priority levels (Low, Medium, High)
- ✅ Due date tracking with overdue detection
- ✅ Real-time task statistics

### State Management
- ✅ Normalized state with @ngrx/entity
- ✅ Memoized selectors for performance
- ✅ Async operations with effects
- ✅ Redux DevTools integration
- ✅ Type-safe actions and state

### UI/UX
- ✅ Responsive Bootstrap 5 design
- ✅ Real-time updates
- ✅ Loading states
- ✅ Error handling
- ✅ Modern, clean interface

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run unit tests
```

### Redux DevTools
The application includes Redux DevTools integration. Install the browser extension to:
- Inspect state changes
- Time-travel debugging
- Action logging
- Performance monitoring

## 📖 Learning Path

### For Beginners
1. Start with Module 1 to understand basic state management
2. Compare with Module 2 to see NgRx benefits
3. Use Redux DevTools to understand state flow

### For Intermediate Developers
1. Study the selector patterns for performance
2. Examine the effects for async operations
3. Understand normalized state with @ngrx/entity

### For Advanced Developers
1. Analyze the facade pattern implementation
2. Study the memoized selectors
3. Prepare for Module 3 with Signals integration

## 🤝 Contributing

This is a learning project. Feel free to:
- Report issues
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using Angular 19 and NgRx**
