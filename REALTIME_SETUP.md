# Sistema de Eventos en Tiempo Real - Guía de Configuración

## 📋 Descripción General

Este sistema permite que el frontend escuche eventos del contrato inteligente en tiempo real y muestre información actualizada instantáneamente a los jugadores. Utiliza un sistema híbrido con Supabase Edge Functions y Realtime Subscriptions.

## 🏗️ Arquitectura

```
CONTRATO (Blockchain)
    ↓ (emite eventos)
EDGE FUNCTION (Supabase)
    ↓ (guarda en DB)
SUPABASE DATABASE
    ↓ (realtime subscriptions)
FRONTEND (React)
    ↓ (muestra datos)
JUGADORES
```

## 📊 Tablas de Base de Datos

### 1. `battles`
Almacena el historial completo de batallas.

```sql
- id (uuid)
- attacker_address (text)
- defender_address (text)
- attacker_won (boolean)
- battle_reward (numeric)
- attacker_power (numeric)
- defender_power (numeric)
- attacker_level (numeric)
- defender_level (numeric)
- transaction_hash (text)
- block_number (bigint)
- timestamp (timestamptz)
```

### 2. `player_stats_cache`
Cache de estadísticas de jugadores para consultas rápidas.

```sql
- player_address (text, PK)
- player_level (numeric)
- total_battles (numeric)
- battles_won (numeric)
- kingdom_size (numeric)
- battle_score (numeric)
- win_rate (numeric)
- current_power (numeric)
- league_name (text)
- league_id (numeric)
```

### 3. `player_events`
Eventos de jugadores para notificaciones.

```sql
- id (uuid)
- player_address (text)
- event_type (text)
- event_data (jsonb)
- read (boolean)
- created_at (timestamptz)
```

### 4. `leaderboard_cache`
Ranking cacheado de jugadores.

```sql
- id (uuid)
- player_address (text)
- ranking (numeric)
- power (numeric)
- level (numeric)
- win_rate (numeric)
```

### 5. `contract_sync_status`
Estado de sincronización del contrato.

```sql
- id (uuid)
- contract_address (text)
- last_synced_block (bigint)
- last_sync_time (timestamptz)
- is_syncing (boolean)
```

## 🚀 Configuración

### Paso 1: Aplicar Migraciones

1. Ve al Dashboard de Supabase: https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a SQL Editor
4. Copia y ejecuta el contenido de:
   ```
   supabase/migrations/20251005000000_create_battle_tracking_system.sql
   ```

### Paso 2: Desplegar Edge Function

La Edge Function escucha eventos del contrato y los guarda en Supabase.

**Opción A: Usando Supabase CLI**
```bash
supabase functions deploy contract-event-listener
```

**Opción B: Manualmente desde el Dashboard**
1. Ve a Edge Functions en tu proyecto
2. Crea nueva función llamada "contract-event-listener"
3. Copia el contenido de:
   ```
   supabase/functions/contract-event-listener/index.ts
   ```

### Paso 3: Configurar Variables de Entorno

Asegúrate que tu `.env` tenga:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### Paso 4: Sincronizar Eventos del Contrato

Una vez desplegado el contrato, ejecuta la sincronización inicial:

```javascript
import { realtimeService } from './services/realtimeService';

// Sincronizar eventos desde el bloque de despliegue hasta el actual
await realtimeService.syncContractEvents(
  'CONTRACT_ADDRESS', // Dirección de tu contrato
  'RPC_URL',          // URL de tu provider (Alchemy, Infura, etc.)
  START_BLOCK,        // Bloque donde se desplegó el contrato
  END_BLOCK           // Bloque actual (opcional)
);
```

## 💻 Uso en el Frontend

### 1. Hook para Batallas en Tiempo Real

```typescript
import { useRealtimeBattles } from './hooks/useRealtimeBattles';

function MyComponent() {
  const { battles, loading } = useRealtimeBattles(playerAddress);

  return (
    <div>
      {battles.map(battle => (
        <div key={battle.id}>
          {battle.attacker_won ? 'Victoria' : 'Derrota'}
        </div>
      ))}
    </div>
  );
}
```

### 2. Hook para Estadísticas del Jugador

```typescript
import { useRealtimePlayerStats } from './hooks/useRealtimeBattles';

function PlayerStats() {
  const { stats, loading } = useRealtimePlayerStats(playerAddress);

  return (
    <div>
      <p>Level: {stats?.player_level}</p>
      <p>Battles: {stats?.total_battles}</p>
      <p>Win Rate: {stats?.win_rate}%</p>
    </div>
  );
}
```

### 3. Sistema de Notificaciones

