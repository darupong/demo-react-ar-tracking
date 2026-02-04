# 🎨 How to Change 3D Model

## 📋 What You Need

1. ✅ **3D model** in `.gltf` or `.glb` format
2. ✅ File size ideally under **10MB** (for good performance)
3. ✅ Optimize the model before using it

---

## 🌐 Method 1: Use Model from URL (recommended – easiest)

### Step 1: Find a 3D Model

#### Recommended sites:
- **[Sketchfab](https://sketchfab.com/)** - Many free models
  - Filter: "Downloadable" + "Free"
  - Download format: **GLTF**
  
- **[Google Poly Archive](https://poly.pizza/)** - Models from Google
- **[CGTrader](https://www.cgtrader.com/free-3d-models)** - Free and paid

#### Example free models you can use:
```javascript
// Duck Model
"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"

// Robot Model
"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf"

// Avocado Model
"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf"

// Brain Stem Model
"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf"
```

### Step 2: Edit `src/components/ARScene.tsx`

Find this in the code:

```tsx
<a-assets>
  <img
    id="card"
    src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png"
    crossOrigin="anonymous"
  />
  <a-asset-item
    id="avatarModel"  {/* ← You can change the id */}
    src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/softmind/scene.gltf"
  ></a-asset-item>
</a-assets>
```

**Change to:**

```tsx
<a-assets>
  <img
    id="card"
    src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png"
    crossOrigin="anonymous"
  />
  
  {/* Change the model URL here */}
  <a-asset-item
    id="myModel"  {/* ← New id */}
    src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"
  ></a-asset-item>
</a-assets>
```

### Step 3: Update Model Reference

Find this:

```tsx
<a-entity mindar-image-target="targetIndex: 0">
  <a-plane
    src="#card"
    position="0 0 0"
    height="0.552"
    width="1"
    rotation="0 0 0"
  ></a-plane>
  
  <a-gltf-model
    rotation="0 0 0"
    position="0 0 0.1"
    scale="0.005 0.005 0.005"
    src="#avatarModel"  {/* ← Change here */}
    animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
  ></a-gltf-model>
</a-entity>
```

**Change to:**

```tsx
<a-entity mindar-image-target="targetIndex: 0">
  <a-plane
    src="#card"
    position="0 0 0"
    height="0.552"
    width="1"
    rotation="0 0 0"
  ></a-plane>
  
  <a-gltf-model
    rotation="0 0 0"
    position="0 0 0.1"
    scale="0.1 0.1 0.1"  {/* ← Adjust scale as needed */}
    src="#myModel"  {/* ← New id */}
    animation="property: rotation; to: 0 360 0; dur: 3000; easing: linear; loop: true"
  ></a-gltf-model>
</a-entity>
```

### Step 4: Adjust Scale and Position

Each model has different size. Try adjusting:

```tsx
<a-gltf-model
  position="0 0 0"      // Position (x, y, z)
  scale="1 1 1"         // Size (x, y, z)
  rotation="0 0 0"      // Rotation (x, y, z) degrees
  src="#myModel"
/>
```

**Common values:**

| Model Type | Scale | Position |
|-----------|-------|----------|
| Character | `0.1 0.1 0.1` | `0 0 0.1` |
| Object | `0.5 0.5 0.5` | `0 0 0` |
| Small Item | `1 1 1` | `0 0 0.05` |

---

## 📦 Method 2: Use Local Model File

### Step 1: Prepare Model File

1. Download the model (`.gltf` or `.glb`)
2. Place it in `public/models/`

```
ar-tracking-react/
└── public/
    └── models/
        ├── duck.gltf
        ├── duck.bin          (if present)
        └── textures/         (if present)
            └── duck_texture.png
```

### Step 2: Edit ARScene.tsx

```tsx
<a-assets>
  <a-asset-item
    id="myModel"
    src="/models/duck.gltf"  {/* ← Path from public/ */}
  ></a-asset-item>
</a-assets>

<a-entity mindar-image-target="targetIndex: 0">
  <a-gltf-model
    src="#myModel"
    position="0 0 0.1"
    scale="0.1 0.1 0.1"
  ></a-gltf-model>
</a-entity>
```

### Step 3: If Using .glb (compressed)

```tsx
<a-assets>
  <a-asset-item
    id="myModel"
    src="/models/duck.glb"  {/* ← .glb packs everything in one file */}
  ></a-asset-item>
</a-assets>
```

---

## 🎬 Add Animation

### 1. Rotation

```tsx
<a-gltf-model
  src="#myModel"
  animation="
    property: rotation;
    to: 0 360 0;
    dur: 3000;
    loop: true;
    easing: linear
  "
/>
```

### 2. Floating

```tsx
<a-gltf-model
  src="#myModel"
  animation="
    property: position;
    to: 0 0.2 0.1;
    dur: 1500;
    loop: true;
    dir: alternate;
    easing: easeInOutQuad
  "
/>
```

### 3. Scale Pulse

```tsx
<a-gltf-model
  src="#myModel"
  animation="
    property: scale;
    to: 0.15 0.15 0.15;
    dur: 1000;
    loop: true;
    dir: alternate;
    easing: easeInOutElastic
  "
/>
```

### 4. Multiple Animations

```tsx
<a-gltf-model
  src="#myModel"
  animation__rotate="
    property: rotation;
    to: 0 360 0;
    dur: 3000;
    loop: true;
    easing: linear
  "
  animation__float="
    property: position;
    to: 0 0.2 0.1;
    dur: 1500;
    loop: true;
    dir: alternate;
    easing: easeInOutQuad
  "
/>
```

---

## 🎨 Complete Code Examples

### Example 1: Duck Model

```tsx
<a-assets>
  <img id="card" src="..." crossOrigin="anonymous" />
  <a-asset-item
    id="duckModel"
    src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"
  ></a-asset-item>
</a-assets>

<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

<a-entity mindar-image-target="targetIndex: 0">
  <a-plane src="#card" position="0 0 0" height="0.552" width="1"></a-plane>
  
  <a-gltf-model
    src="#duckModel"
    position="0 0 0.1"
    scale="0.001 0.001 0.001"
    rotation="0 0 0"
    animation__rotate="property: rotation; to: 0 360 0; dur: 4000; loop: true; easing: linear"
    animation__float="property: position; to: 0 0.1 0.1; dur: 1500; loop: true; dir: alternate; easing: easeInOutQuad"
  ></a-gltf-model>
</a-entity>
```

### Example 2: Robot Model

```tsx
<a-assets>
  <a-asset-item
    id="robotModel"
    src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf"
  ></a-asset-item>
</a-assets>

<a-entity mindar-image-target="targetIndex: 0">
  <a-gltf-model
    src="#robotModel"
    position="0 0 0"
    scale="0.2 0.2 0.2"
    rotation="-90 0 0"
    animation="property: rotation; to: -90 360 0; dur: 5000; loop: true; easing: linear"
  ></a-gltf-model>
</a-entity>
```

### Example 3: Multiple Models

```tsx
<a-assets>
  <a-asset-item id="model1" src="..."></a-asset-item>
  <a-asset-item id="model2" src="..."></a-asset-item>
  <a-asset-item id="model3" src="..."></a-asset-item>
</a-assets>

<a-entity mindar-image-target="targetIndex: 0">
  <a-gltf-model src="#model1" position="-0.3 0 0" scale="0.1 0.1 0.1"></a-gltf-model>
  <a-gltf-model src="#model2" position="0 0 0" scale="0.1 0.1 0.1"></a-gltf-model>
  <a-gltf-model src="#model3" position="0.3 0 0" scale="0.1 0.1 0.1"></a-gltf-model>
</a-entity>
```

---

## 🛠️ Optimize 3D Models

### Using gltf-pipeline

```bash
# Install
npm install -g gltf-pipeline

# Compress model
gltf-pipeline -i model.gltf -o model-compressed.glb -d

# Result:
# - 50-80% smaller file
# - Faster load
# - Better performance
```

### Online Tools

1. **[glTF Viewer](https://gltf-viewer.donmccurdy.com/)**
   - Preview model before use
   - Check that textures load

2. **[glTF Report](https://github.khronos.org/glTF-Validator/)**
   - Check for errors
   - Get optimization tips

3. **[Sketchfab](https://sketchfab.com/)**
   - Download models
   - Export as GLTF

---

## 🐛 Troubleshooting

### Model Not Showing

**Check:**

1. **Is the URL valid?**
   - Open the URL in the browser
   - It must be accessible

2. **CORS issues?**
   - External URLs may be blocked by CORS
   - Add `crossOrigin="anonymous"` to a-asset-item

3. **Scale too small or too large?**
   ```tsx
   scale="0.001 0.001 0.001"  // ← Very small
   scale="10 10 10"           // ← Very large
   ```
   Try different scale values.

4. **Position outside viewport?**
   ```tsx
   position="0 0 0.1"  // ← In front of target
   position="0 0 -1"   // ← Behind target (invisible)
   ```

5. **Check Console for errors**
   - F12 → Console
   - Look at error messages

### Model Loads Slowly

1. **Compress the model**
   - Use gltf-pipeline
   - Convert to .glb

2. **Reduce texture size**
   - Lower image resolution
   - Use compressed formats

3. **Remove unnecessary data**
   - Remove unused animations
   - Remove unused materials

### Model Displays Incorrectly

1. **Wrong rotation**
   - Try: `rotation="-90 0 0"`

2. **Lighting issues**
   - Add lights to the scene:
   ```tsx
   <a-light type="ambient" color="#fff" intensity="0.8"></a-light>
   <a-light type="directional" position="1 1 1" intensity="0.5"></a-light>
   ```

3. **Material not showing**
   - Ensure textures load
   - Check texture paths

---

## 📚 Resources

### 3D Models
- [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount)
- [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Poly Pizza](https://poly.pizza/)
- [Free3D](https://free3d.com/3d-models/gltf)

### Tools
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline)
- [Blender](https://www.blender.org/) - Create/edit models

### Documentation
- [A-Frame GLTF Model](https://aframe.io/docs/1.4.0/components/gltf-model.html)
- [A-Frame Animation](https://aframe.io/docs/1.4.0/components/animation.html)
- [glTF Format Specification](https://www.khronos.org/gltf/)

---

## ✅ Quick Checklist

When changing model:

- [ ] Have model in `.gltf` or `.glb`
- [ ] Update URL/path in `<a-asset-item>`
- [ ] Update `id` and `src` reference
- [ ] Set appropriate `scale`
- [ ] Set appropriate `position`
- [ ] Adjust `rotation` if needed
- [ ] Add animation if desired
- [ ] Test on desktop and mobile

---

**Have fun changing 3D models! 🎨✨**
