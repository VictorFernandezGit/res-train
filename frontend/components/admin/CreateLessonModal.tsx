"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
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
import { createLesson } from "@/lib/actions";

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonCreated: (lesson: any) => void;
  moduleId: string;
}

export function CreateLessonModal({ isOpen, onClose, onLessonCreated, moduleId }: CreateLessonModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: '',
    duration: '',
    orderIndex: '',
    isRequired: true,
    passingScore: '',
  });
  const [error, setError] = useState('');

  const contentTypes = [
    { value: 'TEXT', label: 'Text Content' },
    { value: 'VIDEO', label: 'Video' },
    { value: 'INTERACTIVE', label: 'Interactive' },
    { value: 'QUIZ', label: 'Quiz' },
    { value: 'DOCUMENT', label: 'Document' },
    { value: 'AUDIO', label: 'Audio' },
    { value: 'PRESENTATION', label: 'Presentation' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      contentType: '',
      duration: '',
      orderIndex: '',
      isRequired: true,
      passingScore: '',
    });
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
      if (!formData.contentType) {
        throw new Error('Content type is required');
      }

      // Create FormData for submission
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      if (formData.description.trim()) {
        submitData.append('description', formData.description.trim());
      }
      submitData.append('contentType', formData.contentType);
      if (formData.duration) {
        submitData.append('duration', formData.duration);
      }
      if (formData.orderIndex) {
        submitData.append('orderIndex', formData.orderIndex);
      }
      if (formData.passingScore) {
        submitData.append('passingScore', formData.passingScore);
      }
      submitData.append('isRequired', String(formData.isRequired));
      submitData.append('moduleId', moduleId);

      const result = await createLesson(submitData);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success && result.lesson) {
        onLessonCreated(result.lesson);
        resetForm();
        onClose();
      }
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      setError(error.message || 'Failed to create lesson');
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
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            Add a new lesson to this module. You can add detailed content after creating the lesson.
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
              placeholder="e.g., Introduction to Wine Tasting"
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
              placeholder="Brief description of what this lesson covers..."
              maxLength={1000}
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Content Type and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contentType">
                Content Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.contentType}
                onValueChange={(value) => handleInputChange('contentType', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="480"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="30"
                disabled={loading}
              />
            </div>
          </div>

          {/* Order Index and Passing Score */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderIndex">Order Index</Label>
              <Input
                id="orderIndex"
                type="number"
                min="0"
                value={formData.orderIndex}
                onChange={(e) => handleInputChange('orderIndex', e.target.value)}
                placeholder="1"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing Score % (for quizzes)</Label>
              <Input
                id="passingScore"
                type="number"
                min="0"
                max="100"
                value={formData.passingScore}
                onChange={(e) => handleInputChange('passingScore', e.target.value)}
                placeholder="80"
                disabled={loading}
              />
            </div>
          </div>

          {/* Required Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isRequired"
              checked={formData.isRequired}
              onChange={(e) => handleInputChange('isRequired', e.target.checked)}
              disabled={loading}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="isRequired">This lesson is required for module completion</Label>
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
              disabled={loading || !formData.title.trim() || !formData.contentType}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Lesson'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 