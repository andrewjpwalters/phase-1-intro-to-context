// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const newEmployee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, timeStamp) {
    let obj = {
        type: 'TimeIn',
        hour: parseInt(timeStamp.substr(11, 15)),
        date: timeStamp.substr(0, 10)
    }
    employeeRecord.timeInEvents.push(obj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    let obj = {
        type: 'TimeOut',
        hour: parseInt(timeStamp.substr(11, 15)),
        date: timeStamp.substr(0, 10)
    }
    employeeRecord.timeOutEvents.push(obj)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let hours = 0;
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        if (employeeRecord.timeInEvents[i].date === date) {
            if (employeeRecord.timeOutEvents[i].date === date) {
                hours = employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour
            }
        }
    }
    return hours / 100
}


function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let allWages = [];
    let allDates = [];

    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        allDates.push(employeeRecord.timeInEvents[i].date)
    }
    allDates.forEach(date => {
        allWages.push(wagesEarnedOnDate(employeeRecord, date))
    })

    return allWages.reduce((previousValue, currentValue) => previousValue + currentValue)

}

function calculatePayroll(allEmployees) {
    let payroll = [];

    allEmployees.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}