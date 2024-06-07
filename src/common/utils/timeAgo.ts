'use client'

const DATE_UNITS = {
  days: 86400,
  hours: 3600,
  minutes: 60,
  seconds: 1
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'seconds') {
      const value = Math.floor(secondsElapsed / secondsInUnit)
      return { value, unit }
    }
  }
  return null
}

export const timeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const secondsElapsed = getSecondsDiff(timestamp)
  const data = getUnitAndValueDate(secondsElapsed)
  if (!data) return '0 seconds'

  const { value, unit } = data

  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
