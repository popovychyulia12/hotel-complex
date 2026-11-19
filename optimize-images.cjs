
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

const publicFolder = path.join(__dirname, 'public')

const settings = {
  maxWidth: 1920,
  quality: 85,
  effort: 6,
}

const supportedExtensions = /\.(jpg|jpeg|png)$/i

let totalBefore = 0
let totalAfter = 0
let optimizedCount = 0
let skippedCount = 0
let errorCount = 0

async function optimizeFolder(folder) {
  const entries = await fs.readdir(folder, {
    withFileTypes: true,
  })

  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name)

    if (entry.isDirectory()) {
      await optimizeFolder(fullPath)
      continue
    }

    if (!entry.isFile()) continue

    if (!supportedExtensions.test(entry.name)) {
      continue
    }

    const outputPath = fullPath.replace(
      supportedExtensions,
      '.webp'
    )

    const relativePath = path.relative(
      publicFolder,
      fullPath
    )

    try {
      const original = await fs.stat(fullPath)

      // Не перезаписуємо WebP, який уже існує
      try {
        await fs.access(outputPath)
        skippedCount++
        console.log(`Пропущено: ${relativePath}`)
        continue
      } catch {
        // WebP ще немає — створюємо
      }

      // Зчитуємо параметри оригіналу
      const metadata = await sharp(fullPath).metadata()

      // Не перетворюємо анімовані зображення
      if (metadata.pages && metadata.pages > 1) {
        skippedCount++
        console.log(`Анімація пропущена: ${relativePath}`)
        continue
      }

      await sharp(fullPath)
        .rotate()
        .resize({
          width: settings.maxWidth,
          withoutEnlargement: true,
        })
        .webp({
          quality: settings.quality,
          effort: settings.effort,
        })
        .toFile(outputPath)

      const optimized = await fs.stat(outputPath)

      // Якщо WebP більший за оригінал,
      // залишаємо тільки початкове зображення
      if (optimized.size >= original.size) {
        await fs.unlink(outputPath)
        skippedCount++

        console.log(
          `Без виграшу в розмірі: ${relativePath}`
        )
        continue
      }

      totalBefore += original.size
      totalAfter += optimized.size
      optimizedCount++

      const beforeMB = (
        original.size / 1048576
      ).toFixed(2)

      const afterMB = (
        optimized.size / 1048576
      ).toFixed(2)

      const savedPercent = (
        (1 - optimized.size / original.size) * 100
      ).toFixed(1)

      console.log(
        `${relativePath}: ${beforeMB} MB → ${afterMB} MB (-${savedPercent}%)`
      )
    } catch (error) {
      errorCount++
      console.error(
        `Помилка: ${relativePath}`,
        error.message
      )
    }
  }
}

async function optimizeImages() {
  console.log('Починаємо оптимізацію зображень...\n')

  await optimizeFolder(publicFolder)

  const beforeMB = (
    totalBefore / 1048576
  ).toFixed(2)

  const afterMB = (
    totalAfter / 1048576
  ).toFixed(2)

  const savedPercent =
    totalBefore > 0
      ? (
          (1 - totalAfter / totalBefore) * 100
        ).toFixed(1)
      : 0

  console.log('\n================================')
  console.log('ОПТИМІЗАЦІЮ ЗАВЕРШЕНО')
  console.log('================================')

  console.log(`Оптимізовано: ${optimizedCount}`)
  console.log(`Пропущено: ${skippedCount}`)
  console.log(`Помилок: ${errorCount}`)

  console.log(`Початковий розмір: ${beforeMB} MB`)
  console.log(`WebP розмір: ${afterMB} MB`)
  console.log(`Економія: ${savedPercent}%`)

  console.log(
    '\nОригінальні фотографії збережено.'
  )
}

optimizeImages().catch((error) => {
  console.error('Помилка оптимізації:', error)
  process.exitCode = 1
})
