# Instrucciones de Deploy - Backend SweepsTouch

## ✅ Cambios Realizados

### 1. Configuración de CORS Mejorada
- ✅ Agregado `https://sites-sweepstouch.vercel.app` a los orígenes permitidos
- ✅ Configuración dinámica basada en variable de entorno `ALLOWED_ORIGINS`
- ✅ Soporte para múltiples orígenes separados por comas
- ✅ Logs de debugging para orígenes bloqueados

### 2. Headers CORS Configurados
- `Access-Control-Allow-Origin`: Orígenes permitidos
- `Access-Control-Allow-Credentials`: true (para cookies)
- `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, OPTIONS
- `Access-Control-Allow-Headers`: Content-Type, Authorization

## 🚀 Deploy en Render.com

### Paso 1: Configurar Variables de Entorno

En el dashboard de Render, ve a tu servicio y agrega estas variables:

```
MONGODB_URI=mongodb+srv://backend:ciscoE.23@cluster0.antsdaq.mongodb.net/sweepstouch?retryWrites=true&w=majority

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://sites-sweepstouch.vercel.app

NODE_ENV=production

PORT=5000
```

**IMPORTANTE:** Si tu dominio de Vercel cambia o agregas más dominios, actualiza `ALLOWED_ORIGINS`.

### Paso 2: Verificar Build Settings

En Render, asegúrate de tener:

- **Build Command:** `npm install`
- **Start Command:** `npm start` o `node src/index.js`
- **Environment:** Node

### Paso 3: Deploy

1. Sube los cambios a tu repositorio Git
2. Render detectará automáticamente los cambios y hará redeploy
3. O haz deploy manual desde el dashboard

### Paso 4: Verificar

Después del deploy, verifica que funcione:

```bash
# Test de health
curl https://backend-sites-aswp.onrender.com/api/health

# Test de secciones
curl https://backend-sites-aswp.onrender.com/api/sections
```

## 🔧 Agregar Más Dominios

Si necesitas agregar más dominios (por ejemplo, un dominio personalizado):

1. Ve a Render Dashboard → Tu servicio → Environment
2. Edita `ALLOWED_ORIGINS`
3. Agrega el nuevo dominio separado por coma:

```
ALLOWED_ORIGINS=http://localhost:3000,https://sites-sweepstouch.vercel.app,https://tudominio.com
```

4. Guarda y redeploy

## 🐛 Debugging

Si sigues teniendo problemas de CORS:

1. **Verifica los logs en Render:**
   - Ve a Logs en el dashboard
   - Busca mensajes como "❌ Origen bloqueado por CORS:"

2. **Verifica en la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña Network
   - Busca la petición fallida
   - Verifica los headers de la respuesta

3. **Verifica la variable de entorno:**
   ```bash
   # En Render logs, deberías ver al iniciar:
   🚀 Servidor corriendo en puerto 5000
   📍 Entorno: production
   ```

## 📝 Notas Importantes

- **Credentials:** Está habilitado para soportar cookies entre dominios
- **Wildcard (*):** No se recomienda en producción por seguridad
- **HTTPS:** Render automáticamente provee HTTPS
- **Vercel Previews:** Si usas preview deployments en Vercel, necesitarás agregar esos dominios también

## ✨ Verificación Final

Después del deploy, tu frontend en Vercel debería poder:
- ✅ Cargar secciones desde el backend
- ✅ Crear nuevas secciones
- ✅ Editar secciones existentes
- ✅ Eliminar secciones

Si todo funciona, deberías ver las 5 cards en la página principal cuando hagas login como admin.

---

**Última actualización:** Octubre 2025
