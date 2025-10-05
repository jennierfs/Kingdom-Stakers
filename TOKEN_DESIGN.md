# Game Token Design

## Concepto: Medieval Gold Coin + Blockchain Cryptocurrency

Icono de token profesional que fusiona la moneda medieval tradicional con la tecnología blockchain moderna, representando tanto el aspecto de juego medieval como la naturaleza cripto del proyecto.

---

## 🎨 Diseño Visual

### Dos Caras Distintas

#### 🏰 **Cara Frontal (Front Side)** - Castle Emblem

**Paleta de Colores**:
- **Oro Claro**: `#fef3c7` (amber-50) - Brillo principal
- **Oro Medio**: `#fbbf24` (amber-400) - Color base
- **Oro Oscuro**: `#f59e0b` (amber-500) - Profundidad
- **Oro Profundo**: `#d97706` (amber-600) - Sombras

**Elementos**:
1. **Círculo Exterior** (r=48):
   - Gradiente radial dorado
   - Borde dorado oscuro (2px)
   - Borde claro interno (1px)
   - Efecto de profundidad con sombra

2. **Círculo Interior** (r=38):
   - Gradiente radial más intenso
   - Doble borde decorativo
   - Base para el emblema

3. **Torre del Castillo**:
   - Forma rectangular con almenas
   - 3 líneas horizontales (ventanas/niveles)
   - 2 columnas verticales (torres laterales)
   - Triángulo superior (techo puntiagudo)
   - Colores: oro oscuro + crema

4. **8 Puntos Decorativos**:
   - Distribuidos en círculo (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°)
   - Radio: 42px desde el centro
   - Tamaño: 1.5px
   - Color: oro oscuro

5. **Brillo de Luz**:
   - Elipse en esquina superior izquierda
   - Efecto de reflejo metálico
   - Gradiente blanco transparente
   - Rotación: -30°

#### 🔗 **Cara Reversa (Reverse Side)** - Blockchain Network

**Paleta de Colores**:
- **Plata Clara**: `#f1f5f9` (slate-50) - Brillo principal
- **Plata Media**: `#cbd5e1` (slate-300) - Color base
- **Plata Oscura**: `#94a3b8` (slate-400) - Profundidad
- **Gris Profundo**: `#64748b` (slate-500) - Sombras

**Elementos**:
1. **Círculo Exterior** (r=48):
   - Gradiente radial plateado
   - Mismo diseño de borde que frontal
   - Acabado metálico

2. **Red de Blockchain**:
   - **6 anillos concéntricos** (radios: 5, 10, 15, 20, 25, 30)
   - Cada anillo tiene nodos crecientes (6, 8, 10, 12, 14, 16)
   - Nodos: círculos pequeños (r=1.2)

3. **Conexiones**:
   - **Horizontales**: Conectan nodos en el mismo anillo
   - **Verticales**: Conectan anillos adyacentes
   - Líneas finas (0.5px) en gris oscuro
   - Opacidad: 30%

4. **Nodo Central**:
   - Círculo doble (r=3, r=2)
   - Gris oscuro exterior, plata clara interior
   - Representa el hub central

5. **Brillo de Luz**:
   - Igual que la cara frontal
   - En plata clara

---

## 📐 Especificaciones Técnicas

### Formato

- **Tipo**: SVG (Scalable Vector Graphics)
- **ViewBox**: 0 0 100 100
- **Dimensiones**: Completamente escalable
- **Tamaños predefinidos**: 32px, 48px, 64px, 96px, 128px, 200px

### Gradientes

**gold-gradient** (Radial):
```
Centro: 50%, 30%
0%:   #fef3c7 (brillo)
40%:  #fbbf24 (oro medio)
70%:  #f59e0b (oro)
100%: #d97706 (sombra)
```

**gold-inner** (Radial):
```
Centro: 50%, 50%
0%:   #fde68a (centro brillante)
50%:  #fbbf24 (oro medio)
100%: #f59e0b (borde)
```

**silver-gradient** (Radial):
```
Centro: 50%, 30%
0%:   #f1f5f9 (brillo)
40%:  #cbd5e1 (plata media)
70%:  #94a3b8 (plata)
100%: #64748b (sombra)
```

**silver-inner** (Radial):
```
Centro: 50%, 50%
0%:   #e2e8f0 (centro brillante)
50%:  #cbd5e1 (plata media)
100%: #94a3b8 (borde)
```

### Filtros SVG

**coin-shadow**:
- Gaussian Blur: 2px
- Offset: 0, 2
- Opacity: 40%
- Efecto: Sombra suave debajo de la moneda

---

## 🎭 Animaciones

### 1. **token-flip** (Volteo)
```css
Duration: 3s
Timing: ease-in-out
Loop: infinite
Effect: rotateY(0deg → 180deg → 0deg)
```
- Muestra ambas caras alternadamente
- Efecto 3D de moneda girando
- Ideal para presentación

### 2. **token-spin** (Giro)
```css
Duration: 2s
Timing: linear
Loop: infinite
Effect: rotate(0deg → 360deg)
```
- Rotación continua
- Efecto de moneda cayendo
- Útil para loading/cargando

