import { describe, it, expect, beforeEach, vi } from 'vitest';
import { localStorageAdapter } from '../lib/storage';

describe('localStorageAdapter', () => {
  const STORAGE_KEY = 'test_todos';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null when key does not exist', () => {
    const result = localStorageAdapter.getItem(STORAGE_KEY);
    expect(result).toBeNull();
  });

  it('sets and retrieves JSON data correctly', () => {
    const sampleData = [{ id: '1', text: 'Test todo', completed: false, createdAt: 1000 }];
    localStorageAdapter.setItem(STORAGE_KEY, sampleData);

    const retrieved = localStorageAdapter.getItem(STORAGE_KEY);
    expect(retrieved).toEqual(sampleData);
  });

  it('removes item correctly', () => {
    localStorageAdapter.setItem(STORAGE_KEY, 'data');
    localStorageAdapter.removeItem(STORAGE_KEY);
    expect(localStorageAdapter.getItem(STORAGE_KEY)).toBeNull();
  });

  it('handles invalid JSON gracefully', () => {
    window.localStorage.setItem(STORAGE_KEY, 'invalid json {{{');
    const result = localStorageAdapter.getItem(STORAGE_KEY);
    expect(result).toBeNull();
  });

  it('handles storage errors without crashing', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    expect(() => {
      localStorageAdapter.setItem(STORAGE_KEY, { data: 'test' });
    }).not.toThrow();

    setItemSpy.mockRestore();
  });
});
