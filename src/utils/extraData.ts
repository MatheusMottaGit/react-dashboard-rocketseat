export const currentUsersPerWeek = 110
export const currentUsersPerYear = 600

export const calculatePercentage = (first: number, second: number) =>{
    const percentage = Math.floor((first / second) * 100)
    return percentage
}