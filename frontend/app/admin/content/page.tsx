"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  BookOpen, 
  Clock, 
  Edit3,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getModules } from "@/lib/actions";
import { CreateModuleModal } from "@/components/admin/CreateModuleModal";
import { ModuleCard } from "@/components/admin/ModuleCard";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminContentPage() {
  
  // State management
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load modules
  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (filterCategory !== 'all') filters.category = filterCategory;
      if (filterDifficulty !== 'all') filters.difficulty = filterDifficulty;
      if (searchTerm) filters.search = searchTerm;

      const result = await getModules(filters);
      if (result.success && result.modules) {
        setModules(result.modules);
      } else {
        console.error('Failed to load modules:', result.error);
      }
    } catch (error) {
      console.error('Error loading modules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reload modules when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadModules();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filterCategory, filterDifficulty]);

  const handleCreateModule = () => {
    setShowCreateModal(true);
  };

  const handleModuleCreated = (newModule: any) => {
    setModules(prev => [newModule, ...prev]);
    setShowCreateModal(false);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
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
    { value: 'all', label: 'All Levels' },
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE': return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'WINE': return 'bg-purple-100 text-purple-800';
      case 'SPIRITS': return 'bg-amber-100 text-amber-800';
      case 'COCKTAILS': return 'bg-pink-100 text-pink-800';
      case 'SERVICE': return 'bg-blue-100 text-blue-800';
      case 'COMPLIANCE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout 
      title="Content Management" 
      description="Create and manage training modules and lessons"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
          </div>
          <Button onClick={handleCreateModule}>
            <Plus className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Modules</p>
                  <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Play className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {modules.filter(m => m.isPublished).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit3 className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {modules.filter(m => !m.isPublished).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {modules.length > 0 
                      ? Math.round(modules.reduce((acc, m) => acc + (m.estimatedDuration || 0), 0) / modules.length)
                      : 0
                    }m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
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

        {/* Modules Display */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : modules.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No modules</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first training module.</p>
            <div className="mt-6">
              <Button onClick={handleCreateModule}>
                <Plus className="w-4 h-4 mr-2" />
                Create Module
              </Button>
            </div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                viewMode={viewMode}
                onEdit={() => {/* TODO: Implement edit */}}
                onDelete={() => {/* TODO: Implement delete */}}
                onDuplicate={() => {/* TODO: Implement duplicate */}}
                getCategoryColor={getCategoryColor}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        )}

        {/* Create Module Modal */}
        <CreateModuleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onModuleCreated={handleModuleCreated}
        />
      </div>
    </AdminLayout>
  );
} 