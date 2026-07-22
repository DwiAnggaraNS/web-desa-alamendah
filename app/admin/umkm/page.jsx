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

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [owner_wa_number, setOwner_wa_number] = useState("");
  const [owner_address, setOwner_address] = useState("");
  const [company, setCompany] = useState("");
  const [hasImage, setHasImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setproductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agro_products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddDialog = () => {
    setCurrentProduct(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setOwner_address("");
    setOwner_wa_number("");
    setStock_quantity("");
    setUnit_price("");
    setCompany("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setTitle(product.title);
    setCategory(product.category);
    setDescription(product.description);
    setOwner_address(product.owner_address);
    setOwner_wa_number(product.owner_wa_number);
    setStock_quantity(product.stock_quantity);
    setUnit_price(product.unit_price);
    setCompany(product.company)
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const productData = {
        title,
        category,
        description,
        owner_address,
        owner_wa_number,
        unit_price,
        stock_quantity,
        company,
        hasImage : false,
        created_at: currentProduct ? currentProduct.created_at : new Date().toISOString(),
      };

      let error;
      if (currentProduct) {
        const { error: updateError } = await supabase
          .from("agro_products")
          .update(productData)
          .eq("id", currentProduct.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("agro_products")
          .insert([productData]);
        error = insertError;
      }

      if (error) {
        throw error;
      }

      setIsDialogOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Gagal menyimpan produk: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (product) => {
    setproductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);

    try {
      const { error } = await supabase.from("agro_products").delete().eq("id", productToDelete.id);
      if (error) {
        throw error;
      }

      setIsDeleteModalOpen(false);
      setproductToDelete(null);
      fetchProducts();
    } catch (err) {
      alert("Gagal menghapus produk: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-primary text-2xl md:text-3xl font-bold">Kelola Produk UMKM</h1>
          <p className="text-secondary text-sm">
            Tambah, edit, dan hapus produk UMKM di Desa Alamendah.
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 cursor-pointer w-full sm:w-auto self-start">
          <Plus className="w-4 h-4" /> Tambah Produk
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
                  <TableHead>Nama Usaha</TableHead>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="max-w-md">Deskripsi</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Contact Person (No.WA)</TableHead>
                  <TableHead>Alamat Usaha</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-secondary">
                      Belum ada data produk. Klik "Tambah Produk" untuk membuat data produk baru.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.company}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="max-w-md truncate">{product.description}</TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>Rp{product.unit_price}</TableCell>
                      <TableCell>{product.owner_wa_number}</TableCell>
                      <TableCell>{product.owner_address}</TableCell>
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
          <DialogTitle>{currentProduct ? "Edit Artikel" : "Tambah Artikel Baru"}</DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk menyimpan data artikel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Nama Usaha</label>
                <Input
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Masukkan nama usaha"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Kategori</label>
                <br />
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 px-3 rounded-md border border-secondary-container required">
                  <option value="Hasil Ternak">Hasil Ternak</option>
                  <option value="Hasil Tani">Hasil Tani</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Nama Produk</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan nama produk"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Deskripsi</label>
                <Input
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Masukkan deskripsi produk"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Jumlah Stok</label>
                <Input
                  required
                  value={stock_quantity}
                  onChange={(e) => setStock_quantity(e.target.value)}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Harga</label>
                <Input
                  required
                  value={unit_price}
                  onChange={(e) => setUnit_price(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Contact Person No.WA</label>
                  <Input
                    required
                    value={owner_wa_number}
                    onChange={(e) => setOwner_wa_number(e.target.value)}
                    type="tel" 
                    pattern="[0-9]{10,15}" 
                    placeholder="Contoh: 081234567890" 
                  />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-secondary">Alamat Usaha</label>
                <Input
                  required
                  value={owner_address}
                  onChange={(e) => setOwner_address(e.target.value)}
                  placeholder="Masukkan alamat usaha"
                />
              </div>
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
            Apakah Anda yakin ingin menghapus artikel <span className="font-semibold text-on-surface">"{productToDelete?.title}"</span>? Tindakan ini akan menghapus artikel dan berkas gambar dari penyimpanan Supabase.
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