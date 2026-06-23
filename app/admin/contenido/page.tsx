import { Metadata } from 'next';
import { requireAdmin } from '@/lib/utils/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { FileText, Image, Layout, Type } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gestión de Contenido - Admin - DEEE TODO',
  description: 'Gestiona el contenido del sitio web',
};

export default async function ContentManagementPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Gestión de Contenido</h1>
          <p className="text-gray-400">
            Edita los textos y contenido del sitio web
          </p>
        </div>

        <div className="space-y-6">
          {/* Hero Section */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Layout className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Sección Hero (Portada)</h2>
            </div>

            <form className="space-y-4">
              <Input
                label="Título principal"
                defaultValue="Literalmente, hacemos DEEE TODO"
              />
              <Input
                label="Subtítulo"
                defaultValue="Copistería & Estudio Creativo en Algemesí"
              />
              <TextArea
                label="Descripción"
                defaultValue="Tecnología de impresión de última generación al servicio de tu creatividad. Si lo puedes imaginar, nosotros lo hacemos realidad."
                rows={3}
              />
              <Button type="submit" variant="primary">
                Guardar Hero
              </Button>
            </form>
          </Card>

          {/* Services */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Type className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Servicios</h2>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Impresión DTF', desc: 'Tecnología de impresión directa sobre textil de última generación.' },
                { title: 'Impresión UV', desc: 'Impresión sobre cualquier superficie: madera, metal, cristal, plástico.' },
                { title: 'Sublimación', desc: 'Personalización de textiles, tazas, cojines y más.' },
                { title: 'Cartelería', desc: 'Carteles, banners, vinilos de gran formato.' },
              ].map((service, i) => (
                <div key={i} className="glass rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input defaultValue={service.title} placeholder="Título" />
                    <div className="md:col-span-2">
                      <Input defaultValue={service.desc} placeholder="Descripción" />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm">
                + Añadir servicio
              </Button>
              <div className="pt-4">
                <Button variant="primary">Guardar Servicios</Button>
              </div>
            </div>
          </Card>

          {/* SEO */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <FileText className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold">SEO y Metadatos</h2>
            </div>

            <form className="space-y-4">
              <Input
                label="Meta título"
                defaultValue="DEEE TODO - Literalmente, hacemos DEEE TODO"
                placeholder="Título para buscadores"
              />
              <TextArea
                label="Meta descripción"
                defaultValue="Copistería moderna en Algemesí, Valencia. Impresión DTF, UV, Sublimación, Cartelería, Vinilos, Regalos personalizados y envíos."
                placeholder="Descripción para buscadores (máx. 160 caracteres)"
                rows={3}
              />
              <Input
                label="Palabras clave"
                defaultValue="copistería, impresión, Algemesí, Valencia, DTF, sublimación"
                placeholder="Separadas por comas"
              />
              <Button type="submit" variant="primary">
                Guardar SEO
              </Button>
            </form>
          </Card>

          {/* Banners / Promotions */}
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 glass rounded-lg">
                <Image className="text-neon-pink" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Promociones</h2>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Banner principal</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">Activo</span>
                </div>
                <Input
                  label="Texto del banner"
                  defaultValue="🎉 ¡Envío gratis en pedidos superiores a 50€!"
                />
              </div>

              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Código promocional</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-500/10 text-gray-400">Inactivo</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Código" defaultValue="BIENVENIDO10" />
                  <Input label="Descuento (%)" type="number" defaultValue="10" />
                </div>
              </div>

              <Button variant="primary">Guardar Promociones</Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
