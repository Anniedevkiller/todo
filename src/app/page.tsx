import { TodoApp } from '@/components/TodoApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <TodoApp />
    </div>
  );
}
