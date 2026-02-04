# 🎯 Custom Target Setup - Successfully Changed Target Image!

## ✅ What's Already Done

### 1. Using Your Custom Target
```
public/targets/
└── targets.mind  ✅  ← Your target file
```

### 2. Updated ARScene Component
- Changed `imageTargetSrc` from default → `/targets/targets.mind`
- Removed placeholder card image
- Added comments for adding target image later

---

## 🚀 How to Use

### Step 1: Prepare Target Image

You need an **image** that was compiled into `targets.mind`:

1. **Already have the image?**
   - Yes → Skip to Step 2
   - No → Go to [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)

2. **If you don't have it yet - Create Target:**
   - Upload your image at [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
   - Click "Start" to compile
   - Download the `.mind` file (you already have it ✅)
   - **Important:** Keep the original image too!

### Step 2: Place Target Image (if you want to show it in AR)

If you want the target image to appear in AR:

1. **Place the image in public/targets/**
   ```
   public/targets/
   ├── targets.mind           ← Already exists
   └── my-target-image.png    ← Add your image here
   ```

2. **Edit ARScene.tsx** (around lines 100–105):
   ```tsx
   <a-assets>
     {/* Add your target image */}
     <img 
       id="targetImage" 
       src="/targets/my-target-image.png" 
       crossOrigin="anonymous"
     />
     
     <a-asset-item
       id="crabModel"
       src="/model/scene.gltf"
     ></a-asset-item>
   </a-assets>
   ```

3. **Uncomment the plane that shows the image** (around lines 118–121):
   ```tsx
   <a-entity mindar-image-target="targetIndex: 0">
     {/* Show target image in AR */}
     <a-plane 
       src="#targetImage" 
       position="0 0 0" 
       height="0.552" 
       width="1" 
       rotation="0 0 0"
     ></a-plane>
     
     {/* Crab Model */}
     <a-gltf-model ... />
   </a-entity>
   ```

### Step 3: Test

1. **Save the file**
2. **Open browser**: `https://localhost:5173/`
3. **Launch AR Experience**
4. **Start AR**
5. **Point the camera at the original image you used to compile**
   - The Crab model will appear! 🦀

---

## 📸 If You Don't Have a Target Image Yet

### Create a New Target Image:

#### 1. Prepare the Image
**Good image characteristics:**
- ✅ High contrast (clear dark/light areas)
- ✅ Lots of detail
- ✅ Not repetitive
- ✅ At least 1024×1024 px

**Avoid:**
- ❌ Single-color images
- ❌ Repetitive patterns
- ❌ Blurry images
- ❌ Too small

#### 2. Compile in MindAR

