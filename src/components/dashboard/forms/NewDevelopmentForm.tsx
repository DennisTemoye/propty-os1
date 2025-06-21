
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface NewDevelopmentFormProps {
  onClose: () => void;
}

interface DevelopmentFormData {
  name: string;
  location: string;
  description: string;
  category: string;
  developmentType: string;
  totalUnits: number;
  developmentSize: string;
  developmentStage: string;
}

export function NewDevelopmentForm({ onClose }: NewDevelopmentFormProps) {
  const form = useForm<DevelopmentFormData>({
    defaultValues: {
      name: '',
      location: '',
      description: '',
      category: '',
      developmentType: '',
      totalUnits: 0,
      developmentSize: '',
      developmentStage: '',
    },
  });

  const selectedCategory = form.watch('category');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Housing':
        return 'bg-blue-100 text-blue-800';
      case 'Land':
        return 'bg-green-100 text-green-800';
      case 'Mixed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onSubmit = (data: DevelopmentFormData) => {
    console.log('Creating new development:', data);
    toast.success(`Development "${data.name}" created successfully!`);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'Development name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter development name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            rules={{ required: 'Location is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter development location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter development description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="category"
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="developmentType"
            rules={{ required: 'Development type is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalUnits"
            rules={{ required: 'Total units is required', min: { value: 1, message: 'Must be at least 1' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Units</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter total units" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="developmentSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 50 hectares" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="developmentStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Stage</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Land Acquisition">Land Acquisition</SelectItem>
                      <SelectItem value="Planning & Approvals">Planning & Approvals</SelectItem>
                      <SelectItem value="Subdivision">Subdivision</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Handover">Handover</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {selectedCategory && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Category:</span>
            <Badge className={getCategoryColor(selectedCategory)}>
              {selectedCategory}
            </Badge>
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input type="file" accept="image/*,.pdf" className="hidden" id="layout-upload" />
          <label htmlFor="layout-upload" className="cursor-pointer">
            <div className="text-gray-500">
              <p className="text-sm">Upload Site Layout (Optional)</p>
              <p className="text-xs mt-1">Drag and drop or click to select image/PDF</p>
            </div>
          </label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Create Development
          </Button>
        </div>
      </form>
    </Form>
  );
}
