"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Plus, 
  ArrowLeft, 
  Search, 
  Grid3X3, 
  List, 
  FileText, 
  Video, 
  HelpCircle,
  Clock,
  Edit3,
  Trash2,
  Copy,
  Play,
  Eye,
  GripVertical,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function LessonsPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params?.moduleId as string;
  
  // State management
  const [module, setModule] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContentType, setFilterContentType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    contentType: '',
    duration: '',
    orderIndex: '',
    isRequired: true,
  });

  // Mock data for now - will be replaced with real API calls
  useEffect(() => {
    loadModuleAndLessons();
  }, [moduleId]);

  const loadModuleAndLessons = async () => {
    setLoading(true);
    try {
      // Mock module data
      setModule({
        id: moduleId,
        title: "Wine Fundamentals",
        description: "Comprehensive introduction to wine basics",
        category: "WINE",
        difficulty: "BEGINNER",
        lessonCount: 5
      });

      // Mock lessons data
      setLessons([
        {
          id: "1",
          title: "Introduction to Wine",
          description: "Basic overview of wine types and regions",
          contentType: "TEXT",
          duration: 15,
          orderIndex: 1,
          isRequired: true,
          isPublished: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          title: "Wine Tasting Basics",
          description: "Learn the fundamentals of wine tasting",
          contentType: "VIDEO",
          duration: 25,
          orderIndex: 2,
          isRequired: true,
          isPublished: false,
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          title: "Wine Regions Quiz",
          description: "Test your knowledge of major wine regions",
          contentType: "QUIZ",
          duration: 10,
          orderIndex: 3,
          isRequired: true,
          isPublished: true,
          passingScore: 80,
          createdAt: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error loading module and lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLesson = () => {
    setShowCreateModal(true);
  };

  const handleLessonCreated = (newLesson: any) => {
    setLessons(prev => [...prev, newLesson]);
    setShowCreateModal(false);
  };

  const handleEditLesson = (lesson: any) => {
    router.push(`/admin/content/${moduleId}/lessons/${lesson.id}/edit`);
  };

  const handleDeleteLesson = (lesson: any) => {
    // TODO: Implement delete functionality
    console.log('Delete lesson:', lesson.id);
  };

  const handleDuplicateLesson = (lesson: any) => {
    // TODO: Implement duplicate functionality
    console.log('Duplicate lesson:', lesson.id);
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'VIDEO': return Video;
      case 'QUIZ': return HelpCircle;
      case 'INTERACTIVE': return Play;
      default: return FileText;
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'VIDEO': return 'bg-purple-100 text-purple-800';
      case 'QUIZ': return 'bg-orange-100 text-orange-800';
      case 'INTERACTIVE': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    if (searchTerm && !lesson.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterContentType !== 'all' && lesson.contentType !== filterContentType) {
      return false;
    }
    if (filterStatus !== 'all') {
      if (filterStatus === 'published' && !lesson.isPublished) return false;
      if (filterStatus === 'draft' && lesson.isPublished) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/content')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
          <div className="text-sm text-gray-500">
            Content Management / {module?.title} / Lessons
          </div>
        </div>

        {/* Module Header */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{module?.title}</h1>
              <p className="text-gray-600 mt-1">{module?.description}</p>
              <div className="flex items-center space-x-4 mt-3">
                <Badge className="bg-blue-100 text-blue-800">
                  {module?.category}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {module?.difficulty}
                </Badge>
                <span className="text-sm text-gray-500">
                  {lessons.length} lessons
                </span>
              </div>
            </div>
            <Button onClick={handleCreateLesson}>
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterContentType} onValueChange={setFilterContentType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="INTERACTIVE">Interactive</SelectItem>
                  <SelectItem value="QUIZ">Quiz</SelectItem>
                  <SelectItem value="DOCUMENT">Document</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lessons Display */}
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first lesson.</p>
            <div className="mt-6">
              <Button onClick={handleCreateLesson}>
                <Plus className="w-4 h-4 mr-2" />
                Create Lesson
              </Button>
            </div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredLessons.map((lesson, index) => {
              const ContentIcon = getContentTypeIcon(lesson.contentType);
              
              if (viewMode === 'list') {
                return (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                                                     <div className="flex items-center space-x-2">
                             <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                             <span className="text-sm font-mono text-gray-500">
                               {String(lesson.orderIndex).padStart(2, '0')}
                             </span>
                           </div>
                          
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ContentIcon className="w-5 h-5 text-blue-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {lesson.title}
                              </h3>
                              {!lesson.isPublished && (
                                <Badge variant="outline" className="text-xs">
                                  Draft
                                </Badge>
                              )}
                              {lesson.isRequired && (
                                <Badge variant="secondary" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                              {lesson.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{lesson.duration}m</span>
                              </div>
                              {lesson.passingScore && (
                                <span>Passing: {lesson.passingScore}%</span>
                              )}
                            </div>
                          </div>

                          <Badge className={getContentTypeColor(lesson.contentType)}>
                            {lesson.contentType}
                          </Badge>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditLesson(lesson)}>
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
                                <DropdownMenuItem onClick={() => handleEditLesson(lesson)}>
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit Lesson
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDuplicateLesson(lesson)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteLesson(lesson)}
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
                <Card key={lesson.id} className="hover:shadow-lg transition-all duration-200 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ContentIcon className="w-6 h-6 text-blue-600" />
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
                          <DropdownMenuItem onClick={() => handleEditLesson(lesson)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Lesson
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateLesson(lesson)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteLesson(lesson)}
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
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={getContentTypeColor(lesson.contentType)}>
                          {lesson.contentType}
                        </Badge>
                        {!lesson.isPublished && (
                          <Badge variant="outline">
                            Draft
                          </Badge>
                        )}
                        {lesson.isRequired && (
                          <Badge variant="secondary">
                            Required
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}m</span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          #{lesson.orderIndex}
                        </span>
                      </div>
                      
                      <Button 
                        onClick={() => handleEditLesson(lesson)}
                        className="w-full"
                        variant="outline"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Lesson
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Create Lesson Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to the "{module?.title}" module.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // Create a new lesson with mock data for now
              const newLesson = {
                id: Date.now().toString(),
                title: lessonForm.title,
                description: lessonForm.description,
                contentType: lessonForm.contentType,
                duration: parseInt(lessonForm.duration) || 30,
                orderIndex: parseInt(lessonForm.orderIndex) || lessons.length + 1,
                isRequired: lessonForm.isRequired,
                isPublished: false,
                createdAt: new Date().toISOString()
              };
              
              handleLessonCreated(newLesson);
              
              // Reset form
              setLessonForm({
                title: '',
                description: '',
                contentType: '',
                duration: '',
                orderIndex: '',
                isRequired: true,
              });
            }}>
              <div className="space-y-2">
                <Label htmlFor="lesson-title">Title *</Label>
                <Input
                  id="lesson-title"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Introduction to Wine Tasting"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson-description">Description</Label>
                <Textarea
                  id="lesson-description"
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of what this lesson covers..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson-type">Content Type *</Label>
                  <Select
                    value={lessonForm.contentType}
                    onValueChange={(value) => setLessonForm(prev => ({ ...prev, contentType: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEXT">Text Content</SelectItem>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="INTERACTIVE">Interactive</SelectItem>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lesson-duration">Duration (minutes)</Label>
                  <Input
                    id="lesson-duration"
                    type="number"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="30"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="lesson-required"
                  checked={lessonForm.isRequired}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, isRequired: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Label htmlFor="lesson-required">This lesson is required</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!lessonForm.title || !lessonForm.contentType}
                >
                  Create Lesson
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
} 