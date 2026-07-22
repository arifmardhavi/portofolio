"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Avoid complex full-type in form state for simplicity
type Career = {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  status: string;
  work_model: string;
  country_code: string;
  location: string;
  company_url?: string;
  company_logo?: string;
  sort_order: number;
  details?: {
    responsibilities: string[];
    what_i_learned: string[];
    impact: string[];
  };
};

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Career>>({
    status: "Full-time",
    work_model: "On-site",
    country_code: "ID",
    sort_order: 0,
    details: {
      responsibilities: [""],
      what_i_learned: [""],
      impact: [""],
    }
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/careers", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        }
      });
      const json = await res.json();
      if (json.success) {
        setCareers(json.data);
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
      company_name: "",
      role: "",
      start_date: "",
      end_date: "",
      location: "",
      company_url: "",
      company_logo: "",
      status: "Full-time",
      work_model: "On-site",
      country_code: "ID",
      sort_order: 0,
      details: {
        responsibilities: [""],
        what_i_learned: [""],
        impact: [""],
      }
    });
  };

  const handleOpenNew = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleOpenEdit = (career: Career) => {
    setEditingId(career.id);
    setFormData({
      ...career,
      end_date: career.end_date || "",
      details: career.details || {
        responsibilities: [""],
        what_i_learned: [""],
        impact: [""],
      }
    });
    setIsOpen(true);
  };

  const handleArrayChange = (field: keyof NonNullable<Career['details']>, index: number, value: string) => {
    const newDetails = { ...formData.details! };
    newDetails[field][index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const addArrayItem = (field: keyof NonNullable<Career['details']>) => {
    const newDetails = { ...formData.details! };
    newDetails[field] = [...(newDetails[field] || []), ""];
    setFormData({ ...formData, details: newDetails });
  };

  const removeArrayItem = (field: keyof NonNullable<Career['details']>, index: number) => {
    const newDetails = { ...formData.details! };
    newDetails[field].splice(index, 1);
    setFormData({ ...formData, details: newDetails });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cleanup empty array items
    const cleanDetails = {
      responsibilities: formData.details?.responsibilities.filter(i => i.trim() !== "") || [],
      what_i_learned: formData.details?.what_i_learned.filter(i => i.trim() !== "") || [],
      impact: formData.details?.impact.filter(i => i.trim() !== "") || [],
    };

    const payload = {
      ...formData,
      end_date: formData.end_date ? formData.end_date : null,
      details: cleanDetails
    };

    try {
      const url = editingId
        ? `http://localhost:8000/api/admin/careers/${editingId}`
        : "http://localhost:8000/api/admin/careers";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        toast.success(editingId ? "Updated successfully" : "Created successfully");
        setIsOpen(false);
        fetchCareers();
      } else {
        toast.error(json.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/admin/careers/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted successfully");
        fetchCareers();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Careers</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Career
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Career" : "New Career"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    required
                    value={formData.company_name || ""}
                    onChange={e => setFormData({...formData, company_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    required
                    value={formData.role || ""}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    required
                    type="date"
                    value={formData.start_date ? formData.start_date.split('T')[0] : ""}
                    onChange={e => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.end_date ? formData.end_date.split('T')[0] : ""}
                    onChange={e => setFormData({...formData, end_date: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Leave blank if current</p>
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
                  <Label>Country Code (e.g. ID, US)</Label>
                  <Input
                    required
                    maxLength={2}
                    value={formData.country_code || ""}
                    onChange={e => setFormData({...formData, country_code: e.target.value.toUpperCase()})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => setFormData({...formData, status: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Work Model</Label>
                  <Select
                    value={formData.work_model}
                    onValueChange={(val) => setFormData({...formData, work_model: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Company URL</Label>
                  <Input
                    type="url"
                    value={formData.company_url || ""}
                    onChange={e => setFormData({...formData, company_url: e.target.value})}
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
              </div>

              {/* Details Sections */}
              <div className="space-y-6 pt-4 border-t">
                {/* Responsibilities */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Responsibilities</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('responsibilities')}>
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                  {formData.details?.responsibilities.map((item, idx) => (
                    <div key={`resp-${idx}`} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('responsibilities', idx, e.target.value)}
                        placeholder="e.g. Developed API endpoints..."
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('responsibilities', idx)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* What I Learned */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">What I Learned</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('what_i_learned')}>
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                  {formData.details?.what_i_learned.map((item, idx) => (
                    <div key={`learn-${idx}`} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('what_i_learned', idx, e.target.value)}
                        placeholder="e.g. Advanced Next.js patterns..."
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('what_i_learned', idx)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Impact</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('impact')}>
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                  {formData.details?.impact.map((item, idx) => (
                    <div key={`impact-${idx}`} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('impact', idx, e.target.value)}
                        placeholder="e.g. Increased performance by 40%..."
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('impact', idx)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  {editingId ? "Save Changes" : "Create Career"}
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
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status/Model</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No data found
                  </TableCell>
                </TableRow>
              )}
              {careers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.company_name}
                    <div className="text-xs text-muted-foreground">{item.location} ({item.country_code})</div>
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(item.start_date).toLocaleDateString()} -
                    {item.end_date ? new Date(item.end_date).toLocaleDateString() : " Present"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.status} · {item.work_model}
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
