document.addEventListener('DOMContentLoaded', function() {
    // --- YOUR TIMETABLE DATA (Organized by Day) ---
    const timetableDataByDay = {
        'Monday': [
            { time: '08:40 - 09:30', subject: 'Cloud Computing' },
            { time: '09:30 - 10:20', subject: 'Software Engineering' },
            { time: '10:20 - 10:30', subject: 'Break' },
            { time: '10:30 - 11:20', subject: 'Operating Systems' },
            { time: '11:20 - 12:10', subject: 'Computer Networks' },
            { time: '12:10 - 01:00', subject: 'Cloud Computing'}
        ],
        'Tuesday': [
            { time: '01:30 - 02:20', subject: 'Cloud Computing' },
            { time: '02:20 - 03:10', subject: 'CN Lab' },
            { time: '03:10 - 03:20', subject: 'Break' },
            { time: '03:20 - 04:10', subject: 'CN Lab' },
            { time: '04:10 - 05:00', subject: 'CN Lab' },
            { time: '05:00 - 05:50', subject: 'Cloud Computing'}
        ],
        'Wednesday': [
            { time: '08:40 - 09:30', subject: 'Artificial Intelligence' },
            { time: '09:30 - 10:20', subject: 'Operating Systems' },
            { time: '10:20 - 10:30', subject: 'Break' },
            { time: '10:30 - 11:20', subject: 'Software Engineering' },
            { time: '11:20 - 12:10', subject: 'Software Engineering' },
            { time: '12:10 - 01:00', subject: 'Computer Networks'}
        ]
        ,
        'Thursday': [
            { time: '01:30 - 02:20', subject: 'Computer Networks' },
            { time: '02:20 - 03:10', subject: 'SE Lab' },
            { time: '03:10 - 03:20', subject: 'Break' },
            { time: '03:20 - 04:10', subject: 'SE Lab' },
            { time: '04:10 - 05:00', subject: 'SE Lab' },
            { time: '05:00 - 05:50', subject: 'Artificial Intelligence'}
        ],
        'Friday': [
            { time: '08:40 - 09:30', subject: 'Artificial Intelligence' },
            { time: '09:30 - 10:20', subject: 'ELCS' },
            { time: '10:20 - 10:30', subject: 'Break' },
            { time: '10:30 - 11:20', subject: 'ELCS' },
            { time: '11:20 - 12:10', subject: 'ELCS' },
            { time: '12:10 - 01:00', subject: 'Cloud Computing'}
        ],
        'Saturday': [
            { time: '01:30 - 02:20', subject: 'Operating Systems' },
            { time: '02:20 - 03:10', subject: 'OS Lab' },
            { time: '03:10 - 03:20', subject: 'Break' },
            { time: '03:20 - 04:10', subject: 'OS Lab' },
            { time: '04:10 - 05:00', subject: 'OS Lab' },
            { time: '05:00 - 05:50', subject: 'Artificial Intelligence'}
        ]
    };

    const dailyTimetablesContainer = document.getElementById('daily-timetables-container');
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentDayName = daysOrder[currentDayIndex - 1];

    // Reorder days so current day is first
    let orderedDays = [...daysOrder];
    if (currentDayName && daysOrder.includes(currentDayName)) {
        const index = orderedDays.indexOf(currentDayName);
        if (index > -1) {
            const day = orderedDays.splice(index, 1)[0];
            orderedDays.unshift(day);
        }
    }

    const createClassFromSubject = (subject) => {
        if (!subject || subject === "---") return '';
        return `subject-${subject.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`;
    };

    // Generate a table for each day
    orderedDays.forEach(dayName => {
        const daySchedule = timetableDataByDay[dayName];
        if (!daySchedule) return;

        const dayCard = document.createElement('div');
        dayCard.classList.add('day-timetable-card');
        dayCard.setAttribute('data-day', dayName);

        if (dayName === currentDayName) {
            dayCard.classList.add('current-day-highlight');
        }

        const dayTitle = document.createElement('h2');
        dayTitle.textContent = dayName;
        dayCard.appendChild(dayTitle);

        const table = document.createElement('table');
        table.classList.add('timetable');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Time', 'Subject'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        daySchedule.forEach(slot => {
            const row = document.createElement('tr');
            const timeCell = document.createElement('td');
            timeCell.classList.add('time');
            timeCell.textContent = slot.time;
            row.appendChild(timeCell);

            const subjectCell = document.createElement('td');
            subjectCell.textContent = slot.subject;
            subjectCell.classList.add(createClassFromSubject(slot.subject));
            row.appendChild(subjectCell);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        dayCard.appendChild(table);
        dailyTimetablesContainer.appendChild(dayCard);
    });

    // --- NEW: HIGHLIGHT CURRENT PERIOD ---
    function highlightCurrentPeriod() {
        const currentDayCard = document.querySelector('.current-day-highlight');
        if (!currentDayCard) return; // Exit if not a weekday

        const rows = currentDayCard.querySelectorAll('tbody tr');
        const now = new Date();

        // Helper to parse time strings like "09:00" into Date objects for today
        const parseTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        for (const row of rows) {
            const timeCell = row.querySelector('.time');
            if (timeCell) {
                const [startTimeStr, endTimeStr] = timeCell.textContent.split(' - ');
                const startTime = parseTime(startTimeStr);
                const endTime = parseTime(endTimeStr);

                if (now >= startTime && now < endTime) {
                    row.classList.add('current-period-highlight');
                    break; // Stop after finding the current period
                }
            }
        }
    }

    // Run the highlight function after building the tables
    highlightCurrentPeriod();
});