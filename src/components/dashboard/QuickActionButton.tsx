
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface QuickActionButtonProps {
  onClick: () => void;
}

export function QuickActionButton({ onClick }: QuickActionButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Plus className="h-5 w-5 mr-2" />
      New
    </Button>
  );
}
