# Carpeta client

En esta carpeta se encuentra la vista administrador la cual tiene sus propias dependencias.
* Para instalar las dependecias debe de abrir un terminal ya sea integrado o del CMD y una vez este en esta carpeta debe de ejecutar el comando *npm install*

* Verificar que las siguientes dependencias se encuentren instaladas en el proyecto: <br/><br/>   *<img width="217" alt="image" src="https://user-images.githubusercontent.com/114530204/231022893-bb2c552e-68fa-4ceb-8175-cf46adf9a132.png">* <br/><br/> Puede hacer esto verificando el archivo *package.json* de la carpeta de client

* Una vez que se hallan instalado las dependecias debe de ejecutar el comando *npm start* para iniciar el proyecto, debe de verificar que el proyecto se inicie en el **localhost:3001** para su correcto funcionamiento con la vista estatica y el servidor. Si esto no es asi verificar el archivo **.env** que se encuentra en la carpeta raiz *client*

* Una vez que el proyecto arranco y verifico que esta corriendo en el puerto **3001** se debera ver una pantalla de *login* de la siguiente forma:<br/>*<img width="960" alt="image" src="https://user-images.githubusercontent.com/114530204/231023523-f7f4dd6f-90c7-4f7b-81e1-2c3fb7f7b676.png">*<br/><br/> Aqui el correo debe ser validado con el siguiente dominio *@optimen.com.mx*. Puede utilizar los siguintes correoos que ya se encuentran registrados:<br/> Correo de admin: **admin@optimen.com.mx**<br/> Contraseña: **admin1234%**<br/> el correo anterior es de administrador el cual tiene acceso a todas las opciones, el siguiente correo es de **editor** en el cual solo sustituye *admin* por *editor* tanto para el correo como para la contraeña

# Carpeta optimen-proyecto

En esta carpeta se encuentra la vista estatica la cual tiene sus propias dependencias.
* Para instalar las dependecias debe de abrir un terminal ya sea integrado o del CMD y una vez este en esta carpeta debe de ejecutar el comando *npm install*

* Seguido de esto se debera el mismo procedimiento que el punto de de la carpeta client. <br/> como referencia se tomara las siguientes dependecias que debera de tener. <br/><br/>  *<img width="214" alt="image" src="https://user-images.githubusercontent.com/114530204/231022788-52a7c097-6e54-4883-a461-63387900b8eb.png">* <br/><br/> Algunas dependecias pueden variar, ya que se puede agregar otra posiblemente en el transcurso de la semana.

* Una vez que se hallan instalado las dependecias debe de ejecutar el comando *npm start* para iniciar el proyecto, debe de verificar que el proyecto se inicie en el **localhost:3003** para su correcto funcionamiento con la vista estatica y el servidor. Si esto no es asi verificar el archivo **.env** que se encuentra en la carpeta raiz *optimen-proyecto*
  
  
# Carpeta server

En esta carpeta se encuentra el servidor el cual tiene sus propias dependencias.
* Para instalar las dependecias debe de abrir un terminal ya sea integrado o del CMD y una vez este en esta carpeta debe de ejecutar el comando *npm install*

* Las dependencias deberan ser las siguientes:<br/><img width="164" alt="image" src="https://user-images.githubusercontent.com/114530204/231024934-8d413026-91f6-4ce9-9a23-c91ad036d9d3.png">



* Una vez que se hallan instalado las dependecias debe de ejecutar el comando *nodemon start* para iniciar el proyecto, debe de verificar que el proyecto se inicie en el **localhost:3002** para su correcto funcionamiento con la vista estatica y administrador, *este ya se encuentra configurado por defecto por lo que no deberia a ver problema*. Si esto no es asi verificar el archivo **www** que se encuentra en la carpeta *bin* de la carptea *server*: *server/bin/www*

