"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Introduction = {
  id: number;
  content: string[];
  is_active: boolean;
};

export default function AdminAboutPage() {
  const [introductions, setIntroductions] = useState<Introduction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchIntroductions();
  }, []);

  const fetchIntroductions = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/admin/introductions", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        }
      });
      const json = await res.json();
      if (json.success) {
        setIntroductions(json.data);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setParagraphs([""]);
    setIsActive(true);
    setIsOpen(true);
  };

  const handleOpenEdit = (intro: Introduction) => {
    setEditingId(intro.id);
    setParagraphs(intro.content);
    setIsActive(intro.is_active);
    setIsOpen(true);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newP = [...paragraphs];
    newP[index] = value;
    setParagraphs(newP);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length === 1) return;
    const newP = [...paragraphs];
    newP.splice(index, 1);
    setParagraphs(newP);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      content: paragraphs.filter((p) => p.trim() !== ""),
      is_active: isActive,
    };

    if (payload.content.length === 0) {
      toast.error("At least one paragraph is required");
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:8081/api/admin/introductions/${editingId}`
        : "http://localhost:8081/api/admin/introductions";
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
        fetchIntroductions();
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
      const res = await fetch(`http://localhost:8081/api/admin/introductions/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted successfully");
        fetchIntroductions();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (intro: Introduction) => {
    if (intro.is_active) return; // Don't allow toggling off directly, only toggling another ON
    try {
      const res = await fetch(`http://localhost:8081/api/admin/introductions/${intro.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify({ ...intro, is_active: true }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Set as active");
        fetchIntroductions();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">About / Introduction</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Introduction" : "New Introduction"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-4">
                <Label>Paragraphs</Label>
                {paragraphs.map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <Textarea
                      value={p}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      placeholder={`Paragraph ${idx + 1}`}
                      className="min-h-[100px]"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      disabled={paragraphs.length === 1}
                      onClick={() => removeParagraph(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addParagraph}>
                  <Plus className="mr-2 h-4 w-4" /> Add Paragraph
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  id="active-mode"
                />
                <Label htmlFor="active-mode">Set as Active</Label>
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Introduction Versions</CardTitle>
          <CardDescription>Manage the text shown in the hero section.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Paragraphs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {introductions.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
              {introductions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-[300px] truncate">
                    {item.content[0]}
                  </TableCell>
                  <TableCell>{item.content.length}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => handleToggleActive(item)}
                      disabled={item.is_active}
                    />
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
