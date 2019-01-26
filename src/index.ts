export default async function executeScripts(element: HTMLElement) {
  const loadScript = (el: HTMLScriptElement) => {
    const parent = el.parentElement;
    if (!parent) {
      return;
    }
    const next = el.nextSibling;
    parent.removeChild(el);
    return new Promise(resolve => {
      const newEl = document.createElement('script');
      for (let i = 0; i < el.attributes.length; i++) {
        const a = el.attributes[i];
        newEl.setAttribute(a.name, a.value);
      }

      const onLoad = () => {
        newEl.removeEventListener('load', onLoad);
        resolve();
      };
      newEl.addEventListener('load', onLoad);

      next ? parent.insertBefore(newEl, next) : parent.appendChild(newEl);
    });
  };

  // Scripts do not get executed by just adding them to an inner element that is dynamically added to the DOM
  const scripts = Array.prototype.slice.call(element.querySelectorAll('script')) as HTMLScriptElement[];
  for (const script of scripts) {
    if (script.src) {
      if (script.async || script.defer) {
        loadScript(script); // async/deferred so we can safely execute the next scripts
      } else {
        await loadScript(script);
      }
    } else {
      new Function(script.text)();
    }
  }
}
