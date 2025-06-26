
import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown, fallbackMessage = 'An unexpected error occurred') => {
  console.error('Error occurred:', error);
  
  if (error instanceof AppError) {
    toast.error(error.message);
    return error;
  }
  
  if (error instanceof Error) {
    toast.error(error.message || fallbackMessage);
    return error;
  }
  
  toast.error(fallbackMessage);
  return new AppError(fallbackMessage);
};

export const handleSuccess = (message: string) => {
  toast.success(message);
};
