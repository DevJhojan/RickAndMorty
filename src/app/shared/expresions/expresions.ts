export class Expressions {
  public static email(): string {
    return '^[^@]+@[^@]+.[a-zA-Z]{2,}$';
  }

  public static password(): string {
    return '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{7}$';
  }
  public static passwordMFA(): string {
    return '^\d{6}$';
  }
}
