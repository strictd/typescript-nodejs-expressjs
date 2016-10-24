export class IPerson {
  id: number;
  name: string;
  email: string;
  phone: string;
  canTextMessage: boolean;

  constructor() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.canTextMessage = false;
  }
}