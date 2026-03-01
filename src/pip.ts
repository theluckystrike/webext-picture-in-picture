/**
 * PiP Panel — Floating draggable panel overlay
 */
export class PiPPanel {
    private panel: HTMLElement | null = null;
    private isDragging = false;
    private offsetX = 0; private offsetY = 0;

    /** Create floating panel */
    create(options: { width?: number; height?: number; position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' } = {}): HTMLElement {
        const { width = 320, height = 240, position = 'bottom-right' } = options;
        this.panel = document.createElement('div');
        const pos = { 'top-right': 'top:16px;right:16px', 'bottom-right': 'bottom:16px;right:16px', 'top-left': 'top:16px;left:16px', 'bottom-left': 'bottom:16px;left:16px' }[position];
        Object.assign(this.panel.style, {
            position: 'fixed', width: `${width}px`, height: `${height}px`, zIndex: '999999',
            background: '#fff', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', overflow: 'hidden', resize: 'both', ...this.parsePos(pos)
        });

        const header = document.createElement('div');
        Object.assign(header.style, { height: '32px', background: '#F3F4F6', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' });

        const title = document.createElement('span'); title.style.cssText = 'font-size:12px;color:#6B7280;font-weight:500;font-family:-apple-system,sans-serif'; title.textContent = 'Panel';
        const closeBtn = document.createElement('button'); closeBtn.textContent = '×'; closeBtn.style.cssText = 'border:none;background:none;font-size:18px;cursor:pointer;color:#9CA3AF;padding:0 4px';
        closeBtn.addEventListener('click', () => this.close());
        header.appendChild(title); header.appendChild(closeBtn);

        const content = document.createElement('div'); content.id = '__pip_content__'; content.style.cssText = 'padding:8px;height:calc(100% - 32px);overflow:auto';
        this.panel.appendChild(header); this.panel.appendChild(content);
        this.enableDrag(header);
        document.body.appendChild(this.panel);
        return content;
    }

    /** Set panel content */
    setContent(html: string): this { const c = this.panel?.querySelector('#__pip_content__'); if (c) c.innerHTML = html; return this; }

    /** Set opacity */
    setOpacity(value: number): this { if (this.panel) this.panel.style.opacity = String(Math.max(0.1, Math.min(1, value))); return this; }

    /** Close panel */
    close(): void { this.panel?.remove(); this.panel = null; }

    /** Check if panel is open */
    isOpen(): boolean { return this.panel !== null; }

    private enableDrag(handle: HTMLElement): void {
        handle.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.offsetX = e.clientX - (this.panel?.getBoundingClientRect().left || 0);
            this.offsetY = e.clientY - (this.panel?.getBoundingClientRect().top || 0);
        });
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.panel) return;
            this.panel.style.left = `${e.clientX - this.offsetX}px`; this.panel.style.top = `${e.clientY - this.offsetY}px`;
            this.panel.style.right = 'auto'; this.panel.style.bottom = 'auto';
        });
        document.addEventListener('mouseup', () => { this.isDragging = false; });
    }

    private parsePos(pos: string): Record<string, string> {
        const result: Record<string, string> = {};
        pos.split(';').forEach((p) => { const [k, v] = p.split(':'); if (k && v) result[k.trim()] = v.trim(); });
        return result;
    }
}