```typescript
import { useRealtimeNotifications } from './hooks/useRealtimeBattles';

function Notifications() {
  const { events, unreadCount, markAsRead } = useRealtimeNotifications(playerAddress);

  return (
    <div>
      <span>Unread: {unreadCount}</span>
      {events.map(event => (
        <div key={event.id} onClick={() => markAsRead(event.id)}>
          {event.event_type}: {event.event_data}
        </div>
      ))}
    </div>
  );
}
```

### 4. Componente de Campana de Notificaciones

Ya está integrado en el Header:

```typescript
import { NotificationBell } from './components/NotificationBell';

<NotificationBell />
```

## 🔄 Flujo de Datos

### Cuando ocurre una batalla:

1. **Jugador ejecuta `attackPlayer()`** en el contrato
2. **Contrato emite eventos:**
   - `BattleResult`
   - `BattleDetailsUpdated`
   - `PlayerStatsUpdated`

3. **Edge Function escucha los eventos** (webhook o polling)
4. **Guarda datos en Supabase:**
   - Batalla en tabla `battles`
   - Stats actualizados en `player_stats_cache`
   - Eventos en `player_events`

5. **Supabase Realtime notifica** a suscriptores
6. **Frontend recibe actualización** vía hooks
7. **UI se actualiza automáticamente**

## 📡 Métodos del RealtimeService

### Suscripciones

```typescript
// Suscribirse a batallas de un jugador
const unsubscribe = realtimeService.subscribeToPlayerBattles(
  playerAddress,
  (battle) => {
    console.log('Nueva batalla:', battle);
  }
);

// Suscribirse a estadísticas
realtimeService.subscribeToPlayerStats(
  playerAddress,
  (stats) => {
    console.log('Stats actualizadas:', stats);
  }
);

// Suscribirse a notificaciones
realtimeService.subscribeToPlayerEvents(
  playerAddress,
  (event) => {
    console.log('Nuevo evento:', event);
  }
);

// Limpiar suscripciones
unsubscribe();
```

### Consultas

```typescript
// Obtener historial de batallas
const battles = await realtimeService.getBattleHistory(playerAddress, 50);

// Obtener estadísticas
const stats = await realtimeService.getPlayerStats(playerAddress);

// Obtener eventos/notificaciones
const events = await realtimeService.getPlayerEvents(playerAddress);

// Marcar evento como leído
await realtimeService.markEventAsRead(eventId);

// Marcar todos como leídos
await realtimeService.markAllEventsAsRead(playerAddress);

// Obtener leaderboard
const leaderboard = await realtimeService.getLeaderboard(100);
```

## 🎯 Ventajas de este Sistema

1. **Velocidad:** Los datos se cargan instantáneamente desde Supabase (no esperas la blockchain)
2. **Notificaciones en Tiempo Real:** Los jugadores reciben alertas inmediatas
3. **Historial Completo:** Todo el historial está disponible sin límites de RPC
4. **Escalable:** Funciona con miles de jugadores sin problemas
5. **Confiable:** Si la blockchain está lenta, los datos siguen disponibles

## 🔧 Mantenimiento

### Sincronización Periódica

Recomendamos ejecutar la sincronización cada 5-10 minutos:

```typescript
setInterval(async () => {
  const currentBlock = await provider.getBlockNumber();
  await realtimeService.syncContractEvents(
    contractAddress,
    rpcUrl,
    lastSyncedBlock,
    currentBlock
  );
}, 300000); // 5 minutos
```

### Limpieza de Eventos Antiguos

Los eventos de notificación se pueden limpiar después de 30 días:

```sql
DELETE FROM player_events
WHERE created_at < NOW() - INTERVAL '30 days';
```

## 🐛 Troubleshooting

### Los eventos no aparecen

1. Verifica que la Edge Function esté desplegada
2. Verifica las variables de entorno
3. Revisa los logs de la Edge Function
4. Ejecuta sincronización manual

### Notificaciones no llegan

1. Verifica que RLS esté configurado correctamente
2. Verifica la conexión a Supabase Realtime
3. Revisa la consola del navegador

### Batallas no se guardan

1. Verifica que el contrato emita los eventos correctos
2. Revisa los logs de la Edge Function
3. Verifica permisos de la tabla

## 📚 Referencias

- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Edge Functions](https://supabase.com/docs/guides/functions)
- [ethers.js Events](https://docs.ethers.org/v6/api/contract/#ContractEvent)

## 🎉 Próximos Pasos

- [ ] Agregar gráficas de estadísticas históricas
- [ ] Implementar replay de batallas con animaciones
- [ ] Agregar chat en tiempo real entre jugadores
- [ ] Sistema de logros y badges
- [ ] Predicciones de batallas con IA
