# Staking Background Design

## Concepto: Medieval Treasury Vault + Digital Blockchain

Fondo especializado para la sección de staking que combina la estética de una bóveda bancaria de alta seguridad con una tesorería medieval y patrones blockchain digitales.

---

## 🎨 Diseño Visual

### Paleta de Colores

**Primarios**:
- **Verde Esmeralda**: `#10b981` (emerald-500) - Seguridad, crecimiento, riqueza
- **Oro**: `#f59e0b` (amber-500) - Tesoro, valor, recompensa
- **Gris Oscuro**: `#0f172a` (slate-900) - Base profunda, seguridad

**Secundarios**:
- **Verde Oscuro**: `#064e3b` (emerald-950) - Profundidad de bóveda
- **Transparencias**: 5-20% opacidad para sutileza

---

## 🏗️ Elementos del Fondo

### 1. **Base y Gradientes**
```css
- Gradiente principal: slate-900 → emerald-950/40 → slate-900
- Orbes de luz difusa: emerald-500/5 y amber-500/5
- Gradiente radial central: emerald-500/3%
- Viñeta superior/inferior: slate-900/50%
```

### 2. **Grid de Bóveda (Vault Grid)**
- Patrón SVG de cuadrícula 40x40px
- Color: Verde esmeralda
- Opacidad: 5%
- Estilo: Líneas finas de seguridad

### 3. **Cerraduras de Seguridad** (Decorativas)
**Esquinas superiores**:
- Cuadrados rotados con doble borde
- Verde esmeralda + oro
- Rotaciones: 45°, 12°, -12°
- Opacidad: 10%

### 4. **Símbolos de Bóveda**

**Cerradura Circular** (superior derecha):
- 3 círculos concéntricos (28r, 22r, 16r)
- Cruz central para abrir
- Punto central de 4r
- Colores: Verde/oro alternados

**Cofre/Vault** (inferior izquierda):
- Rectángulo principal con rounded corners
- Rectángulo interior más pequeño
- Cerradura circular en el centro (12r, 8r)
- Líneas verticales decorativas

### 5. **Pilas de Monedas**

**Lado Izquierdo** (5 pilas):
- Monedas de oro apiladas: 8x6px
- 3 monedas por fila
- Gradiente: amber-600 → amber-700
- Borde: amber-500
- Opacidad: 5%

**Lado Derecho** (4 pilas):
- Billetes/lingotes verdes: 10x8px
- 2 por fila
- Gradiente: emerald-700 → emerald-800
- Borde: emerald-600
- Opacidad: 5%

### 6. **Patrones Blockchain**

**Red de Nodos** (superior izquierdo):
- 12 nodos conectados en grid
- Tamaño: 200x150px
- Nodos: círculos de 3r
- Conexiones: líneas stroke-1
- Colores: Verde/oro distribuidos
- Opacidad: 5%

**Estructura**:
```
Row 1: [G] - [G] - [G] - [A]
       |     |     |     
Row 2: [G] - [A] - [G] - [G]
       |     |     |     
Row 3: [A] - [G] - [G] - [G]

G = Verde (emerald)
A = Oro (amber)
```

### 7. **Puntos de Actividad (Pulsantes)**

**Grandes** (3 puntos):
- Tamaño: 2x2px
- Posiciones estratégicas (1/3, 2/3 del espacio)
- Animación: pulse continuo
- Delays: 0s, 0.5s, 1s

**Pequeños** (2 puntos):
- Tamaño: 1.5x1.5px
- Posiciones secundarias
- Animación: pulse
- Delays: 0.3s, 0.7s

### 8. **Bordes de Seguridad**

**4 Bordes (1px cada uno)**:
- **Superior**: Verde esmeralda con gradiente horizontal
- **Inferior**: Oro con gradiente horizontal
- **Izquierdo**: Verde con gradiente vertical
- **Derecho**: Verde con gradiente vertical
- Opacidad: 30%
- Estilo: from-transparent → via-color → to-transparent

---

## 📐 Layout y Composición