1. **Go to**: [https://hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile)

2. **Upload image**:
   - Click "Upload"
   - Select your image

3. **Settings** (optional):
   - Number of targets: 1 (or more if using multiple images)

4. **Compile**:
   - Click "Start"
   - Wait a moment…
   - Download the `.mind` file

5. **Replace the file**:
   ```bash
   # Remove old file
   rm public/targets/targets.mind
   
   # Place new file (from your download)
   # Rename it to targets.mind
   ```

#### 3. Test Quality

In the MindAR Compiler you’ll see a feature score:
- **Good**: 50–100+ features ✅
- **OK**: 20–50 features ⚠️
- **Poor**: &lt; 20 features ❌

If the score is low → try a different image

---

## 🎨 Multiple Targets

To use multiple target images:

### 1. Compile Multiple Images

In MindAR Compiler:
- Set "Number of targets" = 2 (or more)
- Upload multiple images
- Compile
- You get a `.mind` file that supports multiple targets

### 2. Edit ARScene

```tsx
<a-assets>
  <img id="target1" src="/targets/target-1.png" />
  <img id="target2" src="/targets/target-2.png" />
  
  <a-asset-item id="crabModel" src="/model/scene.gltf" />
  <a-asset-item id="duckModel" src="/models/duck.gltf" />
</a-assets>

{/* Target 1 - Crab */}
<a-entity mindar-image-target="targetIndex: 0">
  <a-plane src="#target1" position="0 0 0" height="0.552" width="1" />
  <a-gltf-model src="#crabModel" position="0 0 0.1" scale="0.5 0.5 0.5" />
</a-entity>

{/* Target 2 - Duck */}
<a-entity mindar-image-target="targetIndex: 1">
  <a-plane src="#target2" position="0 0 0" height="0.552" width="1" />
  <a-gltf-model src="#duckModel" position="0 0 0.1" scale="0.001 0.001 0.001" />
</a-entity>
```

---

## 🔄 Replace Target Completely

### Quick Steps:

1. **Compile a new image** → get `new-target.mind`

2. **Replace the file**:
   ```bash
   mv ~/Downloads/new-target.mind public/targets/targets.mind
   ```

3. **Place the original image**:
   ```bash
   cp ~/Pictures/my-image.png public/targets/my-target-image.png
   ```

4. **Edit ARScene.tsx** (if you want to show the image):
   ```tsx
   <img id="targetImage" src="/targets/my-target-image.png" />
   ```

5. **Reload the browser** → point the camera at the new image!

---

## 📂 File Structure

### Current:
```
public/targets/
└── targets.mind  ← Your custom target
```

### Recommended (with target image):
```
public/targets/
├── targets.mind           ← Compiled target
└── my-target-image.png    ← Original image (for display in AR)
```

### Multiple targets:
```
public/targets/
├── targets.mind           ← Compiled (supports multiple targets)
├── target-1.png           ← Image 1
├── target-2.png           ← Image 2
└── target-3.png           ← Image 3
```

---

## 🐛 Troubleshooting

### Target Not Tracking

**1. Check image quality**
- In MindAR Compiler, check the feature score
- Aim for 50+ features

**2. Check room lighting**
- Plenty of light
- Avoid strong reflections

**3. Check image size**
- Don’t print too small (at least A5)
- Or display on a large screen

**4. Check distance**
- 20–50 cm from camera
- Point camera straight (not too tilted)

### .mind File Not Loading

**1. Check path**
```tsx
// Correct ✅
imageTargetSrc = '/targets/targets.mind'

// Wrong ❌
imageTargetSrc = 'targets/targets.mind'  // Missing /
imageTargetSrc = '/public/targets/targets.mind'  // Don't include public
```

**2. Check that the file exists**
```bash
ls -la public/targets/
# You should see targets.mind
```

**3. Check Console (F12)**
- Look for "Failed to load" errors
- Look for 404 errors

### Target Image Not Showing in AR

**1. Check that ids match**
```tsx
// Assets
<img id="targetImage" src="..." />  ← id

// Reference
<a-plane src="#targetImage" ... />  ← Must match (with #)
```

**2. Check CORS**
```tsx
<img 
  id="targetImage" 
  src="/targets/image.png" 
  crossOrigin="anonymous"  ← Add this line
/>
```

---

## 💡 Tips

### Add Target Image Preview

Add a component to show the target image on the welcome screen:

```tsx
// In App.tsx
<div className="info">
  <p><strong>📸 Your Target Image:</strong></p>
  <img 
    src="/targets/my-target-image.png" 
    alt="Target" 
    style={{ 
      width: '200px', 
      border: '2px solid white',
      borderRadius: '8px',
      marginTop: '10px'
    }}
  />
  <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>
    👆 Point your camera at this image
  </p>
</div>
```

### Adjust Target Plane

If the image doesn’t align with the target:

```tsx
<a-plane 
  src="#targetImage" 
  position="0 0 0" 
  height="0.552"       ← Adjust height
  width="1"            ← Adjust width
  rotation="0 0 0" 
/>

// Example: square image
height="1" width="1"

// Example: landscape
height="0.5" width="1"

// Example: portrait
height="1" width="0.5"
```

---

## 📚 Resources

- **[MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)** - Compile target images
- **[Target Image Guidelines](https://hiukim.github.io/mind-ar-js-doc/quick-start/compile)** - Best practices
- **[MindAR Examples](https://hiukim.github.io/mind-ar-js-doc/examples/summary)** - More examples

---

## ✅ Checklist

When changing custom target:

- [x] Have `targets.mind` in `public/targets/` ✅
- [ ] Have original image (if you want to show it in AR)
- [ ] Update `imageTargetSrc` in ARScene
- [ ] (Optional) Add target image to assets
- [ ] (Optional) Uncomment `<a-plane>` to show the image
- [ ] Test in browser
- [ ] Test on mobile

---

**Custom target is ready to use! 🎯**

Point your camera at the image you compiled and the Crab will appear! 🦀✨
