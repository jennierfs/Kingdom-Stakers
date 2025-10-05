# Leaderboard Background Design

## Concepto: Royal Hall of Champions + Digital Rankings

Fondo especializado para el leaderboard que combina un salón real de la fama con elementos digitales de ranking y clasificación.

---

## 🎨 Diseño Visual

### Paleta de Colores

**Primarios**:
- **Oro/Ámbar**: `#f59e0b` (amber-500) - Gloria, campeones, trofeos
- **Amarillo**: `#fbbf24` (amber-400) - Luces, destacados
- **Crema**: `#fef3c7` (amber-50) - Brillos, highlights
- **Gris Mármol**: `#e5e7eb`, `#d1d5db`, `#9ca3af` - Pedestales, columnas

**Base**:
- **Gris Oscuro**: `#0f172a` (slate-900) - Base profunda
- **Ámbar Oscuro**: `#78350f` (amber-950) - Atmósfera cálida

---

## 🏗️ Elementos del Fondo

### 1. **Base Atmosférica**
```css
- Gradiente principal: slate-900 → amber-950/30 → slate-900
- Gradiente desde arriba: amber-500 (10% → 5% → transparent)
- Viñeta superior/inferior: slate-900/60%
- Radial glow: amber-400/5% desde arriba
```

### 2. **Corona y Estandarte Superior**

**Centro Superior**:
- Triángulos ascendentes dorados (200x80px)
- 2 capas de líneas: stroke-2 y stroke-1.5
- Corona circular en la cima (r=15, r=10)
- Efecto de "techo de salón real"
- Opacidades: 15%, 10%

### 3. **Trofeos Decorativos** (2 unidades)

**Posición**: Superior izquierda y derecha
**Estructura**:
- Base rectangular con bordes redondeados
- Copa/recipiente interior
- Círculo central (r=8)
- Asas triangulares hacia arriba
- Punto brillante central (r=3)

**Colores**:
- Base: `#f59e0b` (oro)
- Copa: `#fbbf24` (amarillo)
- Punto: `#fef3c7` (crema brillante)

**Opacidad**: 10%

### 4. **Pedestales de Mármol** (3 totales)

#### Pedestales Laterales (2 unidades)
**Posición**: 1/3 altura, izquierda y derecha
**Estructura**:
- Columna principal: 40x60px
- Capitel superior: 30x10px
- Base: 50x5px
- Gradiente mármol vertical

#### Pedestal Central (1 unidad)
**Posición**: 1/4 inferior, 1/4 izquierda
**Estructura**:
- Columna: 50x100px (más grande)
- Capitel: 60x10px
- Base: 70x5px
- Display dorado en el centro (30x40px)
- Medallón circular (r=12)

**Gradientes de Mármol**:
```
Stop 0%:   #f3f4f6 (casi blanco)
Stop 50%:  #e5e7eb (gris claro)
Stop 100%: #d1d5db (gris medio)
```

**Opacidad**: 5% (laterales), 8% (central)

### 5. **Números de Ranking Flotantes** (Top 3)

**Elementos**:
- Texto gigante: "#1", "#2", "#3"
- Font: 6xl, bold, Georgia serif
- Color: amber-400
- Text-shadow: glow dorado
- Animación: float-slow (6s)

**Posiciones**:
- #1: 30% top, 15% left
- #2: 45% top, 40% left
- #3: 60% top, 65% left

**Delays**: 0s, 0.5s, 1s

### 6. **Rayos de Luz (Spotlights)**

**2 Rayos verticales**:
- Tamaño: 1px ancho, 32 altura
- Gradiente: from-amber-500/20 → via-10% → to-transparent
- Blur: sm
- Posiciones: 1/3 y 2/3 horizontales

### 7. **Puntos de Gloria Pulsantes** (3 puntos)

**Características**:
- Tamaño: 2x2px
- Colores: amber-400, amber-300, yellow-400
- Border-radius: full
- Animación: pulse
- Shadow: glow (amber-500/50, amber-400/50, yellow-500/50)
- Delays: 0s, 0.5s, 1s

### 8. **Gráficos de Progreso** (2 sets)

#### Gráfico de Línea (Inferior Izquierda)
- Canvas: 100x40px
- Línea de tendencia ascendente
- 3 puntos destacados
- Color: `#fbbf24`
- Círculos en picos: `#fef3c7`

#### Gráfico de Barras (Inferior Derecha)
- Canvas: 100x40px
- 5 barras de diferentes alturas
- Colores: `#fbbf24` y `#f59e0b` alternados
- Representa rankings relativos

**Opacidad ambos**: 8%

### 9. **Patrón de Mármol Diamante**

**SVG Pattern**:
- Unidad: 60x60px
- Forma: Diamante (rombo)
- Stroke: `#d1d5db`
- Círculo central: `#9ca3af` (r=3)
- Opacidad: 5%

