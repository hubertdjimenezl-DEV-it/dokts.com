# dokts.com (trabajo en `D:\`)

Proyecto Next.js — landing pública Dokts. **Usa esta carpeta en disco D:** si el disco C: está sin espacio.

## Desarrollo

```powershell
cd D:\dokts.com
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Sincronizar con GitHub / otro PC

Copia esta carpeta o haz `git clone` del repo y sustituye `app/` y `components/` con los mismos archivos.

## Despliegue Vercel

En el dashboard de Vercel puedes enlazar el repositorio Git o importar proyecto desde esta ruta local con la CLI (`vercel`).

## Copiar al Escritorio + `npm` + `git push` (PowerShell)

Si el disco **C:** está lleno, libera espacio primero. Luego en PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File D:\dokts.com\sync-to-desktop-and-push.ps1
```

Ese script hace: `npm install` en `D:\`, **robocopy** a `%USERPROFILE%\Desktop\dokts.com` (sin `node_modules`), `npm install` en el clon, `git add/commit/push` a `master`. Requiere que el clon del Escritorio ya tenga el remoto de GitHub y credenciales correctas.
