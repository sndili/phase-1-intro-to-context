// Your code here

function createEmployeeRecord(employeeArr) {
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(employeeData) {
    return employeeData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, dateData) {
    let timeIn = employee.timeInEvents.find(function(e) {
        return e.date === dateData
    })

    let timeOut = employee.timeOutEvents.find(function(e) {
        return e.date === dateData
    })

    return (timeOut.hour - timeIn.hour) * .01
}

function wagesEarnedOnDate(employee, datedata) {
    let wage = hoursWorkedOnDate(employee, datedata) *
        employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let wages = dates.reduce(function(arr, d) {
        return arr + wagesEarnedOnDate(employee, d)
    }, 0)

    return wages
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(record) {
        return record.firstName === firstName
    })
}

function calculatePayroll(employeeData) {
    return employeeData.reduce(function(elem, record) {
        return elem + allWagesFor(record)
    }, 0)
}
