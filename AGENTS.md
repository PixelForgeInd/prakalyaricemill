<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep supplied screen markup in the browser-safe reference-pages module and render it through the shared GrainScreen adapter so the original layouts remain consistent.
- Use distinct TanStack leaf routes for each content screen and a shared in-memory cart provider; checkout and inquiries are presentation previews until live services are explicitly requested.
