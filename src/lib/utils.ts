import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Global utility function for project images with fallback
export function getProjectImage(project: any): string {
  const defaultImage = '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
  
  if (!project || !project.image || project.image.trim() === '') {
    return defaultImage;
  }
  
  return project.image;
}

// Global image error handler
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.target as HTMLImageElement;
  target.src = '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
}
