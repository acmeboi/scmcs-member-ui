// Form validation helpers
export const validators = {
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  
  password: (value: string, minLength: number = 8): boolean => {
    return value.length >= minLength;
  },
  
  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },
  
  match: (value: string, compareValue: string): boolean => {
    return value === compareValue;
  },
};

