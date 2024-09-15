export function findLastAug1(): Date {
    let millis = new Date().getTime()
    const AUGUST = 7 // 0-based
    let d = new Date(millis)
    console.debug(`Starting date: ${d}`)
    while (!(d.getDate() === 1 && d.getMonth() === AUGUST)) {
        millis -= 86400000
        d = new Date(millis)
        console.debug(`new date: ${d}`)
    }
    return d
}

export function formatDate(d: Date): string {
    const month = d.getMonth() + 1
    const day = d.getDate()
    const dayPrefix = day < 10 ? '0' : ''
    const monthPrefix = month < 10 ? '0' : ''
    return `${d.getFullYear()}-${monthPrefix}${d.getMonth() + 1}-${dayPrefix}${d.getDate()}`
}