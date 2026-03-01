# webext-picture-in-picture — Floating Panel Overlay
> **Built by [Zovo](https://zovo.one)** | `npm i webext-picture-in-picture`

Draggable floating panel with resize, close, opacity control, and corner positioning.

```typescript
import { PiPPanel } from 'webext-picture-in-picture';
const pip = new PiPPanel();
const content = pip.create({ width: 400, height: 300, position: 'bottom-right' });
pip.setContent('<h2>Live Preview</h2>').setOpacity(0.9);
```
MIT License
