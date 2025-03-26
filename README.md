# **Catálogo Digital Versátil para cualquier tipo de producto**  

## **Descripción**  
Este proyecto es una aplicación web desarrollada en **React (Vite)** que permite gestionar un **catálogo digital de productos** con funcionalidades **CRUD** (crear, editar y eliminar productos). Además, ofrece la generación de **cotizaciones y cuentas de cobro en formato PDF**, personalizadas con el membrete de la empresa y con opción de descarga.  

Los datos de los productos se almacenan en **Firebase Firestore**, y las imágenes se guardan en **Firebase Storage**.  

## **Características**  
✅ Catálogo digital versátil para cualquier tipo de producto  
✅ Funcionalidades **CRUD** completas (crear, editar y eliminar productos)  
✅ Generación de **cotizaciones** en PDF con membrete de la empresa  
✅ Creación de **cuentas de cobro** en PDF con opción de descarga  
✅ Uso de **Firebase Firestore** para el almacenamiento de datos  
✅ Almacenamiento de imágenes en **Firebase Storage**  
✅ Interfaz moderna con **Material-UI (MUI)**  

## **Tecnologías Utilizadas**  
- **Frontend:** React (Vite), Material-UI (MUI), JavaScript, CSS  
- **Backend:** Firebase Firestore, Firebase Storage  
- **Generación de PDFs:** jsPDF  
- **Autenticación:** Firebase Authentication (administracion)  

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
- **Agregar productos**: Completar el formulario con nombre, descripción, precio e imágenes.  
- **Editar productos**: Modificar la información de un producto existente.  
- **Eliminar productos**: Borrar productos de la base de datos.  
- **Generar cotizaciones**: generar un PDF con el membrete de la empresa.  
- **Crear cuentas de cobro**: Generar y descargar un PDF con la información de la transacción.  

## **Generación de Cotizaciones y Cuentas de Cobro**  

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

## 📸 Capturas de pantalla  

### Vista Escritorio  
<img src="./src/assets/CatalogoPC.png" alt="Vista principal" width="400">  

### Vista Móvil  
<img src="./src/assets/CatalogoMovil.jpg" alt="Panel de administración" width="200" height="300">  

## **Contribuciones**  
Si quieres contribuir al proyecto, eres bienvenido. Puedes hacer un **fork**, crear una nueva rama y enviar un **pull request**.  

## **Licencia**  
Este proyecto está bajo la licencia **MIT**.  






