const USER = 'morningdip'
const ANNIV = '12/10/2017'

const widget = createWidget()

Script.setWidget(widget)
Script.complete()

function createWidget() {
  const w = new ListWidget()
  const bgColor = new LinearGradient()
  
  bgColor.colors = [new Color('#2c5364'), new Color('#203a43'), new Color('#0f2027')]
  bgColor.locations = [0.0, 0.5, 1.0]
  w.backgroundGradient = bgColor
  
  w.setPadding(12, 12, 12, 0)
  w.spacing = 6

  const time = new Date()
  const enTime = time.toDateString()

  const hour = time.getHours()
  const isMidnight = hour < 8 && 'midnight'
  const isMorning = hour >= 8 && hour < 12 && 'morning'
  const isAfternoon = hour >= 12 && hour < 19 && 'afternoon'
  const isEvening = hour >= 19 && hour < 21 && 'evening'
  const isNight = hour >= 21 && 'night'

  const dfTime = new DateFormatter()
  dfTime.locale = 'en'
  dfTime.useMediumDateStyle()
  dfTime.useNoTimeStyle()
  
  const Line1 = w.addText(`[🤖] Hi, ${User}. Good ${isMidnight || isMorning || isAfternoon || isEvening || isNight}`)
  Line1.textColor = new Color('#ffffff')
  Line1.font = new Font('Menlo', 11)
  
  const Line2 = w.addText(`[📅] ${enTime}`)
  Line2.textColor = new Color('#c6ffdd')
  Line2.font = new Font('Menlo', 11)
  
  let answer = ''
  if (isFriday()) answer = 'HELL YES IT IS'
  const Line3 = w.addText(`[${isFriday() ? '😎' : '😶'}] Is today Friday? ${isFriday() ? 'HELL YES IT IS' : 'No, it\'s not friday'}`)
  Line3.textColor = new Color('#5bd2f0')
  Line3.font = new Font('Menlo', 11)
  
  const Line4 = w.addText(`[💏] ${countAnniversaries(Anniversary)}`)
  Line4.textColor = new Color('#ff69b4')
  Line4.font = new Font('Menlo', 11)
  
  const Line5 = w.addText(`[${Device.isCharging() ? '⚡️' : '🔋'}] ${renderBattery()} Battery`)
  Line5.textColor = new Color('#2aa876')
  Line5.font = new Font('Menlo', 11)
  
  const Line6 = w.addText(`[🕒] ${renderYearProgress()} YearProgress`)
  Line6.textColor = new Color('#f19c65')
  Line6.font = new Font('Menlo', 11)
  
  return w
}

function renderProgress(progress) {
    const used = '▓'.repeat(Math.floor(progress * 24))
    const left = '░'.repeat(24 - used.length)
    return `${used}${left} ${Math.floor(progress * 100)}%`
}

function renderBattery() {
    const batteryLevel = Device.batteryLevel()
    return renderProgress(batteryLevel)
}

function renderYearProgress() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1) // Start of this year
    const end = new Date(now.getFullYear() + 1, 0, 1) // End of this year
    const progress = (now - start) / (end - start)
    return renderProgress(progress)
}

function isFriday() {
    let day = Date().getDay()
    if (day === 5) return true
    else return false
}

function countAnniversaries(dateString) {
    const now = new Date()
    const today = new Date(now.getYear(), now.getMonth(), now.getDate())
  
    const yearNow = now.getYear()
    const monthNow = now.getMonth()
    const dateNow = now.getDate()
  
    const dob = new Date(dateString.substring(6,10), dateString.substring(0,2)-1, dateString.substring(3,5))
    
    const yearDob = dob.getYear()
    const monthDob = dob.getMonth()
    const dateDob = dob.getDate()
  
    let yearAge = yearNow - yearDob
    let monthAge = 0
    let dateAge = 0
    
    if (monthNow >= monthDob) {
        monthAge = monthNow - monthDob
    } else {
        yearAge--
        monthAge = 12 + monthNow - monthDob
    }
    
    if (dateNow >= dateDob) {
        dateAge = dateNow - dateDob
    } else {
        monthAge--
        dateAge = 31 + dateNow - dateDob;
        if (monthAge < 0) {
            monthAge = 11
            yearAge--
        }
    }
  
    let yearString = ''
    let monthString = ''
    let dayString = ''
    let ageString = ''
    
    const age = {years: yearAge, months: monthAge, days: dateAge}
    
    if (age.years > 1) yearString = ' years';
    else yearString = ' year'
    
    if (age.months> 1) monthString = ' months';
    else monthString = ' month'
    
    if (age.days > 1) dayString = ' days';
    else dayString = ' day'
    
    if ((age.years > 0) && (age.months > 0) && (age.days > 0)) 
        ageString = age.years + yearString + ', ' + age.months + monthString + ', and ' + age.days + dayString
    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
        ageString = age.days + dayString
    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
        ageString = age.years + yearString + ', Happy Anniversary!'
    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
        ageString = age.years + yearString + ' and ' + age.months + monthString
    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
        ageString = age.months + monthString + ' and ' + age.days + dayString
    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
        ageString = age.years + yearString + ' and ' + age.days + dayString
    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
        ageString = age.months + monthString
    else ageString = 'Oops! Could not calculate days!'
    
    return ageString
}
