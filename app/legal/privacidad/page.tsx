import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad - DEEE TODO',
  description: 'Política de Privacidad y protección de datos de DEEE TODO conforme al RGPD.',
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 glass rounded-lg">
              <Shield className="text-neon-cyan" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Política de Privacidad</h1>
              <p className="text-gray-400 mt-1">Última actualización: Febrero 2024</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">1. Responsable del Tratamiento</h2>
              <p>
                DEEE TODO (en adelante, "nosotros" o "la empresa"), con domicilio en Carrer de la Muntanya, 11, 
                46680 Algemesí, Valencia, es el responsable del tratamiento de los datos personales que nos facilite.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nombre comercial:</strong> DEEE TODO</li>
                <li><strong>Dirección:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia</li>
                <li><strong>Email de contacto:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">2. Datos que Recopilamos</h2>
              <p>Recopilamos y tratamos las siguientes categorías de datos personales:</p>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">2.1. Datos de Identificación</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección postal</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">2.2. Datos de Navegación</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas visitadas</li>
                <li>Tiempo de permanencia</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">2.3. Datos de Pedidos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Historial de compras</li>
                <li>Preferencias de productos</li>
                <li>Datos de pago (procesados por pasarelas seguras)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">3. Finalidad del Tratamiento</h2>
              <p>Sus datos personales serán tratados con las siguientes finalidades:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Gestión de pedidos:</strong> Procesar y entregar sus compras</li>
                <li><strong>Comunicación:</strong> Responder a sus consultas y solicitudes</li>
                <li><strong>Marketing:</strong> Enviar ofertas y novedades (solo con su consentimiento)</li>
                <li><strong>Mejora del servicio:</strong> Análisis y mejora de nuestra web</li>
                <li><strong>Cumplimiento legal:</strong> Obligaciones fiscales y contables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">4. Base Legal del Tratamiento</h2>
              <p>El tratamiento de sus datos se basa en:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ejecución de contrato:</strong> Para gestionar sus pedidos</li>
                <li><strong>Consentimiento:</strong> Para comunicaciones comerciales</li>
                <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios</li>
                <li><strong>Obligación legal:</strong> Para cumplir con normativas fiscales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">5. Conservación de Datos</h2>
              <p>
                Sus datos personales serán conservados durante el tiempo necesario para cumplir con la finalidad 
                para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Datos de clientes:</strong> Mientras dure la relación comercial y hasta 6 años después</li>
                <li><strong>Datos de contacto:</strong> Hasta que solicite su supresión</li>
                <li><strong>Datos de navegación:</strong> Máximo 2 años</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">6. Destinatarios de los Datos</h2>
              <p>Sus datos podrán ser comunicados a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Shopify:</strong> Para la gestión de la tienda online</li>
                <li><strong>Google Sheets:</strong> Para almacenamiento de formularios</li>
                <li><strong>Empresas de mensajería:</strong> Para la entrega de pedidos</li>
                <li><strong>Entidades bancarias:</strong> Para la gestión de pagos</li>
                <li><strong>Administraciones públicas:</strong> Cuando exista obligación legal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">7. Transferencias Internacionales</h2>
              <p>
                Algunos de nuestros proveedores de servicios se encuentran fuera del Espacio Económico Europeo. 
                En estos casos, nos aseguramos de que se adopten las garantías adecuadas conforme al RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">8. Sus Derechos</h2>
              <p>Como titular de los datos, usted tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceso:</strong> Conocer qué datos tratamos sobre usted</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                <li><strong>Retirar consentimiento:</strong> En cualquier momento</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puede contactarnos en: <strong className="text-neon-cyan">info@deeetodo.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">9. Cookies</h2>
              <p>
                Utilizamos cookies para mejorar su experiencia de navegación. Puede consultar nuestra política 
                de cookies y gestionar sus preferencias a través del banner de consentimiento.
              </p>
              <p className="mt-2">
                Las cookies que utilizamos incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Cookies necesarias:</strong> Esenciales para el funcionamiento del sitio</li>
                <li><strong>Cookies analíticas:</strong> Para entender cómo usa nuestro sitio</li>
                <li><strong>Cookies de marketing:</strong> Para mostrar anuncios relevantes</li>
                <li><strong>Cookies de preferencias:</strong> Para recordar su configuración</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">10. Seguridad</h2>
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales 
                contra el acceso no autorizado, la pérdida o la destrucción accidental.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">11. Menores de Edad</h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 14 años. Si es menor de edad, debe contar 
                con el consentimiento de sus padres o tutores para utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">12. Reclamaciones</h2>
              <p>
                Si considera que el tratamiento de sus datos personales no se ajusta a la normativa, puede 
                presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD):
              </p>
              <ul className="list-none pl-6 space-y-2 mt-4">
                <li><strong>Web:</strong> www.aepd.es</li>
                <li><strong>Dirección:</strong> C/ Jorge Juan, 6, 28001 Madrid</li>
                <li><strong>Teléfono:</strong> 901 100 099 / 912 663 517</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">13. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad. Cualquier cambio será 
                publicado en esta página con la fecha de actualización correspondiente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">14. Contacto</h2>
              <p>
                Para cualquier duda sobre esta Política de Privacidad o sobre el tratamiento de sus datos 
                personales, puede contactarnos:
              </p>
              <ul className="list-none pl-6 space-y-2 mt-4">
                <li><strong>Email:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
                <li><strong>Dirección:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