```
┌─────────────────────────────────────────────┐
│ ═══════ [Cerradura] ═════════════════     │ ← Borde superior verde
│                                             │
│  [Lock]              [Blockchain           │
│   □                   Network]              │
│                                    [Vault]  │
│  [Monedas]           •Nodo activo           │
│   🪙🪙🪙                             [Lingotes]│
│   🪙🪙🪙              CONTENIDO         💵💵    │
│   🪙🪙🪙              DE STAKING        💵💵    │
│   🪙🪙🪙                •Nodo           💵��    │
│   🪙🪙🪙                                💵💵    │
│                                             │
│        [Lock]            [Cofre]            │
│         □                  ⬜               │
│                                             │
│ ═══════════════════════════════════════     │ ← Borde inferior oro
└─────────────────────────────────────────────┘
  ↑                                         ↑
Verde                                    Verde
```

---

## 🎯 Psicología del Diseño

### Sensaciones Transmitidas

1. **Seguridad** 🔒
   - Cerraduras múltiples
   - Bordes gruesos
   - Grid de protección

2. **Riqueza** 💰
   - Monedas apiladas
   - Oro prominente
   - Tesoro visible

3. **Modernidad** 🌐
   - Patrones blockchain
   - Nodos conectados
   - Transparencias digitales

4. **Profesionalidad** 💼
   - Verde corporativo
   - Diseño limpio
   - Simetría equilibrada

5. **Confianza** ✅
   - Colores seguros (verde)
   - Estructura sólida
   - Elementos bancarios

---

## ⚡ Implementación Técnica

### Características

✅ **100% CSS/SVG** - No requiere imágenes
✅ **Responsive** - Se adapta al contenedor
✅ **Performance** - Solo elementos vectoriales
✅ **Pointer-events: none** - No interfiere con interacción
✅ **Z-index: 0** - Siempre en el fondo
✅ **Overflow: hidden** - Contenido limpio

### Capas (Z-index)

```
z-0:  Fondo base (StakingBackground)
z-5:  Grid y patrones sutiles
z-10: Contenido (stats, forms, buttons)
```

### Animaciones

- **Pulse**: Nodos activos pulsando continuamente
- **Delays escalonados**: 0s, 0.3s, 0.5s, 0.7s, 1s
- **Smooth**: Transiciones suaves

---

## 🎨 Variaciones de Color por Estado

### Estado Normal
- Verde: Seguridad activa
- Oro: Recompensas disponibles

### Hover en Cards (futuro)
- Intensificar verde/oro
- Aumentar opacidad 10% → 15%

### Estado de Claim (futuro)
- Partículas de oro más intensas
- Nodos pulsando más rápido

---

## 📊 Comparación con Otros Fondos

| Elemento | Staking | Battle | Kingdom |
|----------|---------|--------|---------|
| Color Principal | 🟢 Verde | 🔴 Rojo | 🟡 Oro |
| Tema | Bóveda | Arena | Castillo |
| Símbolos | Monedas, Vault | Espadas | Torres |
| Red | Blockchain | Ninguna | Murallas |
| Energía | Segura | Intensa | Majestuosa |

---

## 🔮 Mejoras Futuras

- 🔲 Animación sutil de monedas apilándose
- 🔲 Efecto de "counting" en números
- 🔲 Partículas flotantes al claim rewards
- 🔲 Cerraduras "abriéndose" al deposit
- 🔲 Nodos blockchain animándose al stake
- 🔲 Glow más intenso al hover en APY
- 🔲 Efecto de "vault opening" al entrar a la sección

---

## 📝 Resumen

**Elementos Totales**: 50+ elementos visuales
**Colores**: 2 primarios (verde, oro)
**Opacidad**: 5-30% para sutileza
**Animaciones**: 5 nodos pulsantes
**Tema**: Medieval Treasury + Digital Vault
**Sentimiento**: Seguridad, riqueza, confianza

El fondo crea la atmósfera perfecta para que los usuarios sientan que sus tokens están seguros en una bóveda profesional mientras generan recompensas. 🏦✨
