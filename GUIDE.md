# MindAR React Project - คู่มือการใช้งาน

## 📖 เกี่ยวกับโปรเจค

โปรเจคนี้เป็น Web AR Application ที่ใช้ **MindAR.js** สำหรับ Image Tracking พัฒนาด้วย:
- **React 19** + **TypeScript** - สำหรับ UI และ Type Safety
- **Vite** - Build tool ที่เร็วและทันสมัย
- **MindAR.js** - Web AR Library สำหรับ Image Tracking
- **A-Frame** - 3D Web Framework
- **Three.js** - 3D Graphics Engine (ใช้ผ่าน A-Frame)

## 🚀 เริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

### 3. Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build แล้วจะอยู่ใน folder `dist/`

### 4. Preview Production Build

```bash
npm run preview
```

## 🎯 วิธีการทดสอบ AR

1. **เปิดแอปในเบราว์เซอร์**
   - Chrome (แนะนำ)
   - Safari (iOS/macOS)
   - Firefox

2. **คลิก "Launch AR Experience"**

3. **อนุญาตการเข้าถึงกล้อง**
   - Browser จะขออนุญาตใช้กล้อง
   - คลิก "Allow" หรือ "อนุญาต"

4. **คลิก "Start AR"**

5. **ดาวน์โหลด Target Image**
   - [คลิกดาวน์โหลด Target Image](https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png)
   - พิมพ์ออกมาหรือเปิดบนหน้าจออีกเครื่อง

6. **ชี้กล้องไปที่ Target Image**
   - 3D model จะปรากฏบนรูปภาพ
   - ลองเคลื่อนที่ดูการติดตาม

## 📁 โครงสร้างโปรเจค

```
ar-tracking-react/
├── public/                    # Static files
│   └── targets/              # เก็บไฟล์ .mind (compiled target images)
│
├── src/
│   ├── components/           # React Components
│   │   ├── ARScene.tsx       # Component หลักสำหรับ AR
│   │   └── ARScene.css       # Styles สำหรับ AR
│   │
│   ├── types/                # TypeScript Type Definitions
│   │   └── mindar.d.ts       # Types สำหรับ MindAR
│   │
│   ├── App.tsx               # Main App Component
│   ├── App.css               # App Styles
│   ├── index.css             # Global Styles
│   └── main.tsx              # Entry Point
│
├── index.html                # HTML Template
├── package.json              # Dependencies & Scripts
├── tsconfig.json             # TypeScript Configuration
├── vite.config.ts            # Vite Configuration
└── README.md                 # Documentation
```

## 🎨 การปรับแต่งโปรเจค

### 1. เปลี่ยน Target Image ของคุณเอง