### 3. **token-bounce** (Rebote)
```css
Duration: 1s
Timing: ease-in-out
Loop: infinite
Effect: translateY(0 → -10px → 0), scale(1 → 1.05 → 1)
```
- Efecto de moneda rebotando
- Escala sutil para énfasis
- Perfecto para recompensas

---

## 💡 Uso del Componente

### Sintaxis Básica

```tsx
import { TokenIcon } from './components/TokenIcon';

// Básico
<TokenIcon />

// Tamaño personalizado
<TokenIcon size={128} />

// Mostrar cara reversa
<TokenIcon showReverse={true} />

// Con animación
<TokenIcon animate={true} />
<TokenIcon className="token-flip" />
<TokenIcon className="token-spin" />
<TokenIcon className="token-bounce" />

// Combinaciones
<TokenIcon size={96} className="token-flip" />
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `number` | `64` | Tamaño en píxeles |
| `className` | `string` | `''` | Clases CSS adicionales |
| `showReverse` | `boolean` | `false` | Mostrar cara blockchain |
| `animate` | `boolean` | `false` | Activar animación flip |

---

## 🎯 Casos de Uso

### En el Juego

1. **Recompensas de Batalla**:
```tsx
<TokenIcon size={48} className="token-bounce" />
<span>+500 Tokens</span>
```

2. **Balance del Jugador**:
```tsx
<TokenIcon size={32} />
<span>{balance.toLocaleString()} Tokens</span>
```

3. **Staking Panel**:
```tsx
<TokenIcon size={64} className="token-spin" />
<p>Earning rewards...</p>
```

4. **Shop/Store**:
```tsx
<TokenIcon size={24} />
<span className="price">1,000</span>
```

5. **Transaction Pending**:
```tsx
<TokenIcon size={80} animate className="token-flip" />
<p>Processing transaction...</p>
```

---

## 🎨 Filosofía de Diseño

### Fusión Medieval + Blockchain

**Lado Medieval (Oro)**:
- 🏰 Torre de castillo: Símbolo de poder y dominación
- 👑 Oro brillante: Moneda real, valor tangible
- ⚔️ Diseño clásico: Monedas medievales europeas
- 💎 Premium: Metálico, valioso, deseable

**Lado Blockchain (Plata)**:
- 🔗 Red de nodos: Descentralización
- 🌐 Conexiones: Sistema distribuido
- 🔒 Geometría: Seguridad matemática
- 💻 Moderno: Tecnología cripto

### Reconocibilidad

✅ **Silueta clara**: Identificable a cualquier tamaño
✅ **Alto contraste**: Visible sobre fondos oscuros/claros
✅ **Colores distintivos**: Oro = valor, Plata = tech
✅ **Detalles escalables**: Funciona desde 16px hasta 512px

---

## 📊 Variantes y Usos

### Tamaños Recomendados

| Tamaño | Uso Principal | Detalles Visibles |
|--------|---------------|-------------------|
| 16px | Favicon, lista pequeña | Silueta básica |
| 24px | Precio inline, mini icon | Círculo + emblema |
| 32px | Balance, estadísticas | Emblema reconocible |
| 48px | Botones, cards | Todos los detalles |
| 64px | Hero sections | Detalles completos |
| 96px | Modales, popups | Premium quality |
| 128px | Showcase, landing | Máximo detalle |
| 200px+ | Documentación, promo | Ultra HD |

### Estados de Animación

| Estado | Animación | Mensaje |
|--------|-----------|---------|
| Idle | Ninguna | Token estático |
| Hover | Bounce | Interactivo |
| Loading | Spin | Procesando |
| Success | Flip rápido | Transacción exitosa |
| Reward | Bounce + Scale | ¡Ganaste! |

---

## 🔮 Mejoras Futuras

- 🔲 Animación de "lanzar moneda" (flip once)
- 🔲 Efecto de "lluvia de monedas"
- 🔲 Partículas doradas al aparecer
- 🔲 Sonido de "clink" metálico (opcional)
- 🔲 Versión con número (cantidad)
- 🔲 Stack de múltiples monedas
- 🔲 Efecto de "brillar" al hover
- 🔲 Variante "rara" (oro + gemas)

---

## 📝 Resumen

**Características Principales**:
- ✅ 2 caras distintas (Castle + Blockchain)
- ✅ 100% SVG vectorial
- ✅ Infinitamente escalable
- ✅ Gradientes metálicos realistas
- ✅ 3 animaciones incluidas
- ✅ Props flexibles
- ✅ TypeScript completo
- ✅ Peso mínimo (~5KB)

**Colores**:
- Frente: Oro (#fbbf24, #f59e0b, #d97706)
- Reverso: Plata (#cbd5e1, #94a3b8, #64748b)

**Elementos**:
- Torre medieval con almenas
- Red blockchain de 6 anillos
- Efectos de luz y profundidad
- Sombras y bordes detallados

**Animaciones**:
- Flip (volteo 3D)
- Spin (rotación 2D)
- Bounce (rebote)

El token representa perfectamente la fusión entre un juego medieval de conquista y la tecnología blockchain moderna, siendo instantáneamente reconocible como la moneda principal del juego. 🪙✨
