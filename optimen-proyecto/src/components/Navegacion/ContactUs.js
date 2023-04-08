import React from 'react';
import './ContactUs.css';

import { useTranslation } from 'react-i18next'

export default function ContactUs() {

  const [t] = useTranslation("global");

  return (
    <div>
      <h1 className='h1C'>{t("navbar.contact-Us")}</h1>
      <div className='ContactForm'>
        <div className="contact_form">

          <div className="formulario">
            <form>
              <p className='Pc'>
                <label for="nombre" className="colocar_nombre">{t("navbar.first-name")}
                  <span className="obligatorio">*</span>
                </label>
                <input type="text" name="introducir_nombre" id="nombre" required="obligatorio" placeholder={t("navbar.write-your-First-name")} />
              </p>

              <p className='Pc'>
                <label for="nombre" className="colocar_nombre">{t("navbar.last-name")}
                  <span className="obligatorio">*</span>
                </label>
                <input type="text" name="introducir_nombre" id="nombre" required="obligatorio" placeholder={t("navbar.write-your-Last-name")} />
              </p>

              <p className='Pc'>
                <label for="email" className="colocar_email">{t("navbar.email")}
                  <span className="obligatorio">*</span>
                </label>
                <input type="email" name="introducir_email" id="email" required="obligatorio" placeholder={t("navbar.write-your-email")}/>
              </p>

              <p className='Pc'>
                <label for="mensaje" className="colocar_mensaje">{t("navbar.message")}
                  <span class="obligatorio">*</span>
                </label>
                <textarea name="introducir_mensaje" className="texto_mensaje" id="mensaje" required="obligatorio" placeholder={t("navbar.Leave-your-message-here")}></textarea>
              </p>

              <button type="submit" class="btn btn-dark" id="enviar" name="enviar_formulario">{t("navbar.send")}</button>

            </form>
          </div>
        </div>
      </div>

      <footer className='foo'>
        <p className='PcFooter'>
          Av. León 119. <br />
          León Guanajuato<br />
          Mexico<br />
          info@optimen.com.mx<br />
        </p>
      </footer>
    </div>
  )
}