### 10. **Orbes de Luz Difusa** (2)

**Posiciones**:
- Superior derecha (1/4): 48x48
- Inferior izquierda (1/4): 48x48

**Color**: amber-500/5 y yellow-500/5
**Efecto**: blur-3xl (resplandor suave)

### 11. **Bordes de Honor**

**2 Líneas horizontales** (top y bottom):
- Altura: 1px
- Gradiente: from-transparent → via-amber-500/40 → to-transparent
- Efecto de "marco dorado"

---

## 📐 Layout Visual

```
                    ╱╲ Corona
              ═════╱══╲═════
    🏆                              🏆
    Trofeo          [#1]         Trofeo
                     ↑
    ▓               [#2]            
  Pedestal           ↑              ▓
  Mármol           [#3]          Pedestal
                     ↑
    💰           CONTENIDO           📊
  Monedas       LEADERBOARD       Barras
    
    ▓              ╱──╲           📈
  Pedestal      Pedestal        Línea
  Grande        Central         Stats

              ═════════════
```

---

## 🎯 Psicología del Diseño

### Sensaciones Transmitidas

1. **Gloria** 🏆
   - Trofeos prominentes
   - Corona en la cima
   - Oro brillante

2. **Prestigio** 👑
   - Mármol elegante
   - Pedestales monumentales
   - Números grandes flotantes

3. **Competición** ⚔️
   - Rankings visibles
   - Gráficos de progreso
   - Spotlights dramáticos

4. **Exclusividad** 💎
   - Top 3 destacado
   - Diseño de salón real
   - Materiales premium

5. **Modernidad** 📊
   - Gráficos digitales
   - Números flotantes
   - Overlays tecnológicos

---

## ⚡ Implementación Técnica

### Características

✅ **100% SVG/CSS** - Sin imágenes externas
✅ **Responsive** - Se adapta al contenedor
✅ **Performance** - Solo vectoriales
✅ **Animaciones suaves** - float-slow (6s)
✅ **Pointer-events: none** - No bloquea interacción
✅ **Multi-capa** - 10+ elementos compositivos

### Animaciones

**floatSlow** (6s ease-in-out infinite):
```css
0%, 100%: translateY(0) scale(1) opacity(0.1)
50%: translateY(-20px) scale(1.05) opacity(0.15)
```

**pulse** (nativo Tailwind):
- Puntos de gloria pulsando
- Delays escalonados: 0s, 0.5s, 1s

---

## 🎨 Variaciones por Posición

### Top 3 (Podio)
- Spotlight más intenso
- Números flotantes visibles
- Color oro más brillante

### Top 10
- Diseño estándar
- Sin spotlight especial
- Fondo neutral

### Ligas Superiores
- Más elementos dorados
- Pedestales más visibles
- Mayor opacidad general

---

## 📊 Comparación con Otros Fondos

| Elemento | Leaderboard | Staking | Battle |
|----------|-------------|---------|--------|
| Color Principal | 🟡 Oro | 🟢 Verde | 🔴 Rojo |
| Tema | Salón Real | Bóveda | Arena |
| Símbolos | Trofeos, Corona | Monedas, Vault | Espadas |
| Material | Mármol | Metal | Piedra |
| Números | Flotantes #1-3 | APY% | Cooldown |
| Gráficos | Barras/Líneas | Blockchain | Ninguno |
| Energía | Gloria | Seguridad | Batalla |

---

## 🔮 Mejoras Futuras

- 🔲 Confetti dorado al ver Top 1
- 🔲 Animación de "ascenso de ranking"
- 🔲 Efecto de brillo al hover sobre top 3
- 🔲 Pedestales "elevándose" al filtrar liga
- 🔲 Corona girando sutilmente
- 🔲 Rayos de luz intensificándose al scroll
- 🔲 Sonido de fanfarria (opcional)
- 🔲 Partículas doradas para nuevos campeones

---

## 📝 Resumen

**Elementos Totales**: 50+ elementos visuales
- 2 Trofeos decorativos
- 3 Pedestales de mármol
- 3 Números flotantes (#1-3)
- 2 Rayos de spotlight
- 3 Puntos de gloria pulsantes
- 2 Gráficos de stats
- 1 Patrón de mármol diamante
- 1 Corona con estandarte

**Colores**: Oro, amarillo, crema, mármol
**Opacidad**: 5-15% para sutileza
**Animaciones**: float-slow + pulse
**Tema**: Royal Hall of Fame + Digital Overlays
**Sentimiento**: Gloria, prestigio, competición

El fondo convierte el leaderboard en un majestuoso salón de la fama donde los jugadores pueden ver su gloria reflejada. 👑✨
