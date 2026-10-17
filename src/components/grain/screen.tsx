import { useState, useEffect, type ReactNode } from 'react';
import parse, { domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { referencePages } from './reference-pages';
import { useGrainStore, type GrainItem } from './store';

const linkPaths: Record<string, string> = { shop: '/shop', 'shop all': '/shop', 'shop collection': '/shop', process: '/process', 'our process': '/process', 'the process': '/process', about: '/about', 'about us': '/about', export: '/export', 'request quote': '/export', 'trade inquiry': '/contact', contact: '/contact', 'contact us': '/contact', privacy: '/privacy', 'privacy policy': '/privacy', 'terms of service': '/terms', 'return home': '/', 'track order': '/account', 'track your grain': '/account', 'logistics portal': '/account', 'logistics support': '/contact', 'contact support': '/contact', 'view specs': '/product', 'view all history': '/account', 'export desk': '/export', 'global export': '/export', wholesale: '/export', 'bulk supply': '/export', sustainability: '/about', certifications: '/process', 'certification hub': '/process', 'export policy': '/terms', origins: '/journal', 'chef program': '/journal' };
function text(node: DOMNode): string {
  if (node.type === 'text' && 'data' in node) return node.data;
  return 'children' in node ? node.children.map(x => text(x as DOMNode)).join(' ') : '';
}
function clean(value: string) { return value.replace(/\s+/g, ' ').trim(); }
function productFor(node: Element): Omit<GrainItem, 'quantity'> {
  let parent: Element | null = node;
  for (let i = 0; i < 6; i++) {
    if (!parent) break;
    const descendants: Element[] = [];
    const walk = (p: Element) => { for (const c of p.children) if (c instanceof Element) { descendants.push(c); walk(c); } };
    walk(parent);
    const heading = descendants.find(x => x.name === 'h3' || x.name === 'h1' || x.name === 'h4');
    const image = descendants.find(x => x.name === 'img');
    if (heading && image) return { name: clean(text(heading)), image: image.attribs['src'] || '', price: Number(text(parent).match(/\$(\d+(?:\.\d+)?)/)?.[1] ?? 45) };
    parent = parent.parent instanceof Element ? parent.parent : null;
  }
  return { name: 'Royal Basmati', price: 45, image: '' };
}
export function GrainScreen({ screen }: { screen: number }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const store = useGrainStore();
  const [menu, setMenu] = useState(false);
  const [basket, setBasket] = useState(false);
  const [preview, setPreview] = useState<Omit<GrainItem, 'quantity'> | null>(null);
  const [detail, setDetail] = useState('');
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState('10 KG');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('Featured');
  const [journalTab, setJournalTab] = useState('All Stories');
  useEffect(() => { if (!store.notice) return; const timer = setTimeout(() => store.notify(''), 5000); return () => clearTimeout(timer); }, [store.notice]);
  const go = (to: string) => { setMenu(false); navigate({ to }); };
  const download = (name: string) => { const blob = new Blob([`Praklaya Modern Rice Mill\n${name}\n\nPremium Varieties\nRoyal Basmati — $45.00 / 5kg\nForbidden Black — $58.00\nGolden Sella — $38.00\n\nFor trade inquiries: sales@praklayaricemill.com`], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${name.toLowerCase().replace(/ /g, '-')}.txt`; a.click(); URL.revokeObjectURL(url); };
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!(node instanceof Element)) return;
      const children = () => domToReact(node.children as DOMNode[], options);
      const label = clean(text(node));
      const cls = node.attribs['class'] || '';
      if (screen === 4 && node.name === 'section' && label.includes('Wholesale & Export')) return <section className={`${cls} grain-wholesale`}>{children()}</section>;
      if (node.name === 'a') {
        const href = node.attribs['href'] || '#';
        const key = label.toLowerCase().replace(/^(dashboard|package_2|favorite|location_on|settings) /, '').replace(/ (arrow_forward|east|open_in_new)$/, '');
        const target = linkPaths[key];
        if (target) return <Link to={target} className={cls}>{children()}</Link>;
        if (href.startsWith('mailto:') || href.startsWith('http')) return <a href={href} className={cls}>{children()}</a>;
        if (href.startsWith('#') && href.length > 1) return <a href={href} className={cls}>{children()}</a>;
        return <a href="#" className={cls} onClick={e => { e.preventDefault(); setDetail(label); }}>{children()}</a>;
      }
      if (node.name === 'button') {
        if (screen === 11 && step === 2 && label.toLowerCase().includes('proceed to logistics')) return <></>;
        const isSize = screen === 14 && ['5 KG', '10 KG', '25 KG', 'Bulk'].includes(label);
        const buttonClass = isSize ? `px-4 py-3 border rounded-xl font-label-caps text-label-caps ${selectedSize === label ? 'bg-primary text-on-primary border-primary' : 'bg-background text-primary border-outline-variant'}` : cls;
        return <Button variant="reference" className={buttonClass} type="button" onClick={event => {
          const low = label.toLowerCase();
          if (low.includes('shopping_cart') && !low.includes('add')) { setBasket(true); return; }
          if (low.includes('quick view')) { setPreview(productFor(node)); return; }
          if (low === 'add' || low.includes('add to cart') || low.includes('add_shopping_cart') || low === 'add_circle') { store.add(productFor(node)); return; }
          if (low.includes('request quote')) { go('/export'); return; }
          if (low.includes('download')) { download(low.includes('invoice') ? 'Order Invoice' : 'Product Catalog'); return; }
          if (low.includes('return to boutique') || low.includes('explore collection')) { go('/shop'); return; }
          if (low.includes('place secure order')) { go('/confirmation'); store.notify('Order preview only — no payment has been taken.'); return; }
          if (low.includes('send message') || low === 'subscribe' || low.includes('proceed to logistics')) {
            const form = event.currentTarget.closest('form') || event.currentTarget.closest('section')?.querySelector('form');
            if (form && !form.reportValidity()) return;
            if (low.includes('proceed')) setStep(2); else setDetail(low === 'subscribe' ? 'Subscription preview — email delivery is not connected.' : 'Inquiry preview — your message has not been sent.');
            return;
          }
          if (['5 kg','10 kg','25 kg','bulk'].includes(low)) { setSelectedSize(label); return; }
          if (low === 'clear all') { setCategory(''); setSelectedSize(''); document.querySelectorAll<HTMLInputElement>('.grain-reference input[type=checkbox]').forEach(x => { x.checked = false; }); return; }
          if (['all stories','origin tales','chef features','technical specs'].includes(low)) { setJournalTab(label); return; }
          if (low.includes('track')) { setDetail('Order #HG-8829 · In transit · Estimated arrival October 30 – November 2'); return; }
          if (low.includes('journey')) { go('/process'); return; }
          if (low === 'chat' || low === 'mail' || low.includes('export expert')) { go('/contact'); return; }
          if (low === 'close') { setPreview(null); return; }
          if (low === 'west' || low === 'east' || low.includes('chevron')) { event.currentTarget.closest('section')?.scrollIntoView({ behavior: 'smooth' }); return; }
          setDetail(label);
        }}>{children()}{screen === 14 && selectedSize === label ? <span className="sr-only">Selected</span> : null}</Button>;
      }
      if (node.name === 'input') {
        const type = node.attribs['type'] || 'text';
        return <input type={type} className={cls} placeholder={node.attribs['placeholder']} aria-label={node.attribs['placeholder'] || (node.parent ? clean(text(node.parent as DOMNode)) : type)} defaultChecked={type === 'checkbox' && 'checked' in node.attribs} required={type !== 'checkbox' && type !== 'radio'} onChange={type === 'checkbox' ? e => setCategory(e.currentTarget.checked ? clean(text(node.parent as DOMNode)) : '') : undefined} />;
      }
      if (node.name === 'textarea') return <textarea className={cls} placeholder={node.attribs['placeholder']} aria-label={node.attribs['placeholder'] || 'Message'} required />;
      if (node.name === 'form') return <form className={cls} id={node.attribs['id']} onSubmit={e => { e.preventDefault(); setDetail('Inquiry preview — your message has not been sent.'); }}>{children()}</form>;
      if (screen === 14 && node.name === 'select') return <select className={cls} aria-label="Sort varieties" value={sort} onChange={e => setSort(e.target.value)}>{children()}</select>;
      if (screen === 14 && cls.includes('card-hover')) {
        const name = productFor(node).name;
        if (category && ((category.includes('Basmati') && !name.includes('Basmati')) || (category.includes('Specialty') && !['Forbidden Black','Red Heirloom'].includes(name)) || (category.includes('Daily') && !['Golden Sella','Thai Jasmine','Classic Arborio'].includes(name)))) return <></>;
        return <div className={cls} data-product={name}>{children()}</div>;
      }
      if (screen === 14 && cls.includes('grid-cols-1') && cls.includes('lg:grid-cols-3')) {
        let nodes = [...node.children];
        if (sort.includes('Price')) nodes.sort((a,b) => { const price = (x: DOMNode) => Number(text(x).match(/\$(\d+)/)?.[1] || 0); return (price(a as DOMNode)-price(b as DOMNode)) * (sort.includes('High to Low') ? -1 : 1); });
        return <div className={cls}>{domToReact(nodes as DOMNode[], options)}</div>;
      }
      if (screen === 15 && node.name === 'aside' && store.items.length > 0) return <aside className={cls}><div className="sticky top-32 bg-card rounded-xl p-10 floating-card border border-outline-variant"><h3 className="font-headline-md text-headline-md text-primary mb-8">Order Summary</h3>{store.items.map(item => <div className="grain-cart-item" key={item.name}><img src={item.image} alt={item.name} /><div className="grain-cart-item-info"><h4>{item.name}</h4><p>${(item.price * item.quantity).toFixed(2)}</p><div className="flex items-center gap-3 mt-2"><Button variant="outline" size="icon" aria-label={`Decrease ${item.name}`} onClick={() => store.change(item.name,-1)}><Minus /></Button>{item.quantity}<Button variant="outline" size="icon" aria-label={`Increase ${item.name}`} onClick={() => store.change(item.name,1)}><Plus /></Button><Button variant="ghost" aria-label={`Remove ${item.name}`} onClick={() => store.remove(item.name)}>Remove</Button></div></div></div>)}<div className="grain-cart-total"><span>Order Total</span><strong>${store.items.reduce((n,x) => n+x.price*x.quantity,0).toFixed(2)}</strong></div></div></aside>;
      if (node.name === 'div' || node.name === 'aside') {
        if (cls.includes('fixed') && cls.includes('right-0')) return <div className={cls} role="link" aria-label="Contact us" tabIndex={0} onClick={() => go('/contact')} onKeyDown={e => { if (e.key === 'Enter') go('/contact'); }}>{children()}</div>;
      }
      if (screen === 11 && node.attribs['id'] === 'step-1' && step === 2) return <div><h3 className="font-headline-md text-headline-md text-primary mb-8">Logistics Requirements</h3><label className="block mb-6">Grain Variety<select className="checkout-input"><option>Royal Basmati</option><option>Golden Sella</option><option>Sona Masoori</option></select></label><label className="block mb-6">Quantity (Metric Tons)<input className="checkout-input" type="number" min="1" defaultValue="25" /></label><Button onClick={() => setStep(1)} variant="outline">Back</Button><Button className="ml-4" onClick={() => setDetail('Wholesale inquiry preview — your request has not been sent.')}>Review Inquiry</Button></div>;
      return undefined;
    },
  };
  return <>
    <nav className="grain-nav" aria-label="Main navigation"><div className="grain-nav-inner"><Link to="/" className="grain-brand" activeOptions={{ exact: true }} onClick={() => setMenu(false)}>Praklaya Modern Rice Mill</Link><div className={`grain-nav-links ${menu ? 'is-open' : ''}`}>{([['Shop','/shop'],['Process','/process'],['About','/about'],['Export','/export']] as const).map(([label,path]) => <Link key={path} to={path} className={pathname === path ? 'active' : ''} activeOptions={{ exact: true }} onClick={() => setMenu(false)}>{label}</Link>)}</div><div className="grain-nav-actions"><Button variant="ghost" size="icon" aria-label={`Shopping basket, ${store.items.reduce((n,x) => n+x.quantity,0)} items`} onClick={() => setBasket(true)}><ShoppingCart />{store.items.length > 0 && <span className="text-xs">{store.items.reduce((n,x) => n+x.quantity,0)}</span>}</Button><Button className="grain-quote" asChild><Link to="/contact-inquiry" onClick={() => setMenu(false)}>Request Quote</Link></Button><Button variant="ghost" size="icon" className="grain-menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu /></Button></div></div></nav>
    <div className="grain-reference" data-journal-tab={journalTab}>{parse(referencePages[screen] || referencePages[13] || '', options)}</div>
    {store.notice && <div className="grain-toast" role="status">{store.notice}<Button variant="ghost" size="icon" aria-label="Dismiss notification" onClick={() => store.notify('')}><X /></Button></div>}
    {(basket || preview || detail) && <div className="grain-dialog-overlay" onClick={() => { setBasket(false); setPreview(null); setDetail(''); }}><section className="grain-dialog" role="dialog" aria-modal="true" aria-label={basket ? 'Shopping basket' : preview ? preview.name : 'Details'} onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="grain-dialog-close" aria-label="Close dialog" onClick={() => { setBasket(false); setPreview(null); setDetail(''); }}><X /></Button>{basket ? <><h2>Your Selection</h2>{store.items.length ? store.items.map(item => <div className="grain-cart-item" key={item.name}><img src={item.image} alt={item.name} /><div className="grain-cart-item-info"><h3>{item.name}</h3><p>${item.price.toFixed(2)}</p><div className="flex items-center gap-3 mt-2"><Button variant="outline" size="icon" aria-label={`Decrease ${item.name}`} onClick={() => store.change(item.name,-1)}><Minus /></Button><span>{item.quantity}</span><Button variant="outline" size="icon" aria-label={`Increase ${item.name}`} onClick={() => store.change(item.name,1)}><Plus /></Button><Button variant="ghost" size="icon" aria-label={`Remove ${item.name}`} onClick={() => store.remove(item.name)}><X /></Button></div></div></div>) : <p className="py-10 text-muted-foreground">Your basket is empty.</p>}<div className="grain-cart-total"><span>Subtotal</span><strong>${store.items.reduce((n,x) => n+x.price*x.quantity,0).toFixed(2)}</strong></div><Button disabled={!store.items.length} onClick={() => { setBasket(false); go('/checkout'); }}>Continue to Checkout <ArrowRight /></Button></> : preview ? <div className="grain-product-preview"><img src={preview.image} alt={preview.name} /><div><span className="text-secondary text-label-caps uppercase">Signature Collection</span><h2>{preview.name}</h2><p>Premium, carefully selected grains. Naturally aged for exceptional aroma and a beautifully refined texture.</p><p>${preview.price.toFixed(2)} / {selectedSize || '5 KG'} Bag</p><Button onClick={() => { store.add(preview); setPreview(null); }}>Add to Cart <Plus /></Button><Button variant="link" onClick={() => { setPreview(null); go('/product'); }}>View full specifications <ArrowRight /></Button></div></div> : <><h2>{detail}</h2><p className="mt-6 text-muted-foreground">Praklaya Modern Rice Mill</p></>}</section></div>}
  </>;
}