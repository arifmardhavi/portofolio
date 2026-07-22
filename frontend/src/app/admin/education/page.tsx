"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Education = {
  id: number;
  institution_name: string;
  institution_logo?: string;
  institution_url?: string;
  degree: string;
  major: string;
  score?: string;
  start_year: number;
  end_year?: number;
  location: string;
  country_code?: string;
  sort_order: number;
};

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Partial<Education>>({
    sort_order: 0,
    start_year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/educations");
      const json = await res.json();
      if (json.success) {
        setEducations(json.data);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      institution_name: "",
      institution_logo: "",
      institution_url: "",
      degree: "",
      major: "",
      score: "",
      start_year: new Date().getFullYear(),
      end_year: undefined,
      location: "",
      country_code: "",
      sort_order: 0,
    });
  };

  const handleOpenNew = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleOpenEdit = (education: Education) => {
    setEditingId(education.id);
    setFormData(education);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:8000/api/admin/educations/${editingId}`
        : "http://localhost:8000/api/admin/educations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        toast.success(editingId ? "Updated successfully" : "Created successfully");
        setIsOpen(false);
        fetchEducations();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/admin/educations/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" },
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted successfully");
        fetchEducations();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Education</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Education" : "New Education"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <Input
                    required
                    value={formData.institution_name || ""}
                    onChange={e => setFormData({...formData, institution_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution URL</Label>
                  <Input
                    type="url"
                    value={formData.institution_url || ""}
                    onChange={e => setFormData({...formData, institution_url: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    required
                    value={formData.degree || ""}
                    onChange={e => setFormData({...formData, degree: e.target.value})}
                    placeholder="e.g. Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Input
                    required
                    value={formData.major || ""}
                    onChange={e => setFormData({...formData, major: e.target.value})}
                    placeholder="e.g. Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Input
                    required
                    type="number"
                    value={formData.start_year || ""}
                    onChange={e => setFormData({...formData, start_year: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Input
                    type="number"
                    value={formData.end_year || ""}
                    onChange={e => setFormData({...formData, end_year: parseInt(e.target.value) || undefined})}
                    placeholder="Leave blank if ongoing"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Score (GPA, etc)</Label>
                  <Input
                    value={formData.score || ""}
                    onChange={e => setFormData({...formData, score: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={formData.sort_order || 0}
                    onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    required
                    value={formData.location || ""}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country Code</Label>
                  <Input
                    maxLength={2}
                    value={formData.country_code || ""}
                    onChange={e => setFormData({...formData, country_code: e.target.value.toUpperCase()})}
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  {editingId ? "Save Changes" : "Create Education"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Degree/Major</TableHead>
                <TableHead>Years</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educations.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No data found
                  </TableCell>
                </TableRow>
              )}
              {educations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.institution_name}
                    <div className="text-xs text-muted-foreground">{item.location} {item.country_code && `(${item.country_code})`}</div>
                  </TableCell>
                  <TableCell>
                    {item.degree} in {item.major}
                    {item.score && <div className="text-xs text-muted-foreground">Score: {item.score}</div>}
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.start_year} - {item.end_year || "Present"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
