import toDate from '../toDate/index.js'

/**
 * @name distanceFormat
 * @category Common Helpers
 * @summary Converts interval between two different dates into human readable format
 * @description
 * Converts interval between two different dates into human readable format.
 *
 *`distanceFormat` takes in a beginning date (`dateFrom`) and an end date (`dateTo`)
 * and turns it into a string that humans can read, from years all the way to milliseconds
 * and everything in between.
 *
 * You can optionally specify a format if you only want to include certain units.
 * The format is specified in an array where the elements you put in the array will appear
 * in that order in the returned string. This is useful when you want more flexibilty in
 * how the format looks, so instead of saying 1 year you could do 12 months.
 *
 *
 * @param {Date|Number} dateFrom - the base date
 * @param {Date|Number} dateTo - the date to compare to
 * @param {Array} [format] - the format of the returned string
 * @returns {String} the distance between two dates in human readable terms
 * @throws {TypeError} 2 arguments required
 *
 */

export default function distanceFormat(
  dirtyDateFrom,
  dirtyDateTo,
  dirtyFormat
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var result = []

  var format = dirtyFormat || []

  var dateFrom = toDate(dirtyDateFrom)
  var dateTo = toDate(dirtyDateTo)

  // Get the difference between the two dates in milliseconds and make sure it is always positive
  // Use this as a base for all conversions
  var millisecondsTime = Math.floor(
    Math.abs(dateTo.getTime() - dateFrom.getTime())
  )

  function numberEnding(time) {
    return time > 1 || time === 0 ? `s` : ``
  }

  if (format.length === 0) {
    var years = Math.floor(millisecondsTime / 31536000000)
    var months = Math.floor((millisecondsTime %= 31536000000) / 2592000000)
    var days = Math.floor((millisecondsTime %= 2592000000) / 86400000)
    var hours = Math.floor((millisecondsTime %= 86400000) / 3600000)
    var minutes = Math.floor((millisecondsTime %= 3600000) / 60000)
    var seconds = Math.floor((millisecondsTime % 60000) / 1000)
    var milliseconds = Math.floor(millisecondsTime % 1000)

    if (years > 0) {
      result.push(`${years} year${numberEnding(years)}`)
    }

    if (months > 0) {
      result.push(`${months} month${numberEnding(months)}`)
    }

    if (days > 0) {
      result.push(`${days} day${numberEnding(days)}`)
    }

    if (hours > 0) {
      result.push(`${hours} hour${numberEnding(hours)}`)
    }

    if (minutes > 0) {
      result.push(`${minutes} minute${numberEnding(minutes)}`)
    }

    if (seconds > 0) {
      result.push(`${seconds} second${numberEnding(seconds)}`)
    }

    if (milliseconds > 0) {
      result.push(`${milliseconds} millisecond${numberEnding(milliseconds)}`)
    }
  } else if (format.length >= 1) {
    for (var i = 0; i < format.length; i++) {
      if (format[i] === 'year') {
        var yearsFormat = Math.floor(millisecondsTime / 31536000000)
        result.push(`${yearsFormat} year${numberEnding(yearsFormat)}`)
        millisecondsTime -= yearsFormat * 31536000000
      } else if (format[i] === 'month') {
        var monthsFormat = Math.floor(millisecondsTime / 2592000000)
        result.push(`${monthsFormat} month${numberEnding(monthsFormat)}`)
        millisecondsTime -= monthsFormat * 2592000000
      } else if (format[i] === 'days') {
        var daysFormat = Math.floor(millisecondsTime / 86400000)
        result.push(`${daysFormat} day${numberEnding(daysFormat)}`)
        millisecondsTime -= daysFormat * 86400000
      } else if (format[i] === 'hours') {
        var hoursFormat = Math.floor(millisecondsTime / 3600000)
        result.push(`${hoursFormat} hour${numberEnding(hoursFormat)}`)
        millisecondsTime -= hoursFormat * 3600000
      } else if (format[i] === 'minutes') {
        var minutesFormat = Math.floor(millisecondsTime / 60000)
        result.push(`${minutesFormat} minute${numberEnding(minutesFormat)}`)
        millisecondsTime -= minutesFormat * 60000
      } else if (format[i] === 'seconds') {
        var secondsFormat = Math.floor(millisecondsTime / 1000)
        result.push(`${secondsFormat} second${numberEnding(secondsFormat)}`)
        millisecondsTime -= secondsFormat * 1000
      } else if (format[i] === 'milliseconds') {
        var millisecondsFormat = Math.floor(millisecondsTime)
        result.push(
          `${millisecondsFormat} millisecond${numberEnding(millisecondsFormat)}`
        )
        millisecondsTime -= millisecondsFormat
      }
    }
  }
  return result.join(' ')
}
