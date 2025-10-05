# Manual de Despliegue - Kingdom Stakers

## Arquitectura del Sistema

```
┌─────────────────────┐
│   Tu Frontend       │
│  (Netlify/Vercel/   │ ──── Variables de Entorno ────┐
│   Servidor Propio)  │                               │
└─────────────────────┘                               │
         │                                            │
         │ HTTP/WebSocket                             │
         ▼                                            ▼
┌─────────────────────┐                    ┌──────────────────┐
│  Supabase Database  │                    │  Smart Contract  │
│  (Backend as a      │                    │    Core DAO      │
│   Service)          │                    │   Blockchain     │
└─────────────────────┘                    └──────────────────┘
```

## 1. Preparación Pre-Despliegue

### A. Verificar Variables de Entorno

Tu proyecto usa estas credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**: Estas credenciales son necesarias para que tu app se conecte a la base de datos.

### B. Construir el Proyecto

```bash
npm install
npm run build
```

Esto genera la carpeta `dist/` con tu aplicación lista para producción.

## 2. Opciones de Despliegue

### Opción A: Netlify (Recomendado)

#### Paso 1: Preparar el Proyecto

Ya tienes el archivo `dist/_redirects` configurado para SPA routing.

#### Paso 2: Desplegar

**Opción 2.1 - Desde Git:**

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Ve a [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
3. Conecta tu repositorio
4. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Agrega las variables de entorno:
   ```
   VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
   ```
6. Click "Deploy"

**Opción 2.2 - Netlify CLI:**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod

# Cuando te pregunte, selecciona:
# - Publish directory: dist
```

Luego configura las variables de entorno en: Site settings → Environment variables

---

### Opción B: Vercel

#### Paso 1: Desplegar

**Opción 1.1 - Desde Git:**

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Ve a [vercel.com](https://vercel.com) → "Add New Project"
3. Importa tu repositorio
4. Vercel detecta automáticamente Vite
5. Agrega las variables de entorno:
   ```
   VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
   ```
6. Click "Deploy"

**Opción 1.2 - Vercel CLI:**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login y desplegar
vercel

# Para producción
vercel --prod
```

Configura las variables de entorno en: Project Settings → Environment Variables

---

### Opción C: Servidor Propio (VPS/Cloud)

#### Requisitos
- Node.js 18+
- Nginx o Apache (opcional, para servir archivos estáticos)
- PM2 (para mantener el servidor corriendo)

#### Paso 1: Preparar el Servidor

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx (opcional)
sudo apt-get install nginx
```

#### Paso 2: Subir los Archivos

```bash
# Desde tu máquina local, copia el proyecto al servidor
rsync -avz --exclude 'node_modules' ./ user@tu-servidor:/var/www/kingdom-stakers/

# O usa Git
ssh user@tu-servidor
cd /var/www/kingdom-stakers
git clone tu-repositorio.git .
```

#### Paso 3: Configurar Variables de Entorno

```bash
# En el servidor
cd /var/www/kingdom-stakers
nano .env

# Agregar:
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

#### Paso 4: Construir y Desplegar

```bash
# Instalar dependencias
npm install

# Construir
npm run build
```

#### Paso 5A: Opción con Nginx (Recomendado)

```bash
# Configurar Nginx
sudo nano /etc/nginx/sites-available/kingdom-stakers

# Agregar:
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/kingdom-stakers/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Activar el sitio
sudo ln -s /etc/nginx/sites-available/kingdom-stakers /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Paso 5B: Opción con Vite Preview + PM2

```bash
# Crear un archivo ecosystem.config.js
nano ecosystem.config.js

# Contenido:
module.exports = {
  apps: [{
    name: 'kingdom-stakers',
    script: 'npm',
    args: 'run preview',
    env: {
      NODE_ENV: 'production',
      VITE_SUPABASE_URL: 'https://0ec90b57d6e95fcbda19832f.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'tu-anon-key-completa'
    }
  }]
}

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

### Opción D: GitHub Pages

⚠️ **No recomendado** para este proyecto porque:
- GitHub Pages solo soporta sitios estáticos sin variables de entorno privadas
- Las credenciales de Supabase quedarían expuestas en el código

---

## 3. Configuración Post-Despliegue

### A. Verificar Conectividad con Supabase

1. Abre tu app desplegada
2. Abre la consola del navegador (F12)
3. Deberías ver logs de conexión a Supabase sin errores

### B. Probar Funcionalidad Blockchain

1. Conecta tu wallet (MetaMask, Trust Wallet, etc.)
2. Asegúrate de estar en Core DAO (Chain ID: 1116)
3. Prueba las funciones básicas:
   - Staking
   - Ver stats
   - Battle arena

### C. Monitorear Base de Datos

La base de datos Supabase ya tiene estas tablas configuradas:
- `tutorial_progress` - Progreso del tutorial de usuarios
- `battle_history` - Historial de batallas
- `battle_tracking` - Sistema de tracking en tiempo real

### D. SSL/HTTPS (Importante)

⚠️ **Tu app DEBE estar en HTTPS** para que las wallets funcionen correctamente.

- **Netlify/Vercel**: SSL automático ✅
- **Servidor propio**: Usa Certbot para Let's Encrypt:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

---

## 4. Mantenimiento y Actualizaciones

### Actualizar la Aplicación

**Netlify/Vercel (con Git):**
```bash
git add .
git commit -m "Update"
git push origin main
# Se despliega automáticamente
```

**Servidor Propio:**
```bash
ssh user@tu-servidor
cd /var/www/kingdom-stakers
git pull
npm install
npm run build
sudo systemctl reload nginx  # si usas Nginx
# o
pm2 restart kingdom-stakers  # si usas PM2
```

### Monitorear Logs

**PM2:**
```bash
pm2 logs kingdom-stakers
```

**Nginx:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 5. Troubleshooting

### Problema: "Cannot connect to Supabase"

**Solución:**
1. Verifica que las variables de entorno estén configuradas correctamente
2. Asegúrate de que las variables empiecen con `VITE_` (requerido por Vite)
3. Reconstruye el proyecto después de cambiar variables de entorno

### Problema: "Wallet no se conecta"

**Solución:**
1. Verifica que tu sitio esté en HTTPS
2. Asegúrate de estar en Core DAO (Chain ID: 1116)
3. Limpia la caché del navegador

### Problema: "Las batallas no se registran en la base de datos"

**Solución:**
1. Verifica las políticas RLS en Supabase
2. Revisa los logs de la consola del navegador
3. Confirma que las transacciones en blockchain se completaron

---

## 6. Checklist de Despliegue

- [ ] Proyecto construido sin errores (`npm run build`)
- [ ] Variables de entorno configuradas en la plataforma
- [ ] Sitio accesible vía HTTPS
- [ ] Wallet se conecta correctamente
- [ ] Base de datos Supabase responde
- [ ] Smart contract en Core DAO funciona
- [ ] Transacciones se registran en la blockchain
- [ ] Batallas se guardan en el historial
- [ ] Leaderboard muestra datos correctos
- [ ] Tutorial funciona correctamente

---

## 7. Recursos Útiles

- **Supabase Dashboard**: https://0ec90b57d6e95fcbda19832f.supabase.co
- **Smart Contract**: https://scan.coredao.org/address/0x955F8512004aD78c80AAf2BF6206baCDbc140196
- **Core DAO RPC**: https://rpc.coredao.org
- **Chain ID**: 1116

---

## Resumen Rápido

1. **Build**: `npm run build`
2. **Subir** carpeta `dist/` a tu hosting
3. **Configurar** variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **HTTPS obligatorio** para wallets
5. **Listo** - Tu app ya conecta con Supabase automáticamente

**La base de datos Supabase funciona como servicio cloud - no necesitas hacer nada especial, solo configurar las credenciales.**
