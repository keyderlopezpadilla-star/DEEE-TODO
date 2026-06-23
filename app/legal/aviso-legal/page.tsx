import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aviso Legal - DEEE TODO',
  description: 'Aviso legal e información corporativa de DEEE TODO conforme a la LSSI-CE.',
};

export default function LegalNoticePage() {
  return (
    <MainLayout showParticles={false}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 glass rounded-lg">
              <Scale className="text-neon-cyan" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Aviso Legal</h1>
              <p className="text-gray-400 mt-1">Conforme a la LSSI-CE</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">1. Datos Identificativos</h2>
              <p>
                En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 
                de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), 
                el titular del sitio web informa de lo siguiente:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Denominación social:</strong> DEEE TODO</li>
                <li><strong>Nombre comercial:</strong> DEEE TODO</li>
                <li><strong>Domicilio social:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia, España</li>
                <li><strong>Email de contacto:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
                <li><strong>Sitio web:</strong> www.deeetodo.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">2. Objeto</h2>
              <p>
                El titular del sitio web pone a disposición de los usuarios el presente documento con el que 
                pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la 
                Sociedad de la Información y del Comercio Electrónico (LSSI-CE), así como informar a todos los 
                usuarios del sitio web respecto a cuáles son las condiciones de uso del sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">3. Condiciones de Acceso y Uso</h2>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">3.1. Carácter Gratuito</h3>
              <p>
                El acceso al sitio web tiene carácter gratuito para los usuarios, salvo el coste de conexión 
                a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">3.2. Registro de Usuario</h3>
              <p>
                Con carácter general, la prestación de servicios no exige la previa suscripción o registro 
                de los usuarios. No obstante, para hacer uso de determinados servicios, el usuario debe 
                registrarse proporcionando datos personales de forma veraz y lícita.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">3.3. Uso Adecuado</h3>
              <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios del sitio web y a no emplearlos para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Difundir contenidos delictivos, violentos, pornográficos, racistas, xenófobos, ofensivos, de apología del terrorismo o que atenten contra los derechos humanos</li>
                <li>Provocar daños en los sistemas físicos y lógicos del sitio web, de sus proveedores o de terceras personas</li>
                <li>Introducir o difundir virus informáticos o cualesquiera otros sistemas que sean susceptibles de causar daños</li>
                <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios</li>
                <li>Violar los derechos de propiedad intelectual o industrial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">4. Propiedad Intelectual e Industrial</h2>
              <p>
                El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, 
                compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto 
                y/o gráficos son propiedad de DEEE TODO o en su caso dispone de licencia o autorización expresa 
                por parte de los autores.
              </p>
              <p className="mt-4">
                Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de 
                propiedad intelectual e industrial. Independientemente de la finalidad para la que fueran 
                destinados, la reproducción total o parcial, uso, explotación, distribución y comercialización, 
                requiere en todo caso de la autorización escrita previa por parte de DEEE TODO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
              
              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.1. Contenidos</h3>
              <p>
                DEEE TODO no se hace responsable de la legalidad de otros sitios web de terceros desde los que 
                pueda accederse al sitio web. DEEE TODO no garantiza ni se hace responsable de la veracidad, 
                exactitud, fiabilidad y utilidad de los contenidos de sitios web de terceros.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.2. Disponibilidad</h3>
              <p>
                DEEE TODO no garantiza la disponibilidad y continuidad del funcionamiento del sitio web. 
                Cuando ello sea razonablemente posible, DEEE TODO advertirá previamente de las interrupciones 
                en el funcionamiento del sitio web.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mt-4 mb-2">5.3. Enlaces</h3>
              <p>
                El sitio web puede contener enlaces a otros sitios web. DEEE TODO no ejerce ningún tipo de 
                control sobre dichos sitios web y, en consecuencia, no garantiza la exactitud, integridad y 
                actualidad de sus contenidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">6. Modificaciones</h2>
              <p>
                DEEE TODO se reserva el derecho de efectuar sin previo aviso las modificaciones que considere 
                oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios 
                que se presten a través de la misma como la forma en la que éstos aparezcan presentados o 
                localizados en su sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">7. Enlaces de Terceros</h2>
              <p>
                En el caso de que en el sitio web se incluyeran enlaces o hipervínculos hacia otros sitios 
                de Internet, DEEE TODO no ejercerá ningún tipo de control sobre dichos sitios y contenidos. 
                En ningún caso DEEE TODO asumirá responsabilidad alguna por los contenidos de algún enlace 
                perteneciente a un sitio web ajeno.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">8. Protección de Datos</h2>
              <p>
                Para consultar la información sobre protección de datos personales, por favor visite nuestra{' '}
                <a href="/legal/privacidad" className="text-neon-cyan hover:text-neon-pink underline">
                  Política de Privacidad
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">9. Cookies</h2>
              <p>
                El sitio web utiliza cookies. Para más información sobre el uso de cookies, consulte nuestra 
                política de cookies disponible en el banner de consentimiento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">10. Legislación Aplicable</h2>
              <p>
                Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio 
                web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la 
                que se someten expresamente las partes.
              </p>
              <p className="mt-4">
                Para cualquier controversia que pudiera derivarse del acceso o uso del sitio web, las partes 
                se someten expresamente a los Juzgados y Tribunales de Valencia, renunciando expresamente a 
                cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">11. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros a través de:
              </p>
              <ul className="list-none pl-6 space-y-2 mt-4">
                <li><strong>Email:</strong> info@deeetodo.com</li>
                <li><strong>Teléfono:</strong> 657 66 67 41</li>
                <li><strong>WhatsApp:</strong> 657 66 67 41</li>
                <li><strong>Dirección:</strong> Carrer de la Muntanya, 11, 46680 Algemesí, Valencia, España</li>
                <li><strong>Horario de atención:</strong></li>
                <li className="pl-4">Lunes a Sábado: 9:30 - 14:00 y 17:00 - 20:00</li>
                <li className="pl-4">Domingo: Cerrado</li>
              </ul>
            </section>

            <section className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Este aviso legal ha sido actualizado por última vez en febrero de 2024 y puede ser modificado 
                sin previo aviso. Le recomendamos revisar periódicamente esta página para estar al tanto de 
                cualquier cambio.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
