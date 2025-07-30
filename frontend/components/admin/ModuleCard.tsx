"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Eye, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy,
  Play,
  FileText,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModuleCardProps {
  module: any;
  viewMode: 'grid' | 'list';
  onEdit: (module: any) => void;
  onDelete: (module: any) => void;
  onDuplicate: (module: any) => void;
  getCategoryColor: (category: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}

export function ModuleCard({ 
  module, 
  viewMode, 
  onEdit, 
  onDelete, 
  onDuplicate,
  getCategoryColor,
  getDifficultyColor 
}: ModuleCardProps) {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const lessonCount = module.lessons?.[0]?.count || 0;

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Module Icon/Image */}
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {module.imageUrl ? (
                  <img 
                    src={module.imageUrl} 
                    alt={module.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <BookOpen className="w-6 h-6 text-blue-600" />
                )}
              </div>

              {/* Module Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {module.title}
                  </h3>
                  {!module.isPublished && (
                    <Badge variant="outline" className="text-xs">
                      Draft
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {module.description || "No description available"}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{lessonCount} lessons</span>
                  </div>
                  
                  {module.estimatedDuration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.estimatedDuration}m</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(module.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <Badge className={getCategoryColor(module.category)}>
                  {module.category}
                </Badge>
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(module)}>
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/admin/content/${module.id}/lessons`)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Manage Lessons
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(module)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Module
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(module)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(module)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            {module.imageUrl ? (
              <img 
                src={module.imageUrl} 
                alt={module.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <BookOpen className="w-6 h-6 text-blue-600" />
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/admin/content/${module.id}/lessons`)}>
                <FileText className="w-4 h-4 mr-2" />
                Manage Lessons
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(module)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Module
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(module)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(module)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div>
          <CardTitle className="text-lg line-clamp-2 mb-1">
            {module.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {module.description || "No description available"}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <Badge className={getCategoryColor(module.category)}>
              {module.category}
            </Badge>
            <Badge className={getDifficultyColor(module.difficulty)}>
              {module.difficulty}
            </Badge>
            {!module.isPublished && (
              <Badge variant="outline">
                Draft
              </Badge>
            )}
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{lessonCount} lessons</span>
            </div>
            
            {module.estimatedDuration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedDuration}m</span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {module.tags && module.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {module.tags.slice(0, 3).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {module.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{module.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Action Button */}
          <Button 
            onClick={() => onEdit(module)}
            className="w-full"
            variant="outline"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Module
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 