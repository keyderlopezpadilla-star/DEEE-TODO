import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - DEEE TODO',
  description: 'Términos y condiciones de uso del sitio web y servicios de DEEE TODO.',
};

export default function TermsPage() {
  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 glass rounded-lg">
              <FileText className="text-neon-pink" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
              <p className="text-gray-400 mt-1">Última actualización: Febrero 2024</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de DEEE TODO, usted acepta estar sujeto a estos términos y 
                condiciones. Si no está de acuerdo con estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">2. Información de la Empresa</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Denominación social:</strong> DEEE TODO</li>
                <li><strong>Domicilio:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia</li>
                <li><strong>Email:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">3. Servicios Ofrecidos</h2>
              <p>DEEE TODO ofrece los siguientes servicios:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Impresión DTF (Direct to Film)</li>
                <li>Impresión UV</li>
                <li>Sublimación</li>
                <li>Cartelería y gran formato</li>
                <li>Vinilos decorativos y rotulación</li>
                <li>Regalos personalizados</li>
                <li>Servicios de envío</li>
                <li>Venta de productos en tienda online</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">4. Proceso de Compra</h2>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">4.1. Registro de Usuario</h3>
              <p>
                Para realizar compras, puede crear una cuenta proporcionando información veraz y actualizada. 
                Es su responsabilidad mantener la confidencialidad de sus credenciales.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">4.2. Realización del Pedido</h3>
              <p>
                Al realizar un pedido, usted está haciendo una oferta de compra. Nos reservamos el derecho de 
                aceptar o rechazar dicha oferta por cualquier motivo.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">4.3. Confirmación del Pedido</h3>
              <p>
                Una vez procesado su pedido, recibirá un email de confirmación con los detalles de su compra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">5. Precios y Pago</h2>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.1. Precios</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Todos los precios están expresados en euros (€)</li>
                <li>Los precios incluyen IVA salvo que se indique lo contrario</li>
                <li>Los gastos de envío se calculan según destino y peso</li>
                <li>Nos reservamos el derecho de modificar los precios en cualquier momento</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.2. Métodos de Pago</h3>
              <p>Aceptamos los siguientes métodos de pago:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tarjetas de crédito y débito</li>
                <li>Transferencia bancaria</li>
                <li>Pago contrareembolso (según disponibilidad)</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.3. Facturación</h3>
              <p>
                Emitiremos una factura por cada compra realizada. La factura estará disponible en su área 
                de cliente y se enviará por correo electrónico.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">6. Envíos y Entregas</h2>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">6.1. Plazos de Entrega</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Envío estándar:</strong> 3-5 días laborables</li>
                <li><strong>Envío express:</strong> 24-48 horas</li>
                <li><strong>Recogida en tienda:</strong> Según disponibilidad del producto</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">6.2. Zona de Envío</h3>
              <p>
                Realizamos envíos a toda España peninsular. Consulte disponibilidad para Islas Baleares, 
                Canarias, Ceuta y Melilla.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">6.3. Seguimiento</h3>
              <p>
                Recibirá un número de seguimiento para rastrear su pedido en tiempo real.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">7. Derecho de Desistimiento</h2>
              <p>
                Conforme a la Ley de Comercio Electrónico y la normativa de protección al consumidor, 
                usted tiene derecho a desistir de su compra en un plazo de 14 días naturales desde la 
                recepción del producto.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">7.1. Condiciones</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>El producto debe estar en su embalaje original</li>
                <li>No debe haber sido utilizado</li>
                <li>Debe incluir todos sus accesorios y documentación</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">7.2. Excepciones</h3>
              <p>El derecho de desistimiento no aplica a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Productos personalizados o hechos a medida</li>
                <li>Productos que por su naturaleza no pueden ser devueltos</li>
                <li>Productos precintados que han sido abiertos</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">7.3. Procedimiento</h3>
              <p>
                Para ejercer su derecho de desistimiento, contacte con nosotros en info@deeetodo.com 
                indicando el número de pedido y el motivo de la devolución.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">8. Garantías</h2>
              <p>
                Todos nuestros productos cuentan con la garantía legal de 2 años según la normativa vigente. 
                En caso de defecto de fabricación, procederemos a la reparación, sustitución o devolución 
                del importe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">9. Propiedad Intelectual</h2>
              <p>
                Todos los contenidos del sitio web (textos, imágenes, logotipos, diseños) son propiedad de 
                DEEE TODO o de terceros que han autorizado su uso. Queda prohibida su reproducción sin 
                autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">10. Contenido Generado por Usuarios</h2>
              <p>
                Si sube diseños o archivos para personalización, usted:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Garantiza que tiene los derechos necesarios sobre el contenido</li>
                <li>Nos autoriza a utilizar el contenido para la producción del pedido</li>
                <li>Acepta que no infringimos derechos de terceros al procesar su pedido</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">11. Limitación de Responsabilidad</h2>
              <p>
                DEEE TODO no se hace responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Errores en archivos o diseños proporcionados por el cliente</li>
                <li>Retrasos debidos a causas ajenas a nuestra voluntad</li>
                <li>Daños causados por un uso indebido de los productos</li>
                <li>Indisponibilidad temporal del sitio web por mantenimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">12. Resolución de Conflictos</h2>
              <p>
                En caso de controversia, primero intentaremos resolverla de forma amistosa. Si no es posible, 
                se someterá a los Juzgados y Tribunales de Valencia, España, renunciando a cualquier otro 
                fuero que pudiera corresponder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">13. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                Los cambios entrarán en vigor desde su publicación en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">14. Contacto</h2>
              <p>
                Para cualquier duda sobre estos términos y condiciones, puede contactarnos:
              </p>
              <ul className="list-none pl-6 space-y-2 mt-4">
                <li><strong>Email:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
                <li><strong>WhatsApp:</strong> 657 66 67 41</li>
                <li><strong>Dirección:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
