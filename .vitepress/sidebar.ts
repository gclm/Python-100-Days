import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import type { DefaultTheme } from 'vitepress'

const groupDirs = [
  'Day01-20',
  'Day21-30',
  'Day31-35',
  'Day36-45',
  'Day46-60',
  'Day61-65',
  'Day66-80',
  'Day81-90',
  'Day91-100',
  '番外篇',
]

function firstHeadingTitle(mdContent: string): string | null {
  const lines = mdContent.split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/)
    if (m) return m[1].trim()
  }
  return null
}

function buildItemText(fileName: string, title: string): string {
  const m = fileName.match(/^(\d{1,3})\./)
  if (m) {
    const day = m[1].padStart(2, '0')
    return `第${day}天 · ${title}`
  }
  return title
}

function scanGroup(dir: string): DefaultTheme.SidebarItem[] {
  const base = join(process.cwd(), dir)
  if (!existsSync(base) || !statSync(base).isDirectory()) return []
  const files = readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.md'))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, 'zh'))
  const items: DefaultTheme.SidebarItem[] = []
  for (const f of files) {
    const full = join(base, f)
    const content = readFileSync(full, 'utf-8')
    const raw = f.replace(/\.md$/i, '')
    const title = firstHeadingTitle(content) || raw
    items.push({
      text: buildItemText(f, title),
      link: `/${dir}/${raw}`,
    })
  }
  return items
}

const bigSidebar: DefaultTheme.SidebarItem[] = groupDirs.map((dir) => ({
  text: dir,
  collapsed: false,
  items: scanGroup(dir),
}))

export default bigSidebar
