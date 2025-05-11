# **💼Catálogo Digital Versátil para cualquier tipo de producto**  

## **Descripción**  
Este proyecto es una aplicación web desarrollada en **React (Vite)** que permite gestionar un **catálogo digital de productos** con funcionalidades **CRUD** (crear, editar y eliminar productos). Además, ofrece la generación de **cotizaciones y cuentas de cobro en formato PDF**, personalizadas con el membrete de la empresa y con opción de descarga.  

Los datos de los productos se almacenan en **Firebase Firestore**, y las imágenes se guardan en **Firebase Storage**.  

## **✨Características**  
✅ Catálogo digital versátil para cualquier tipo de producto  
✅ Funcionalidades **CRUD** completas (crear, editar y eliminar productos)  
✅ Generación de **cotizaciones** en PDF con membrete de la empresa  
✅ Creación de **cuentas de cobro** en PDF con opción de descarga  
✅ Uso de **Firebase Firestore** para el almacenamiento de datos  
✅ Almacenamiento de imágenes en **Firebase Storage**  
✅ Sistema de autenticación con Firebase Authentication que permite a los usuarios acceder según su rol y nivel de permisos asignado  
✅ Interfaz moderna con **Material-UI (MUI)**  

## **Tecnologías Utilizadas 🔧**  
- **Frontend:** React (Vite), Material-UI (MUI), JavaScript, CSS  
- **Backend:** Firebase Firestore, Firebase Storage, Firebase Authentication  
- **Generación de PDFs:** jsPDF  
- **Estado Global:** Redux Toolkit  

## **Instalación y Configuración**  

### **1. Clonar el repositorio**  
```bash  
https://github.com/hrking31/mi-negocio.com.git
```

### **2. Instalar dependencias**  
```bash  
npm install  
```

### **3. Configurar Firebase**  
https://firebase.google.com/docs/web/setup?hl=es-419  
- Crear un proyecto en **Firebase**  
- Habilitar **Firestore Database** y **Firebase Storage**  
- Configurar las reglas de seguridad  
- Agregar el archivo `FirebaseConfig.js` en `/src/Components/Firebase/FirebaseConfig` con las credenciales de Firebase  

Ejemplo de `FirebaseConfig.js`:  
```js  
export const firebaseConfig = {  
  apiKey: "tu_api_key",  
  authDomain: "tu_auth_domain",  
  projectId: "tu_project_id",  
  storageBucket: "tu_storage_bucket",  
  messagingSenderId: "tu_messaging_sender_id",  
  appId: "tu_app_id"  
};  
```

### **4. Ejecutar la aplicación**  
```bash  
npm run dev  
```

La aplicación estará disponible en:  
```
http://localhost:5173/
```

## **Uso de la Aplicación**  
 ⚙️ Panel de Administración (AdminForms):  
  Un completo dashboard con 6 acciones clave para el control del sistema:
- **Agregar productos**: Añade nuevos productos con nombre, descripción e imágenes subidas a Firebase Storage. Se guardan en Firestore de forma estructurada.  
- **Editar productos**: Modifica cualquier detalle del producto (nombre, descripción e imágenes), con la posibilidad de eliminar, cambiar o reordenar las imágenes.  
- **Eliminar productos**: Elimina tanto el documento del equipo en Firestore como sus imágenes asociadas en Firebase Storage.  
- **Crear usuarios**: Permite registrar nuevos usuarios en Firebase Authentication y asignarles roles personalizados  
- **Eliminar usuarios**: Borra permanentemente usuarios del sistema desde Firebase Authentication.  
- **Crear Cotizaciones y Cuentas de Cobro**: Formularios personalizables para generar cotizaciones y cuentas de cobro profesionales. 

## **Generación de Cotizaciones y Cuentas de Cobro**  
📄 Vista PDF en Tiempo Real + Descarga
Mientras se diligencian los formularios de cotización o cuenta de cobro, la vista se actualiza en tiempo real mostrando un diseño tipo PDF, listo para impresión o descarga. El PDF incluye:

### **Cotizaciones**  
Permite ingresar datos como:  
- **Empresa**: Nombre, NIT, dirección y fecha.  
- **Productos**: Cantidad, días de alquiler y precio unitario.  
- **Total**: Se calcula automáticamente con base en los productos seleccionados.  
- **PDF**: Se genera un archivo PDF con el membrete de la empresa y todos los detalles de la cotización.  

### **Cuentas de Cobro**  
Permite ingresar manualmente los datos de la empresa, incluyendo:  
- **Nombre, NIT, dirección y fecha**.  
- **Detalle del concepto**: Se especifica el motivo del cobro.  
- **Suma total**: Se genera automáticamente con los valores ingresados.  
- **PDF**: Se genera un archivo PDF con el membrete de la empresa y la información ingresada.  


# 💡 ¿Por qué esta app es especial?

✅ **Modular y escalable**: Fácil de adaptar a cualquier tipo de negocio (alquiler de equipos, venta de productos, servicios técnicos, etc.)

✅ **Gestión centralizada**: Control total sobre usuarios, productos y documentos desde un solo panel

✅ **Experiencia profesional**: Combinación de UX/UI moderna, datos en tiempo real y gestión eficiente de recursos

✅ **Seguridad y permisos**: Control de acceso mediante roles personalizados y autenticación segura

---

# 🚀 ¿Para qué sirve?

**AdminApp** es ideal para:

- Empresas que alquilan o venden productos
- Emprendimientos que necesitan generar cotizaciones y facturas en PDF
- Negocios que requieren gestión interna de productos, imágenes y usuarios

---

# 📌 Este proyecto demuestra:

- Manejo avanzado de React y Redux
- Conexión e integración con el ecosistema Firebase
- Gestión de archivos en la nube y base de datos en tiempo real
- Diseño de interfaces modernas con Material UI
- Generación de documentos tipo PDF a partir de formularios web
- Arquitectura escalable, segura y centrada en la experiencia del usuario


## 📸 Capturas de pantalla  

### Vista Escritorio  
<img src="./src/assets/CatalogoPC.png" alt="Vista principal" width="400">  

### Vista Móvil  
<img src="./src/assets/CatalogoMovil.jpg" alt="Panel de administración" width="200" height="300">  

## **Contribuciones**  
Si quieres contribuir al proyecto, eres bienvenido. Puedes hacer un **fork**, crear una nueva rama y enviar un **pull request**.  

## **Licencia**  
Este proyecto está bajo la licencia **MIT**.  






