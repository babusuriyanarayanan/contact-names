export class Contact {
    id: number;
    name: string;
    email: string;
    phone?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
  }