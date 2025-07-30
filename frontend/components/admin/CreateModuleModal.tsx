"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createModule } from "@/lib/actions";

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModuleCreated: (module: any) => void;
}

export function CreateModuleModal({ isOpen, onClose, onModuleCreated }: CreateModuleModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    difficulty: '',
    estimatedDuration: '',
    orderIndex: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  const categories = [
    { value: 'WINE', label: 'Wine' },
    { value: 'SPIRITS', label: 'Spirits' },
    { value: 'COCKTAILS', label: 'Cocktails' },
    { value: 'SERVICE', label: 'Service' },
    { value: 'COMPLIANCE', label: 'Compliance' },
    { value: 'GENERAL', label: 'General' },
    { value: 'FOOD_PAIRING', label: 'Food Pairing' },
    { value: 'CUSTOMER_SERVICE', label: 'Customer Service' },
  ];

  const difficulties = [
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      difficulty: '',
      estimatedDuration: '',
      orderIndex: '',
    });
    setTags([]);
    setNewTag('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }
      if (!formData.difficulty) {
        throw new Error('Difficulty is required');
      }

      // Create FormData for submission
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      if (formData.description.trim()) {
        submitData.append('description', formData.description.trim());
      }
      if (formData.imageUrl.trim()) {
        submitData.append('imageUrl', formData.imageUrl.trim());
      }
      submitData.append('category', formData.category);
      submitData.append('difficulty', formData.difficulty);
      if (formData.estimatedDuration) {
        submitData.append('estimatedDuration', formData.estimatedDuration);
      }
      if (formData.orderIndex) {
        submitData.append('orderIndex', formData.orderIndex);
      }
      if (tags.length > 0) {
        submitData.append('tags', JSON.stringify(tags));
      }

      const result = await createModule(submitData);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success && result.module) {
        onModuleCreated(result.module);
        resetForm();
        onClose();
      }
    } catch (error: any) {
      console.error('Error creating module:', error);
      setError(error.message || 'Failed to create module');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Training Module</DialogTitle>
          <DialogDescription>
            Create a new training module for your organization. You can add lessons to it later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Wine Fundamentals"
              maxLength={200}
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this module covers..."
              maxLength={1000}
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">
                Difficulty <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => handleInputChange('difficulty', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and Order */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Estimated Duration (minutes)</Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="1"
                max="480"
                value={formData.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                placeholder="30"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderIndex">Order Index (optional)</Label>
              <Input
                id="orderIndex"
                type="number"
                min="0"
                value={formData.orderIndex}
                onChange={(e) => handleInputChange('orderIndex', e.target.value)}
                placeholder="0"
                disabled={loading}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                maxLength={50}
                disabled={loading || tags.length >= 10}
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!newTag.trim() || tags.includes(newTag.trim()) || tags.length >= 10 || loading}
                variant="outline"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      disabled={loading}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <p className="text-xs text-gray-500">
              {tags.length}/10 tags • Press Enter to add
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.category || !formData.difficulty}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Module'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 