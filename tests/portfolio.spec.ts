import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('timeline supports distinct same-year nodes, focus, touch/click, dismissal and navigation', async ({ page, isMobile }) => {
  await page.goto('/');
  const nodes = page.locator('.timeline-node');
  await expect(nodes).toHaveCount(7);
  await expect(page.locator('.timeline-year', { hasText: /^2026$/ })).toHaveCount(3);
  const first = nodes.first();
  const last = nodes.last();
  await expect(last).toHaveAttribute('open', '');
  await expect(first).not.toHaveAttribute('open', '');
  if (!isMobile) {
    await last.locator('summary').hover();
    await expect(last).toHaveAttribute('open', '');
    await first.locator('summary').focus();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('summary')).toHaveAttribute('aria-expanded', 'true');
    await first.locator('summary').press('Tab');
    await expect(first.getByRole('link', { name: /See more/ })).toBeFocused();
  }
  if (isMobile) await last.locator('summary').tap();
  else await last.locator('summary').click();
  // Mobile: clicking an open disclosure closes it; reopen if that was its state.
  if (!(await last.evaluate((node) => (node as HTMLDetailsElement).open))) await last.locator('summary').click();
  await expect(last.getByRole('link', { name: /See more/ })).toBeVisible();
  const panel = await last.locator('.project-preview').boundingBox();
  const frame = await page.locator('.timeline').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(frame!.x);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(frame!.x + frame!.width);
  expect(panel!.y + panel!.height).toBeLessThanOrEqual(frame!.y + frame!.height);
  await last.getByRole('link', { name: /See more/ }).focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('.timeline-node[open]')).toHaveCount(0);
  await expect(last.locator('summary')).toBeFocused();
  await first.locator('summary').click();
  await page.locator('.section-heading').first().click();
  await expect(page.locator('.timeline-node[open]')).toHaveCount(0);
  await first.locator('summary').click();
  await first.getByRole('link', { name: /See more/ }).click();
  await expect(page).toHaveURL(/\/projects\/#bioelectrical-signals$/);
  await expect(page.locator('#details-bioelectrical-signals')).toHaveAttribute('open', '');
  await expect(page.locator('#content-bioelectrical-signals .prose')).toBeVisible();
});

test('catalogue filters use deterministic category membership and restore all entries', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(11);
  await page.getByRole('button', { name: 'Industry ML', exact: true }).click();
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(2);
  await expect(page.getByRole('status')).toHaveText('2 projects');
  await page.getByRole('button', { name: 'Robotics', exact: true }).click();
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(2);
  await page.getByRole('button', { name: 'NLP / LLMs', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'NLP / LLMs', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('[data-project-card]:visible')).toHaveCount(11);
});

test('all pages fit the viewport, load images, and pass automated accessibility checks', async ({ page }) => {
  await page.goto('/projects/');
  const routes = ['/', '/projects/', '/experience/', '/about/', '/404.html'];
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const images = page.locator('img:visible');
    for (let i = 0; i < await images.count(); i++) {
      await images.nth(i).scrollIntoViewIfNeeded();
      await expect.poll(() => images.nth(i).evaluate((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    if (route === '/' || route === '/projects/') {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `.qa/${test.info().project.name}-${route === '/' ? 'home' : 'projects'}.png`, fullPage: true });
    }
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, `${route}: ${JSON.stringify(result.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })))}`).toEqual([]);
  }
  await page.goto('/projects/');
  const cards = page.locator('[data-project-card]');
  for (let i = 0; i < await cards.count(); i++) {
    const card = cards.nth(i);
    await card.locator('summary').click();
    await expect(card.locator('.prose')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const images = card.locator('img:visible');
    for (let j = 0; j < await images.count(); j++) {
      await images.nth(j).scrollIntoViewIfNeeded();
      await expect.poll(() => images.nth(j).evaluate((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) }))).toEqual([]);
    if (await card.getAttribute('id') === 'quinn') await card.screenshot({ path: `.qa/${test.info().project.name}-project-expanded.png` });
  }
  expect(errors).toEqual([]);
});

test('mobile navigation opens with keyboard, dismisses, and follows links', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL('/projects/');
});

test('static content and timeline links remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  const last = page.locator('.timeline-node').last();
  await expect(last).toHaveAttribute('open', '');
  await last.getByRole('link', { name: /See more/ }).click();
  await expect(page).toHaveURL(/\/projects\/#merchant-extraction$/);
  const merchant = page.locator('#merchant-extraction');
  await merchant.locator('summary').click();
  await expect(merchant.locator('.prose')).toBeVisible();
  await page.goto('http://127.0.0.1:4321/projects/');
  await expect(page.locator('[data-project-card]')).toHaveCount(11);
  await expect(page.locator('[data-filters]')).toBeHidden();
  await context.close();
});

test('reduced-motion preference removes CSS transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page.locator('.button-primary').evaluate((button) => getComputedStyle(button).transitionDuration);
  expect(duration).toBe('0s');
});

test('approved CV downloads unchanged and future TNO role is explicitly upcoming', async ({ page }) => {
  await page.goto('/');
  const cv = page.getByRole('link', { name: 'Download CV', exact: true });
  await expect(cv).toHaveAttribute('href', '/cv/gabriela-chavgova-cv.pdf');
  const [download] = await Promise.all([page.waitForEvent('download'), cv.click()]);
  expect(download.suggestedFilename()).toBe('gabriela-chavgova-cv.pdf');
  const downloaded = await readFile((await download.path())!);
  const approved = await readFile('public/cv/gabriela-chavgova-cv.pdf');
  expect(downloaded.subarray(0, 5).toString()).toBe('%PDF-');
  expect(createHash('sha256').update(downloaded).digest('hex')).toBe(createHash('sha256').update(approved).digest('hex'));
  await page.goto('/experience/');
  const upcoming = page.locator('section', { has: page.getByRole('heading', { name: 'TNO', exact: true }) });
  await expect(upcoming).toContainText('Upcoming · Jan–Jun 2027');
  await expect(upcoming).toContainText('Incoming Machine Learning Scientist Intern');
  await expect(page.locator('.experience-list')).not.toContainText('TNO');
});

test('project details expand inline, share deep links, close with Escape, and reset filters for linked work', async ({ page }) => {
  await page.goto('/projects/#quinn');
  const quinn = page.locator('#quinn');
  await expect(quinn.locator('details')).toHaveAttribute('open', '');
  await expect(quinn.locator('summary')).toHaveAttribute('aria-expanded', 'true');
  await expect(quinn.getByRole('link', { name: 'QUINN book chapter' })).toBeVisible();
  await quinn.locator('summary').press('Escape');
  await expect(quinn.locator('details')).not.toHaveAttribute('open', '');
  await expect(quinn.locator('summary')).toBeFocused();
  await quinn.locator('summary').press('Enter');
  await expect(quinn.locator('details')).toHaveAttribute('open', '');
  await expect(page).toHaveURL(/\/projects\/#quinn$/);
  await page.locator('#robobuba summary').click();
  await expect(page.locator('#details-robobuba')).toHaveAttribute('open', '');
  await expect(quinn.locator('details')).not.toHaveAttribute('open', '');
  await expect(page.locator('.project-expansion[open]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Industry ML', exact: true }).click();
  await expect(quinn).toBeHidden();
  await page.evaluate(() => { location.hash = 'quinn'; });
  await expect(quinn).toBeVisible();
  await expect(quinn.locator('details')).toHaveAttribute('open', '');
  await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(quinn.locator('details')).toHaveAttribute('open', '');
});
