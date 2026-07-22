"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [highlightedDescription, setHighlightedDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openAddDialog = () => {
    setCurrentArticle(null);
    setTitle("");
    setCategory("");
    setContent("");
    setImageFile(null);
    setHighlightedDescription("");
    setAuthorName("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (article) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setContent(article.content);
    setImageFile(null);
    setHighlightedDescription(article.highlighted_description);
    setAuthorName(article.author_name);
    setIsDialogOpen(true);
  };

  const uploadImage = async (file) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("Pengguna tidak terautentikasi.");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const deleteImageFromStorage = async (imageUrl) => {
    if (!imageUrl) return;
    try {
      const bucketName = "article-images";
      const marker = `/${bucketName}/`;
      const index = imageUrl.indexOf(marker);
      if (index !== -1) {
        const filePath = imageUrl.substring(index + marker.length);
        const { error } = await supabase.storage.from(bucketName).remove([filePath]);
        if (error) {
          console.error("Gagal menghapus gambar dari storage:", error.message);
        }
      }
    } catch (err) {
      console.error("Error menghapus gambar lama:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImageUrl = currentArticle ? currentArticle.image_url : "";
      const oldImageUrl = currentArticle?.image_url;

      // Upload image if a new one is selected
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      } else if (!currentArticle) {
        throw new Error("Gambar wajib diunggah untuk artikel baru.");
      }

      const articleData = {
        title,
        category,
        content,
        image_url: finalImageUrl,
        highlighted_description: highlightedDescription,
        author_name: authorName,
        published_at: currentArticle ? currentArticle.published_at : new Date().toISOString(),
      };

      let error;
      if (currentArticle) {
        const { error: updateError } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", currentArticle.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("articles")
          .insert([articleData]);
        error = insertError;
      }

      if (error) {
        throw error;
      }

      // Cleanup old image if updated with a new image
      if (currentArticle && imageFile && oldImageUrl && oldImageUrl !== finalImageUrl) {
        await deleteImageFromStorage(oldImageUrl);
      }

      setIsDialogOpen(false);
      fetchArticles();
    } catch (err) {
      alert("Gagal menyimpan artikel: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (article) => {
    setArticleToDelete(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setDeleting(true);

    try {
      const { error } = await supabase.from("articles").delete().eq("id", articleToDelete.id);
      if (error) {
        throw error;
      }

      // Delete associated image from storage
      if (articleToDelete.image_url) {
        await deleteImageFromStorage(articleToDelete.image_url);
      }

      setIsDeleteModalOpen(false);
      setArticleToDelete(null);
      fetchArticles();
    } catch (err) {
      alert("Gagal menghapus artikel: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-primary text-2xl md:text-3xl font-bold">Kelola Artikel</h1>
          <p className="text-secondary text-sm">
            Tambah, edit, dan hapus artikel berita atau pengumuman Desa Alamendah.
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 cursor-pointer w-full sm:w-auto self-start">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-secondary-container shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Gambar</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead className="max-w-xs">Rangkuman</TableHead>
                  <TableHead className="max-w-md">Konten</TableHead>
                  <TableHead>Tanggal Rilis</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-secondary">
                      Belum ada artikel. Klik "Tambah Artikel" untuk membuat artikel baru.
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-16 h-10 object-cover rounded border border-secondary-container"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-surface-container-high rounded border border-secondary-container flex items-center justify-center text-xs text-secondary">
                            No Img
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>{article.author_name}</TableCell>
                      <TableCell className="max-w-xs truncate">{article.highlighted_description}</TableCell>
                      <TableCell className="max-w-md truncate">{article.content}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(article.published_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => openEditDialog(article)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => openDeleteModal(article)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Form Dialog Add / Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>{currentArticle ? "Edit Artikel" : "Tambah Artikel Baru"}</DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk menyimpan data artikel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Judul</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul artikel"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Kategori</label>
                <br />
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 px-3 rounded-md border border-secondary-container required">
                  <option value="Peternakan">Peternakan</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Kesehatan">Kesehatan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Nama Penulis</label>
                <Input
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Masukkan nama penulis"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Gambar Artikel</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    required={!currentArticle}
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-surface-container-high file:text-xs hover:file:opacity-90"
                  />
                </div>
                {currentArticle && !imageFile && (
                  <p className="text-xs text-secondary mt-1">
                    Kosongkan jika tidak ingin mengubah gambar saat ini.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">Deskripsi Singkat</label>
              <Input
                required
                value={highlightedDescription}
                onChange={(e) => setHighlightedDescription(e.target.value)}
                placeholder="Rangkuman singkat artikel untuk pratinjau"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">Konten Artikel</label>
              <Textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis isi konten artikel di sini..."
                rows={6}
              />
            </div>
          </DialogContent>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={submitting}>
              {submitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Artikel</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus artikel <span className="font-semibold text-on-surface">"{articleToDelete?.title}"</span>? Tindakan ini akan menghapus artikel dan berkas gambar dari penyimpanan Supabase.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={deleting}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}