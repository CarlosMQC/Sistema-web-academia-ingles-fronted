import { signal, WritableSignal } from '@angular/core';

export class GenericService<T> {
  protected baseUrl: string;
  
  public dataSignal: WritableSignal<T[]> = signal([]);

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async findAll(): Promise<void> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Error');
      const data = await response.json();
      this.dataSignal.set(data);
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) throw new Error('Error');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async save(item: T): Promise<void> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        await this.findAll(); 
      }
    } catch (error) {
      console.error(error);
    }
  }
  async update(id: number, item: T): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        await this.findAll();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await this.findAll();
      }
    } catch (error) {
      console.error(error);
    }
  }
}