# 🦀 Crab Model Setup - Complete!

## ✅ What's Done

### 1. Crab Model Installed
```
public/model/
├── scene.gltf       ✅ Model file
├── scene.bin        ✅ Binary data
├── textures/        ✅ Textures
│   └── Crab_M_baseColor.png
└── license.txt      ✅ License info
```

### 2. ARScene Component Updated
- Switched from default model to Crab model
- Adjusted scale, position, and rotation
- Added animations (rotate and float)

### 3. ARSceneWithSelector Created
- New component with Model Selector
- Choose between Crab, Duck, Robot, Avocado
- UI with animations

---

## 🚀 How to Use

### Option 1: Crab Model Only (current)

**File:** `src/components/ARScene.tsx`

Works out of the box. The Crab model appears when:
1. Open app → Launch AR Experience
2. Start AR
3. Point camera at target image

**Crab will:**
- 🔄 Rotate (6 seconds per rotation)
- ⬆️⬇️ Float up and down (2 seconds per cycle)

### Option 2: Model Selector (multiple models)

**Edit:** `src/App.tsx`

```tsx
// Change line 2 from:
import ARScene from './components/ARScene';

// To:
import ARSceneWithSelector from './components/ARSceneWithSelector';
```

```tsx
// Change line 69 from:
<ARScene />

// To:
<ARSceneWithSelector />
```

Then you’ll have model selection buttons:
- 🦀 Crab (Your Model)
- 🦆 Duck
- 🤖 Robot
- 🥑 Avocado

---

## 🎨 Customize Crab Model

### 1. Scale

Edit `src/components/ARScene.tsx` around line 124:

```tsx
scale="0.5 0.5 0.5"   // ← Current

// Examples:
scale="0.3 0.3 0.3"   // Smaller
scale="0.8 0.8 0.8"   // Bigger
scale="1 1 1"         // Much bigger
```

### 2. Position

```tsx
position="0 0 0.1"    // ← Current (x, y, z)

// Examples:
position="0 0 0"      // Flush with target
position="0 0.1 0.1"  // Higher
position="0.2 0 0.1"  // Move right
position="-0.2 0 0.1" // Move left
```

### 3. Rotation

```tsx
rotation="0 0 0"      // ← Current (x, y, z degrees)

// Examples:
rotation="0 90 0"     // Rotate 90° on Y axis
rotation="-90 0 0"    // Upright
rotation="0 180 0"    // Facing away
```

### 4. Change Animations

**Current animations:**

```tsx
animation__rotate="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"
animation__float="property: position; to: 0 0.2 0.1; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
```

**Other examples:**

```tsx
// Faster rotation
animation__rotate="property: rotation; to: 0 360 0; dur: 3000; easing: linear; loop: true"

// Slower rotation
animation__rotate="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"

// No float (remove animation__float line)

// Scale pulse
animation__scale="property: scale; to: 0.6 0.6 0.6; dur: 1500; easing: easeInOutQuad; loop: true; dir: alternate"

// Multiple animations
animation__rotate="property: rotation; to: 0 360 0; dur: 5000; loop: true"
animation__float="property: position; to: 0 0.15 0.1; dur: 2000; loop: true; dir: alternate"
animation__pulse="property: scale; to: 0.55 0.55 0.55; dur: 1000; loop: true; dir: alternate"
```

---

## 🎯 Add Other Models

### How to add a new model:

1. **Put files in public/models/**
   ```
   public/
   └── models/
       ├── crab/         ← Existing model
       │   └── scene.gltf
       └── new-model/    ← New model
           └── scene.gltf
   ```

2. **Add to AVAILABLE_MODELS**
   
   Edit `src/components/ARSceneWithSelector.tsx`:
   
   ```tsx
   const AVAILABLE_MODELS: Record<string, ModelConfig> = {
     crab: {
       name: '🦀 Crab',
       src: '/model/scene.gltf',
       scale: '0.5 0.5 0.5',
       position: '0 0 0.1',
       rotation: '0 0 0',
     },
     // Add new model here
     newModel: {
       name: '✨ New Model',
       src: '/models/new-model/scene.gltf',
       scale: '0.3 0.3 0.3',
       position: '0 0 0.1',
       rotation: '0 0 0',
     },
   };
   ```

---

## 🐛 Troubleshooting

### Crab Not Showing

**1. Check Console (F12)**
```javascript
// Look for:
- Failed to load resource
- CORS error
- 404 Not Found
```

**2. Check file location**
```bash
# Check file structure
ls -la public/model/
```

**3. Check scale**
```tsx
// Scale might be too small or too large
scale="0.5 0.5 0.5"   // Try adjusting this
```

### Crab Facing Wrong Direction

```tsx
// Try adjusting rotation
rotation="0 0 0"      // Normal
rotation="0 90 0"     // Rotate 90°
rotation="0 180 0"    // Facing away
rotation="-90 0 0"    // Upright
```

### Texture Not Showing

**Check that the textures folder has the file:**
```
public/model/textures/
└── Crab_M_baseColor.png  ✅
```

**If texture is missing:**
- Ensure `scene.gltf` has correct paths
- Textures must be in the `textures/` subfolder

### Poor Performance

**1. Optimize model:**
```bash
npm install -g gltf-pipeline
gltf-pipeline -i public/model/scene.gltf -o public/model/scene-optimized.glb -d
```

**2. Reduce texture size:**
- Compress `Crab_M_baseColor.png`
- Use tools like TinyPNG
- Or lower resolution

---

## 📱 Test on Mobile

### iPhone/iPad:

1. **Connect to same WiFi**
2. **Open Safari**: `https://192.168.1.122:5173/`
3. **Allow certificate warning**
4. **Allow camera access**
5. **Point camera at target image**

**Crab will appear on the image!** 🦀✨

---

## 📊 Model Info

### Crab model:
- **Format:** GLTF
- **Files:**
  - `scene.gltf` - Model definition
  - `scene.bin` - Binary data
  - `textures/Crab_M_baseColor.png` - Texture
- **Recommended scale:** 0.3 - 0.8
- **Animations:** Rotate + Float

---

## 🎉 Next Steps

### 1. Customize Crab
- [ ] Adjust scale
- [ ] Change animations
- [ ] Add lighting effects

### 2. Add Models
- [ ] Find other models on Sketchfab
- [ ] Add to Model Selector
- [ ] Build a model gallery

### 3. Add Features
- [ ] Interactive controls (click on model)
- [ ] Sound effects
- [ ] Multiple targets
- [ ] Record video

### 4. Deploy
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Share with friends! 🚀

---

## 📚 Resources

- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - Preview model before use
- [Sketchfab](https://sketchfab.com/) - Download models
- [MindAR Docs](https://hiukim.github.io/mind-ar-js-doc/) - Documentation
- [A-Frame Docs](https://aframe.io/docs/) - 3D framework

---

**Crab model is ready to use! 🦀✨**

Open your browser at `https://localhost:5173/` and try it out!
