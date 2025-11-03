import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

const base = '/'

export default defineConfig({
  srcDir: '.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
    languages: ['sql'],
    languageAlias: {
      mysql: 'sql',
      hive: 'sql',
    },
  },
  themeConfig: {
    outline: 'deep',
    nav: [
      { text: 'Day01-20', link: '/Day01-20/01.初识Python' },
      { text: 'Day21-30', link: '/Day21-30/21.文件读写和异常处理' },
      { text: 'Day31-35', link: '/Day31-35/31.Python语言进阶' },
      { text: 'Day36-45', link: '/Day36-45/36.关系型数据库和MySQL概述' },
      { text: 'Day46-60', link: '/Day46-60/46.Django快速上手' },
      { text: 'Day61-65', link: '/Day61-65/61.网络数据采集概述' },
      { text: 'Day66-80', link: '/Day66-80/66.数据分析概述' },
      { text: 'Day81-90', link: '/Day81-90/81.浅谈机器学习' },
      { text: 'Day91-100', link: '/Day91-100/91.团队项目开发的问题和解决方案' },
      { text: '番外篇', link: '/番外篇/PEP8风格指南' }
    ],
    sidebar
  }
})