#### Step 1: Compile Target Image
1. ไปที่ [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
2. อัปโหลดรูปภาพของคุณ
3. คลิก "Start" เพื่อ compile
4. ดาวน์โหลดไฟล์ `.mind` ที่ได้

#### Step 2: เพิ่มไฟล์เข้าโปรเจค
```bash
# วางไฟล์ .mind ลงใน public/targets/
public/targets/my-target.mind
```

#### Step 3: อัพเดท Code
แก้ไขใน `src/App.tsx`:

```tsx
<ARScene imageTargetSrc="/targets/my-target.mind" />
```

### 2. เปลี่ยน 3D Model

#### Step 1: เตรียม 3D Model
- รองรับ format: GLTF (.gltf) หรือ GLB (.glb)
- ขนาดไฟล์ไม่ควรใหญ่เกินไป (< 10MB แนะนำ)

#### Step 2: วางไฟล์ใน public/
```bash
public/models/my-model.gltf
```

#### Step 3: อัพเดท ARScene.tsx
```tsx
<a-assets>
  <a-asset-item
    id="myModel"
    src="/models/my-model.gltf"
  ></a-asset-item>
</a-assets>

<a-entity mindar-image-target="targetIndex: 0">
  <a-gltf-model
    src="#myModel"
    position="0 0 0"
    scale="1 1 1"
    rotation="0 0 0"
  ></a-gltf-model>
</a-entity>
```

### 3. เพิ่ม Multiple Target Images

#### Step 1: Compile หลาย Target Images
- Compile target images หลายรูปที่ [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
- เลือก "Number of targets: 2" (หรือมากกว่า)

#### Step 2: อัพเดท Code
```tsx
<a-entity mindar-image-target="targetIndex: 0">
  {/* Content สำหรับ Target 1 */}
  <a-gltf-model src="#model1" />
</a-entity>

<a-entity mindar-image-target="targetIndex: 1">
  {/* Content สำหรับ Target 2 */}
  <a-gltf-model src="#model2" />
</a-entity>
```

### 4. เพิ่ม Animation

```tsx
<a-gltf-model
  src="#myModel"
  position="0 0 0"
  scale="1 1 1"
  animation="
    property: rotation;
    to: 0 360 0;
    dur: 2000;
    loop: true;
    easing: linear
  "
/>
```

### 5. เพิ่ม Event Handlers

แก้ไขใน `ARScene.tsx`:

```tsx
useEffect(() => {
  const sceneEl = sceneRef.current;
  
  const handleTargetFound = () => {
    console.log('พบ Target!');
    // ทำอะไรก็ได้เมื่อเจอ target
  };

  const handleTargetLost = () => {
    console.log('หาย Target!');
    // ทำอะไรก็ได้เมื่อ target หาย
  };

  sceneEl.addEventListener('targetFound', handleTargetFound);
  sceneEl.addEventListener('targetLost', handleTargetLost);

  return () => {
    sceneEl.removeEventListener('targetFound', handleTargetFound);
    sceneEl.removeEventListener('targetLost', handleTargetLost);
  };
}, []);
```

## 🔧 Tips & Best Practices

### Performance Optimization

1. **ลดขนาด 3D Models**
   - ใช้ tools เช่น [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)
   - Compress textures
   - ลดจำนวน polygons

2. **ใช้ Draco Compression**
   ```tsx
   <a-gltf-model
     src="/models/compressed.glb"
     draco="decoderPath: https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
   />
   ```

3. **Lazy Loading**
   - โหลด assets ตอนที่ต้องใช้เท่านั้น
   - ใช้ React Suspense

### Target Image Guidelines

1. **ลักษณะรูปภาพที่ดี**
   - มี contrast สูง
   - มีรายละเอียดเยอะ
   - ไม่ซ้ำซากจำเจ
   - ขนาด 1024x1024 px ขึ้นไป

2. **หลีกเลี่ยง**
   - รูปภาพที่มีสีเดียว
   - Pattern ที่ซ้ำๆ
   - รูปภาพที่มัว
   - ขนาดเล็กเกินไป

### Debugging

1. **เปิด Console**
   - Chrome: F12 → Console
   - ดู logs และ errors

2. **ตรวจสอบ Camera Access**
   ```typescript
   navigator.mediaDevices.getUserMedia({ video: true })
     .then(() => console.log('Camera OK'))
     .catch(err => console.error('Camera Error:', err));
   ```

3. **ทดสอบ Target Image Quality**
   - ใน [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
   - ดูคะแนน features ที่ detect ได้

## 🌐 Deployment

### Deploy to Vercel (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist/ folder ใน Netlify Dashboard
```

### Deploy to GitHub Pages

1. แก้ไข `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/repo-name/',
     // ...
   });
   ```

2. Build และ deploy:
   ```bash
   npm run build
   gh-pages -d dist
   ```

## 🐛 Troubleshooting

### กล้องไม่ทำงาน

**สาเหตุ:**
- ไม่ได้อนุญาตการเข้าถึงกล้อง
- ใช้ HTTP แทน HTTPS
- กล้องถูกใช้โดยแอปอื่น

**แก้ไข:**
- ตรวจสอบ permission ใน browser settings
- ใช้ HTTPS หรือ localhost
- ปิดแอปอื่นที่ใช้กล้อง

### AR ติดตามไม่ได้

**สาเหตุ:**
- แสงไม่พอ
- Target image มัว
- ระยะห่างไม่เหมาะสม

**แก้ไข:**
- เพิ่มแสงในห้อง
- พิมพ์ target image ให้ชัด
- ลองปรับระยะห่าง 20-50 cm

### Performance ช้า

**สาเหตุ:**
- 3D model ใหญ่เกินไป
- อุปกรณ์ประสิทธิภาพต่ำ

**แก้ไข:**
- Optimize 3D models
- ลดจำนวน polygons
- ใช้ compressed textures

## 📚 Resources

### MindAR
- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [MindAR GitHub](https://github.com/hiukim/mind-ar-js)
- [MindAR Examples](https://hiukim.github.io/mind-ar-js-doc/examples/summary)

### 3D & AR
- [A-Frame Documentation](https://aframe.io/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebXR Device API](https://www.w3.org/TR/webxr/)

### Tools
- [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
- [Sketchfab](https://sketchfab.com/) - ดาวน์โหลด 3D models
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - ดู GLTF models

## 💡 Next Steps

1. **เพิ่มฟีเจอร์**
   - Face Tracking
   - Hand Tracking
   - Multiple Objects

2. **ปรับปรุง UI/UX**
   - Loading animations
   - Better instructions
   - Error handling

3. **Optimization**
   - Code splitting
   - Asset optimization
   - PWA support

4. **Analytics**
   - Track usage
   - Performance monitoring
   - Error tracking

---

สนุกกับการพัฒนา AR! 🚀✨
