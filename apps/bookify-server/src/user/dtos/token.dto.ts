export class TokenDto {
  token: string;
  expiryDate: number;

  constructor(token: string, expiryDate: number) {
    this.token = token;
    this.expiryDate = expiryDate;
  }
}
