"use client";

import { useEffect, useState, Fragment } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Edit2, Trash2, Loader2, X, Image as ImageIcon } from "lucide-react";

export default function AdminAgroProductImagesPage() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form states
  const [selectedProductId, setSelectedProductId] = useState("");
  const [imageFields, setImageFields] = useState([
    { id: Date.now(), file: null, isPrimary: false, existingUrl: null, dbId: null }
  ]);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    const { data: prodData, error: prodErr } = await supabase.from("agro_products").select("*").order("created_at", { ascending: false });
    const { data: imgData, error: imgErr } = await supabase.from("agro_products_images").select("*").order("created_at", { ascending: true });
    
    if (!prodErr && prodData) setProducts(prodData);
    if (!imgErr && imgData) setImages(imgData);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddDialog = () => {
    setSelectedProductId("");
    setImageFields([{ id: Date.now(), file: null, isPrimary: false, existingUrl: null, dbId: null }]);
    setIsDialogOpen(true);
  };

  const openEditDialog = (productId) => {
    setSelectedProductId(productId);
    const prodImages = images.filter(img => img.product_id === productId);
    if (prodImages.length > 0) {
      setImageFields(prodImages.map(img => ({
        id: img.id,
        file: null,
        isPrimary: img.is_primary,
        existingUrl: img.image_url,
        dbId: img.id
      })));
    } else {
      setImageFields([{ id: Date.now(), file: null, isPrimary: false, existingUrl: null, dbId: null }]);
    }
    setIsDialogOpen(true);
  };

  const addImageField = () => {
    setImageFields([...imageFields, { id: Date.now(), file: null, isPrimary: false, existingUrl: null, dbId: null }]);
  };

  const removeImageField = (id) => {
    setImageFields(imageFields.filter(f => f.id !== id));
  };

  const updateImageField = (id, key, value) => {
    setImageFields(imageFields.map(f => f.id === id ? { ...f, [key]: value } : f));
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
      .from("agro_products_images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("agro_products_images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const deleteImageFromStorage = async (imageUrl) => {
    if (!imageUrl) return;
    try {
      const bucketName = "agro_products_images";
      const marker = `/${bucketName}/`;
      const index = imageUrl.indexOf(marker);
      if (index !== -1) {
        const filePath = imageUrl.substring(index + marker.length);
        await supabase.storage.from(bucketName).remove([filePath]);
      }
    } catch (err) {
      console.error("Error menghapus gambar lama:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!selectedProductId) throw new Error("Pilih produk terlebih dahulu.");
      if (imageFields.length === 0) throw new Error("Minimal harus ada satu gambar.");

      // Validasi field
      for (const field of imageFields) {
        if (!field.existingUrl && !field.file) {
          throw new Error("Pilih file gambar untuk item baru.");
        }
      }

      // Hapus gambar yang dihapus dari field
      const existingDbImages = images.filter(img => img.product_id === selectedProductId);
      const currentDbIds = imageFields.map(f => f.dbId).filter(id => id != null);
      const imagesToDelete = existingDbImages.filter(img => !currentDbIds.includes(img.id));

      for (const img of imagesToDelete) {
        await supabase.from("agro_products_images").delete().eq("id", img.id);
        await deleteImageFromStorage(img.image_url);
      }

      // Upsert data
      for (const field of imageFields) {
        if (field.dbId) {
          let finalUrl = field.existingUrl;
          if (field.file) {
            finalUrl = await uploadImage(field.file);
            await deleteImageFromStorage(field.existingUrl);
          }
          const { error } = await supabase.from("agro_products_images").update({
            image_url: finalUrl,
            is_primary: field.isPrimary
          }).eq("id", field.dbId);
          if(error) throw error;
        } else {
          const finalUrl = await uploadImage(field.file);
          const { error } = await supabase.from("agro_products_images").insert({
            product_id: selectedProductId,
            image_url: finalUrl,
            is_primary: field.isPrimary
          });
          if(error) throw error;
        }
      }

      // update hasImage field in products table
      const productData = {
        hasImage : true
      };

      let error;
      const { error: updateError } = await supabase
        .from("agro_products")
        .update(productData)
        .eq("id", selectedProductId);
      error = updateError;

      setIsDialogOpen(false);
      fetchData();
    } catch (err) {
      alert("Gagal menyimpan gambar: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (productId) => {
    setProductToDeleteId(productId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDeleteId) return;
    setDeleting(true);

    try {
      const prodImages = images.filter(img => img.product_id === productToDeleteId);
      
      // Hapus dari tabel (cascade jika diatur di DB, tapi kita hapus juga di storage)
      for(const img of prodImages) {
          await supabase.from("agro_products_images").delete().eq("id", img.id);
          await deleteImageFromStorage(img.image_url);
      }

      setIsDeleteModalOpen(false);
      setProductToDeleteId(null);
      fetchData();
    } catch (err) {
      alert("Gagal menghapus gambar: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Group images by product
  const groupedData = products.map(prod => ({
    ...prod,
    images: images.filter(img => img.product_id === prod.id)
  })).filter(prod => prod.images.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-primary text-2xl md:text-3xl font-bold">Kelola Gambar UMKM</h1>
          <p className="text-secondary text-sm">
            Upload gambar-gambar untuk produk Agro-UMKM Desa Alamendah.
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 cursor-pointer w-full sm:w-auto self-start">
          <Plus className="w-4 h-4" /> Kelola Gambar Produk
        </Button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-secondary-container shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Produk</TableHead>
                  <TableHead>Total Gambar</TableHead>
                  <TableHead>Thumbnail Utama</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-secondary">
                      Belum ada gambar produk. Klik tombol di atas untuk menambah gambar.
                    </TableCell>
                  </TableRow>
                ) : (
                  groupedData.map((prod) => (
                    <Fragment key={prod.id}>
                      <TableRow className="bg-surface-container/30">
                        <TableCell className="font-semibold text-primary">{prod.title}</TableCell>
                        <TableCell>{prod.images.length} Gambar</TableCell>
                        <TableCell>
                          {prod.images.some(i => i.is_primary) ? "Ada" : "Tidak ada"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => openEditDialog(prod.id)}
                            >
                              <Edit2 className="w-4 h-4 mr-2" /> Edit Gambar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => openDeleteModal(prod.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {prod.images.map((img, index) => (
                        <TableRow key={img.id} className="border-b-0 border-t-0">
                          <TableCell className="pl-8 pb-4 pt-2">
                             <div className="flex items-center gap-3">
                                 <ImageIcon className="w-4 h-4 text-secondary/50" />
                                 <span className="text-sm text-secondary">Gambar {index + 1}</span>
                             </div>
                          </TableCell>
                          <TableCell colSpan={3} className="pb-4 pt-2">
                            <div className="flex items-center gap-4">
                              <img
                                src={img.image_url}
                                alt="Produk"
                                className="w-16 h-16 object-cover rounded border border-secondary-container"
                              />
                              {img.is_primary && (
                                <span className="px-2 py-1 bg-primary-container text-on-primary-container text-xs rounded font-medium">
                                  Primary Thumbnail
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>{imageFields.some(f => f.dbId) ? "Edit Gambar Produk" : "Tambah Gambar Produk"}</DialogTitle>
          <DialogDescription>
            Pilih produk dan unggah satu atau lebih gambar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogContent className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">Pilih Produk</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-secondary-container bg-surface-container-lowest px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-on-surface"
              >
                <option value="" disabled>-- Pilih Produk --</option>
                {products.length === 0 && <option disabled>Tidak ada data produk</option>}
                {products.map(p => (
                  !p.hasImage && <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              {products.every(product => product.hasImage === true) && (
                <p className="text-xs text-error mt-1">Semua Produk Sudah Memiliki Foto!</p>
              )}
              {products.length === 0 && (
                <p className="text-xs text-error mt-1">Harap tambahkan data produk terlebih dahulu di menu UMKM.</p>
              )}
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center border-b border-secondary-container pb-2">
                 <h3 className="text-sm font-semibold text-primary">Daftar Gambar</h3>
                 <Button type="button" size="sm" variant="outline" onClick={addImageField} className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" /> Tambah Kolom
                 </Button>
              </div>
              
              {imageFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-secondary-container rounded-md bg-surface-container-lowest/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center relative">
                   <div className="flex-1 w-full space-y-2">
                      <label className="text-xs font-medium text-secondary">File Gambar</label>
                      <Input
                        type="file"
                        accept="image/*"
                        required={!field.existingUrl}
                        onChange={(e) => updateImageField(field.id, 'file', e.target.files?.[0] || null)}
                        className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-surface-container-high file:text-xs hover:file:opacity-90"
                      />
                      {field.existingUrl && !field.file && (
                        <p className="text-xs text-secondary mt-1">
                          Gambar saat ini tersimpan. Kosongkan jika tidak ingin mengubah.
                        </p>
                      )}
                   </div>
                   
                   <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <input 
                        type="checkbox"
                        id={`primary-${field.id}`}
                        checked={field.isPrimary}
                        onChange={(e) => updateImageField(field.id, 'isPrimary', e.target.checked)}
                        className="w-4 h-4 rounded border-secondary-container text-primary focus:ring-primary"
                      />
                      <label htmlFor={`primary-${field.id}`} className="text-sm text-secondary cursor-pointer">
                         Jadikan Primary
                      </label>
                   </div>

                   {imageFields.length > 1 && (
                     <button
                       type="button"
                       onClick={() => removeImageField(field.id)}
                       className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 shadow-sm hover:bg-error/90"
                       title="Hapus"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   )}
                </div>
              ))}
            </div>

          </DialogContent>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={submitting || products.length === 0}>
              {submitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Semua Gambar</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus <strong>seluruh gambar</strong> untuk produk ini? Tindakan ini akan menghapus data dan berkas gambar dari penyimpanan secara permanen.
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
            {deleting ? "Menghapus..." : "Ya, Hapus Semua"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
